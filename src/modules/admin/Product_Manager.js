import {  Get_all_Product,FindCategoryByName,Create_new_Product,Get_Category_by_id,Edit_Product,Delete_Product} from "../CallAPI";
import removeEmptyFields from "../removeEmptyFields";
import TemplateSpeacial from "./Template_Speacial_Product.js"
import axios from 'axios'
function ValidateData(Product,Images) {
  if(Images.length==0)
    return "Phải có ít nhất 1 ảnh sản phẩm"
  if (Product.productName == null || Product.productName == "")
    return "Tên sản phẩm không được để trống";
  if(Product.price==null||Product.price==0||Product.price=="")
    return "Giá sản phẩm không được để trống và lớn hơn 0"
  if(Product.maxPrice==null||Product.maxPrice==0||Product.maxPrice=="")
    return "Giá sản phẩm tối đa không được để trống và lớn hơn 0"
  if(Product.maxPrice*1<=Product.price*1){
    console.log(Product.maxPrice)
    return "Giá sản phẩm tối đa phải lớn hơn giá sản phẩm"
  }
    
  if(Product.weight==''||Product.weight==null)
   return "Cân nặng không được để trống"
  if(Product.brandName==''||Product.brandName==null)
    return "Vui lòng nhập thương hiệu"
} 

async function GetbyId(id){
    try{
      return  await Get_Product_by_id(id)
    }
    catch(err){
        Swal.fire({
            icon: "error",
            title: "Có lỗi xảy ra",
            text: err.response.data.message??err.message,
          });
    }
   
}
async function FindCategory(name) {
  try {
    let data = await FindCategoryByName(name)
    return data;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Có lỗi xảy ra",
      text: err.message,
    });
  }
}
async function GetListCategoryByListid(listId){
  const result=[]
  for(let i=0;i<listId.length;i++){
    result.push(await Get_Category_by_id(listId[i]))
  }
   
  return result
}
async function LinkImagetoFile(link){
  const response= await axios.get(link,{
    responseType: 'arraybuffer'
  })
  const blob = new Blob([response.data], { type: 'image/jpeg' });
  return new File([blob], link, { type: 'image/jpeg' });
}
//Add
async function Add(product, Listimage) {
    //xoá thuộc tính trống
    let datajson = JSON.stringify(removeEmptyFields(product));
    const formData = new FormData();
    formData.append("data", datajson);
    Listimage.forEach(element => {
      formData.append("images", element);
    });
    
    return await Create_new_Product(formData);
  }
//Edit
async function Edit(product,Listimage) {
  //xoá thuộc tính trống
  product.images=[]
  let datajson = JSON.stringify(removeEmptyFields(product));
  const formData = new FormData();
  formData.append("data", datajson);
  Listimage.forEach(element => {
    formData.append("images", element);
  });
  return await Edit_Product(product.id,formData);
}
async function GetAll(page = 1, size = 25, filterobj, sort) {
  try {
    let data = await Get_all_Product(page, size, filterobj, sort)
    return data;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Có lỗi xảy ra",
      text: err.message,
    });
  }
}

//xoá tài khoản
async function Delete(id) {
  try {
    await Delete_Product(id);
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

export { GetAll,FindCategory, Add,Edit, 
  ValidateData,Delete,GetbyId,
  TemplateSpeacial,GetListCategoryByListid,LinkImagetoFile
 };
