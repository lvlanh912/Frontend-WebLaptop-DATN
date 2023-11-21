import axios from "axios";
import { Create_News, Edit_News, Get_all_News, Delete_News } from "../CallAPI";
import removeEmptyFields from "../removeEmptyFields";

async function Add(News, imageFile) {
  let result = {
    success: false,
    data: {},
  };
  try {
    let dataValid = ValidateData(News);
    if (dataValid === undefined) {
      result.success = true;
      let datajson = JSON.stringify(removeEmptyFields(News));
      const formData = new FormData();
      formData.append("data", datajson);
      imageFile.forEach((file) => {
        formData.append("images", file);
      });
      result.data = await Create_News(formData);
    } else {
      result.success = false;
      result.data = dataValid;
    }
  } catch (ex) {
    result.success = false;
    result.data = ex.message;
  } finally {
    return result;
  }
}
async function Edit(News, imageFile) {
  let result = {
    success: false,
    data: {},
  };
  try {
    let dataValid = ValidateData(News);
    if (dataValid === undefined) {
      result.success = true;
      let datajson = JSON.stringify(removeEmptyFields(News));
      const formData = new FormData();
      formData.append("data", datajson);
      imageFile.forEach((file) => {
        formData.append("images", file);
      });
      result.data = await Edit_News(formData,News.id);
    } else {
      result.success = false;
      result.data = dataValid;
    }
  } catch (ex) {
    result.success = false;
    result.data = ex.message;
  } finally {
    return result;
  }
}
//Đọc
async function GetAll(page = 1, size = 25, filterobj, sort) {
  try {
    let data = await Get_all_News(page, size, filterobj, sort);
    return data;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Có lỗi xảy ra",
      text: err.message,
    });
  }
}
//xoá
async function Delete(id) {
  try {
    await Delete_News(id);
    Swal.fire({
      icon: "success",
      title: "Đã xoá",
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Thất bại",
      text: err.message,
    });
  }
}

//xoá thuộc tính ảnh và tách thành file để upload lên server
function DataConvert(htmlString) {
  const imageFile = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const imgElements = doc.getElementsByTagName("img");
  for (let i = imgElements.length - 1; i >= 0; i--) {
    //lấy dữ liệu ảnh
    const sourceImg = imgElements[i].getAttribute("src");
    //nếu ảnh là link
    if(sourceImg.startsWith("http"))
        throw new Error('Vui lòng dùng ảnh upload');
    else
    imageFile.push(
      base64toFile(sourceImg, "image_" + i + ".jpg", "image/jpeg")
    );
    //xoá thuộc tính ảnh
    imgElements[i].removeAttribute("src");
  }
  console.log(imageFile);
  return {
    data: doc.body.innerHTML,
    imageFile: imageFile,
  };
}

//đổi base64 thành file
function base64toFile(base64String, filename, mimeType) {
  // Chia chuỗi base64 thành header và data
  const [header, data] = base64String.split(",");
  // Kiểm tra và lấy loại mime từ header hoặc sử dụng mimeType được truyền vào
  const mime = mimeType || header.match(/:(.*?);/)[1];
  // Chuyển đổi base64 thành binary
  const binary = atob(data);
  // Tạo một mảng để lưu trữ byte của binary
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  // Tạo đối tượng Blob từ mảng byte và kiểu mime
  const blob = new Blob([new Uint8Array(array)], { type: mime });
  // Tạo đối tượng File từ Blob và đặt tên tệp tin
  const file = new File([blob], filename, { type: mime });
  return file;
}
//đổi ảnh thành base64
async function getBase64ImageFromUrl(fulllink) {
  var res = await fetch(fulllink);
 // var res= await axios.get(fulllink,{ responseType: 'arraybuffer'})
 // var blob = new Blob([res.data], { type: res.headers['content-type'] })
   var blob = await res.blob();
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        resolve(reader.result);
      },
      false
    );
    reader.onerror = () => {
      return reject(this);
    };
    reader.readAsDataURL(blob);
  });
}

//Chuyển đổi nội dung tin tức sang dạng chỉnh sửa
async function getContentWithImage(News) {

  const data=News.content
  const imageBase64= []
  for(let i=0;i<=News.images.length-1;i++){
    imageBase64.push(await getBase64ImageFromUrl( backendHost + "/images/posts/" + News.images[i]))
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(News.content, "text/html");
  const imgElements = doc.getElementsByTagName("img");
  let j=0;
  for(let i=imgElements.length-1;i>=0;i--){
    imgElements[i].setAttribute('src',imageBase64[j])
    ++j;
  }
  return doc.body.innerHTML
}
function ValidateData(News) {
  if (News.title == null || News.title == "")
    return "Tiêu đề không được để trống";
  if (News.content == null || News.content == "")
    return "Nội dung không được để trống";
}
export { GetAll, Add, Edit, Delete, DataConvert, getContentWithImage };
