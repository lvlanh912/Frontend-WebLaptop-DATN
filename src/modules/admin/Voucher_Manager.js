import { Create_new_Voucher, Edit_Voucher, Get_all_voucher,Delete_Voucher } from "../CallAPI";
import removeEmptyFields from "../removeEmptyFields";

function ValidateData(Voucher) {
  if (Voucher.code == null || Voucher.code == "")
    return "Mã giảm giá không được để trống";
  if (!Voucher.code.match(/^[A-Za-z0-9]*$/))
    return "Mã giảm giá chứa ký tự không hợp lệ";
  if (Voucher.minApply == null) return "Đơn hàng tối thiểu không được để trống";
  if (Voucher.value == null || Voucher.value == 0)
    return "Giá trị không được để trống và phải lớn hơn 0";
  if (Voucher.quantity == null || Voucher.quantity <= 0)
    return "Số lượng phải lớn hơn 0";
  if (Voucher.startAt == null || Voucher.startAt == "")
    return "Vui lòng chọn ngày bắt đầu";
  if (Voucher.endAt == null || Voucher.endAt == "")
    return "Vui lòng chọn ngày kết thúc";
}

async function Add(Voucher) {
  let result = {
    success: false,
    data: {},
  };
  try {
    let dataValid = ValidateData(Voucher);
    if (dataValid === undefined) {
      result.success = true;
      let payload = JSON.stringify(removeEmptyFields(Voucher));
      result.data = await Create_new_Voucher(payload);
    } else result.data = dataValid;
  } catch (ex) {
    result.success = false;
    result.data = ex.message;
  } finally {
    return result;
  }
}
async function Edit(Voucher) {
  let result = {
    success: false,
    data: {},
  };
  try {
    let dataValid = ValidateData(Voucher);
    const id=Voucher.id
    if (dataValid === undefined) {
      result.success = true;
      let payload = JSON.stringify(removeEmptyFields(Voucher));
      result.data = await Edit_Voucher(payload,id);
    } 
    else result.data = dataValid;
  } catch (ex) {
    result.success = false;
    result.data = ex.message;
  } finally {
    return result;
  }
}
//Đổi định dạng ngày tháng
function convertdatetime(item) {
  const _startAt = new Date(item.startAt);
  const _endAt = new Date(item.endAt);
  const _CreateAt = new Date(item.createAt);
  return {
    ...item, // Giữ nguyên các thuộc tính khác
    createAt: `${_CreateAt.toLocaleDateString()} ${_CreateAt.toLocaleTimeString()}`,
    startAt: `${_startAt.toLocaleDateString()} ${_startAt.toLocaleTimeString()}`,
    endAt: `${_endAt.toLocaleDateString()} ${_endAt.toLocaleTimeString()}`,
  };
}
async function GetAll(page = 1, size = 10, filterobj, sort) {
  try {
    let data = await Get_all_voucher(page, size, filterobj, sort);
    data.items = data.items.map(convertdatetime);
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
    await Delete_Voucher(id);
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

export { GetAll, Add,Edit, ValidateData,Delete };
