import { Get_all_Comments,Edit_Comment,Delete_Comment} from "../CallAPI";
import removeEmptyFields from "../removeEmptyFields";

async function Edit(Commnent) {
  let result = {
    success: false,
    data: {},
  };
  try {
    const id=Commnent.id
      result.success = true;
      let payload = JSON.stringify(removeEmptyFields(Commnent));
      result.data = await Edit_Comment(payload,id);
    } 
   catch (ex) {
    result.success = false;
    result.data = ex.message;
  } finally {
    return result;
  }
}
async function GetAll(page = 1, size = 25, filterobj, sort) {
  try {
    let data = await Get_all_Comments(page,size,filterobj,sort)
    return data;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Có lỗi xảy ra",
      text: err.message,
    });
  }
}
//xoá bài đánh giá
async function Delete(id) {
  try {
    await Delete_Comment(id);
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

export { GetAll,Edit,Delete };
