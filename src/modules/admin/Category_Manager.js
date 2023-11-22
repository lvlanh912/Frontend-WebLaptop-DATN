import { Create_new_Category, Edit_Category, Get_all_Category,Delete_Category,Get_Category_by_id } from "../CallAPI";
import removeEmptyFields from "../removeEmptyFields";

function validateData(Category) {
  if (Category.name == null || Category.name == "")
    return "Tên không được để trống";
}
function validateId(id){
    if(id.trim().length!=24)
    return 'Dữ liệu đã nhập không phải định dạng ID hợp lệ';
}

async function GetbyId(id){
    try{
      return  await Get_Category_by_id(id)
    }
    catch(err){
        Swal.fire({
            icon: "error",
            title: "Có lỗi xảy ra",
            text: err.response.data.message??err.message,
          });
    }
   
}

async function Add(Category) {
  let result = {
    success: false,
    data: {},
  };
  try {
      result.success = true;
      let payload = JSON.stringify(removeEmptyFields(Category));
      result.data = await Create_new_Category(payload);
  } catch (ex) {
    result.success = false;
    result.data = ex.message;
  } finally {
    return result;
  }
}

async function Edit(Category) {
  let result = {
    success: false,
    data: {},
  };
  try {
    let dataValid = validateData(Category);
    const id=Category.id
    if (dataValid === undefined) {
      result.success = true;
      let payload = JSON.stringify(removeEmptyFields(Category));
      result.data = await Edit_Category(payload,id);
    } 
    else result.data = dataValid;
  } catch (ex) {
    result.success = false;
    result.data = ex.message;
  } finally {
    return result;
  }
}
async function GetAll(ParentCategoryId,page = 1, size = 25, filterobj, sort) {
  try {
    let data = await Get_all_Category(ParentCategoryId,page, size, filterobj, sort)
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
    await Delete_Category(id);
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

export { GetAll, Add,Edit, validateData,Delete,GetbyId,validateId };
