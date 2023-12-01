import{Get_all_Product} from '../CallAPI.js'
import ResponseAPI from '../CallAPI.js'
import axios from 'axios';
//get top view product
export async function Gettop6() {
  try {
    let data = await Get_all_Product(1,6,{ 
        keywords: '',
        category:'',
        brand:'',
        min:'',
        max:'',
        stock:''
    },'view_desc')
    return data.items;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Có lỗi xảy ra khi lấy danh sách sản phẩm xem nhiều",
      text: err.message,
    });
  }
}
//get order-pending
export async function getpendingOrder() {
    try {
        let response=await axios.get(`/orders/sum-pending`)
        let data = new ResponseAPI();
        data = response.data;
        return data.result;
      }
      catch(err){
        throw err;
      }
  }
//get account_create-today
export async function Get_Sum_create_Account() {
    try {
        let response=await axios.get(`/users/sum-create`)
        let data = new ResponseAPI();
        data = response.data;
        return data.result;
      }
      catch(err){
        throw err;
      }
  }
  //get comment_create-today
export async function Get_Sum_create_Comment() {
    try {
        let response=await axios.get(`/comments/sum-create`)
        let data = new ResponseAPI();
        data = response.data;
        return data.result;
      }
      catch(err){
        throw err;
      }
  }
//get post_create-today
export async function Get_Sum_create_News() {
    try {
        let response=await axios.get(`/news/sum-create`)
        let data = new ResponseAPI();
        data = response.data;
        return data.result;
      }
      catch(err){
        throw err;
      }
  }
  //get product-out-of-stock
export async function Get_Sum_Product_Out_Stock() {
    try {
        let response=await axios.get(`/products/sum-out-stock`)
        let data = new ResponseAPI();
        data = response.data;
        return data.result;
      }
      catch(err){
        throw err;
      }
  }
  //get voucher-expired
  export async function Get_Sum_Voucher_Expired() {
    try {
        let response=await axios.get(`/vouchers/sum-expired`)
        let data = new ResponseAPI();
        data = response.data;
        return data.result;
      }
      catch(err){
        throw err;
      }
  }