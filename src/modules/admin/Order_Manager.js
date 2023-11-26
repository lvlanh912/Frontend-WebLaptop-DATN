import Order from "../../model/Order.js"
import {
  Get_all_Order,
  Get_all_ProductsbyKeyword,
  Create_new_Order,
  Update_Order,
  Delete_Order,
} from "../CallAPI.js"
import removeEmptyFields from "../removeEmptyFields.js"

function Validate(Order) {
  if (Object.keys(Order.voucher).length < 1) Order.voucher = null
  if (Order.items.length == 0) throw new Error("Phải có ít nhất 1 sản phẩm")
  if (Object.keys(Order.shippingAddress).length < 2)
    throw new Error("Phải có thông tin người mua")
  if (Order.shippingAddress.fullname == "")
    throw new Error("Phải có họ tên khách hàng")
  if (Order.shippingAddress.address == "")
    throw new Error("Phải có địa chỉ nhận hàng")
}

function Validate_ShippingAddress(shippingAddress) {
  console.log(shippingAddress)
  if (Object.keys(shippingAddress) < 2)
    throw new Error("Thông tin người nhận không hợp lệ")
  if (shippingAddress.fullname == "")
    throw new Error("Phải có họ tên khách hàng")
  if (shippingAddress.address == "")
    throw new Error("Phải có địa chỉ nhận hàng")
  if (shippingAddress.phone != undefined || shippingAddress.phone != null)
    if (
      (shippingAddress.phone < 300000000 && shippingAddress.phone.length > 0) ||
      (shippingAddress.phone > 999999999 && shippingAddress.phone.length > 0)
    )
      throw new Error("Số điện thoại không hợp lệ")
}

export async function GetAll(page = 1, size = 25, filterobj, sort) {
  try {
    return await Get_all_Order((page = 1), (size = 25), filterobj, sort)
  } catch (err) {
    throw err
  }
}
export async function Search_Product(keyword) {
  try {
    return await Get_all_ProductsbyKeyword(keyword)
  } catch (err) {
    throw err
  }
}
export async function Add(Order) {
  let result = {
    success: false,
    data: {},
  }
  try {
    Validate(Order)
    result.success = true
    let payload = JSON.stringify(removeEmptyFields(Order))
    result.data = await Create_new_Order(payload)
  } catch (ex) {
    result.success = false
    result.data = ex.response.data.message ?? ex.message
  } finally {
    return result
  }
}

//Validate Addresss
export async function Edit(id, shippingAddress, ispaid, status) {
  let result = {
    success: false,
    data: {},
  }
  try {
    Validate_ShippingAddress(shippingAddress)
    result.success = true
    let payload = JSON.stringify(removeEmptyFields(shippingAddress))
    result.data = await Update_Order(id, payload, ispaid, status)
  } catch (ex) {
    console.log(ex.message)
    result.success = false
    result.data = ex.response ? ex.response.data.message : ex.message
  } finally {
    return result
  }
}

export async function Delete(order) {
  if (order.status.code != 0)
    throw new Error("Chỉ cho phép xoá đơn hàng đã huỷ")
  await Delete_Order(order.id)
}
