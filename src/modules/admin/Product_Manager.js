import {  Get_all_Product,FindCategoryByName } from "../CallAPI";
import removeEmptyFields from "../removeEmptyFields";

function validateData(Product) {
  if (Product.name == null || Product.name == "")
    return "Tên không được để trống";
}
function validateId(id){
    if(id.trim().length!=24)
    return 'Dữ liệu đã nhập không phải định dạng ID hợp lệ';
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
//Add
async function Add(account, Listimage) {
  if(Listimage.length<=0||Listimage==null||Listimage==undefined)
    throw new Error("Phải có ít nhất 1 ảnh sản phẩm")
    //xoá thuộc tính trống
    let datajson = JSON.stringify(removeEmptyFields(account));
    const formData = new FormData();
    formData.append("data", datajson);
    Listimage.forEach(element => {
      formData.append("images", element);
    });
    
    return await Create_new_account(formData);
  }
async function Edit(Product) {
  let result = {
    success: false,
    data: {},
  };
  try {
    let dataValid = validateData(Product);
    const id=Product.id
    if (dataValid === undefined) {
      result.success = true;
      let payload = JSON.stringify(removeEmptyFields(Product));
      result.data = await Edit_Product(payload,id);
    } 
    else result.data = dataValid;
  } catch (ex) {
    result.success = false;
    result.data = ex.message;
  } finally {
    return result;
  }
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

export { GetAll,FindCategory, Add,Edit, validateData,Delete,GetbyId,validateId };
