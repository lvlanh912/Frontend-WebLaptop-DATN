import {
  Get_All_Account,
  Create_new_account,
  Edit_Account,
  Delete_Account,
  Get_List_Province,
  Get_List_districts,
  Get_List_wards,
  Get_totalOrder_by_Account,
  Get_totalComments_by_Account

} from "../CallAPI.js";
import removeEmptyFields from "../removeEmptyFields.js";
async function Get_list_accounts(page = 1, size = 5, filterobj, sort = "") {
  try {
    return await Get_All_Account(page, size, filterobj, sort);
  } catch (err) {
    throw err;
  }
}
async function Get_totalOrder(id){
  try {
    return await Get_totalOrder_by_Account(id);
  } catch (err) {
    throw err;
  }
}
async function Get_totalComment(id){
  try {
    return await Get_totalComments_by_Account(id);
  } catch (err) {
    throw err;
  }
}
async function add_account(account, image) {
  //xoá thuộc tính trống
  let datajson = JSON.stringify(removeEmptyFields(account));
  const formData = new FormData();
  formData.append("data", datajson);
  formData.append("images", image);
  return await Create_new_account(formData);
}
async function Edit(account, image) {
  //xoá thuộc tính trống
  let datajson = JSON.stringify(removeEmptyFields(account));
  const formData = new FormData();
  formData.append("data", datajson);
  formData.append("images", image);
  return await Edit_Account(account.id, formData);
}
//xoá tài khoản
async function Delete(id) {
  try {
    await Delete_Account(id);
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

function validateData_Create(account) {
  var a = [
    account.username != null &&
      /^[a-zA-Z0-9]+$/.test(account.username) &&
      account.username.length > 4,
    account.password != null && !/\s/.test(account.password),
  ];
  a.forEach((e) => {
    if (e === false) return e;
  });
  return true;
}
export {
  validateData_Create,
  add_account,
  Edit,
  Get_list_accounts,
  Delete,
  Get_List_Province,
  Get_List_districts,
  Get_List_wards,
  Get_totalOrder,
  Get_totalComment
};
