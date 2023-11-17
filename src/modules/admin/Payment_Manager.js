import {
  Get_all_Payment,
  Create_new_Payment,
  Edit_Payment,
  Delete_Payment,
} from "../CallAPI.js";
import removeEmptyFields from "../removeEmptyFields.js";

export async function Get() {
  try {
    return await Get_all_Payment();
  } catch (err) {
    throw err;
  }
}
export async function Add(Payment) {
  let result = {
    success: false,
    data: {},
  };
  try {
    let dataValid = ValidateData(Payment);
    if (dataValid === undefined) {
      result.success = true;
      let payload = JSON.stringify(removeEmptyFields(Payment));
      result.data = await Create_new_Payment(payload);
    } else result.data = dataValid;
  } catch (ex) {
    result.success = false;
    result.data = ex.message;
  } finally {
    return result;
  }
}
export async function Edit(Payment) {
  let result = {
    success: false,
    data: {},
  };
  try {
    let dataValid = ValidateData(Payment);
    const id = Payment.id;
    if (dataValid === undefined) {
      result.success = true;
      let payload = JSON.stringify(removeEmptyFields(Payment));
      result.data = await Edit_Payment(payload, id);
    } else result.data = dataValid;
  } catch (ex) {
    result.success = false;
    result.data = ex.message;
  } finally {
    return result;
  }
}
//xoá tài khoản
export async function Delete(id) {
  try {
    await Delete_Payment(id);
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

function ValidateData(Payment) {
  if (Payment.name == null || Payment.name == "")
    return "Tên phương thức không được để trống";
}
