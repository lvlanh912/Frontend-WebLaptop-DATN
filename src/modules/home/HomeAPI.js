import ResponseAPI from '../CallAPI.js'
import axios from "axios";
import {Get_all_Product,FindCategoryByName,Get_Category_by_id,Get_all_News,Get_List_Province,Get_List_districts,Get_List_wards} from '../CallAPI.js'
import { useStore } from 'vuex';
export{Get_List_Province,Get_List_districts,Get_List_wards}
//Lấy danh sách danh mục gốc
export async function getCategory_noParent(){
    try {
      const response= await axios.get('/categories')
        let data = new ResponseAPI();
        data = response.data;
        return data.result.items;
    } catch (error) {
        throw error
    }
}
//Lấy danh sách danh mục con
export async function getChildsCategory(ParentCategoryId){
    try {
      const response= await axios.get(`/categories/get-childs-category?parrentID=${ParentCategoryId}`)
        let data = new ResponseAPI();
        data = response.data;
        return data.result;
    } catch (error) {
        throw error
    }
}
//lấy danh sách danh mục cùng cấp
export async function GetSameLeverCategory(categoryID){
    try {
      const response= await axios.get(`/categories/get-same-categories?categoryID=${categoryID}`)
        let data = new ResponseAPI();
        data = response.data;
        return data.result;
    } catch (error) {
        throw error
    }
}
//Tìm danh mục bằng từ khoá
export async function FindCategory(keyword){
    if(keyword&&keyword.length>0){
      let data= await FindCategoryByName(keyword)
      return data
    return []
    }
}
//lấy tên danh mục
export async function GetnameCategory(id){
    try {
       let data= await Get_Category_by_id(id)
       return data.name
    } catch (error) {
        throw error
    }
}
//lấy thông tin danh mục
export async function GetCategorybyId(id){
    try {
       let data= await Get_Category_by_id(id)
       return data
    } catch (error) {
        throw error
    }
}
//lấy danh sách sản phẩm
export async function getProduct(pageindex,pagesize,fillterObj,sort){
    try {
       return await Get_all_Product(pageindex,pagesize,fillterObj,sort)
    } catch (error) {
        throw error
    }
}
//lấy danh sách các sản phẩm bán chạy
export async function GettopProductSold(value){
    try {
        let fillterObj={
            keywords:'',
            category:'',
            brand:'',
            min:'',
            max:'',
            stock:''
        }
       return await Get_all_Product(1,value,fillterObj,'sold_desc')
    } catch (error) {
        throw error
    }
}
//lấy danh sách các sản phẩm mới được thêm vào hệ thống
export async function GetTopProductNew(value){
    try {
        let fillterObj={
            keywords:'',
            category:'',
            brand:'',
            min:'',
            max:'',
            stock:''
        }
       return await Get_all_Product(1,value,fillterObj,'date_desc')
    } catch (error) {
        throw error
    }
}
//lấy thông tin sản phẩm 
export async function GetProductbyId(productId){
    try {
      const response= await axios.get(`/products/${productId}`)
        let data = new ResponseAPI();
        data = response.data;
        return data.result;
    } catch (error) {
        throw error
    }
}
//tăng lượt xem sản phẩm
export async function InsertView(productId){
    try {
      await axios.post(`/products/view?id=${productId}`)
    } catch (error) {
        throw error
    }
}
//lấy danh sách tin đăng
export async function getPost(pageindex,pagesize,sort,keyword){
    try {
        const fillterObj={
            keywords: keyword,
            startdate: '',
            enddate: '',
        }
        return await Get_all_News(pageindex,pagesize,fillterObj,sort)
    } catch (error) {
    }
}
//lấy bài đăng mới nhất
export async function GetTopPost(value){
    try {
        const fillterObj={
            keywords: '',
            startdate: '',
            enddate: '',
        }
        return await Get_all_News(1,value,fillterObj,'date_desc')
    } catch (error) {
    }
}
//lấy thông tin bài đăng 
export async function getPostbyid(id){
    try {
        const response= await axios.get(`/news/${id}`)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}

//đăng ký tài khoản mới
export async function SignUp(payload){
    try {
        const response= await axios.post(`/auth/sign-up`,payload)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//đăng nhập
export async function SignIn(payload){
    try {
        const response= await axios.post(`/auth/sign-in`,payload)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//Giỏ hàng
//Lấy giỏ hàng
export async function GetCart(){
    try {
        const response= await axios.get(`/cart`)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//Thêm giỏ hàng
export async function AddtoCart(Payload){
    try {
        const response= await axios.post(`/cart/add`,Payload)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//Cập nhật số lượng sản phẩm trong giỏ hàng
export async function UpdateQuantity(Payload){
    try {
        const response= await axios.patch(`/cart`,Payload)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//Xoá sản phẩm trong giỏ hàng
export async function DeleteOneItem(Payload){
    try {
        const response= await axios.patch(`/cart/delete-item`,Payload)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//Làm trống giỏ hàng
export async function DeleteAllItem(){
    try {
        const response= await axios.delete(`/cart`)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//lấy thông tin tài khoản
export async function GetProfile(){
    try {
        const response= await axios.get(`/users/profile`)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//cập nhật avt
export async function updateAvatar(image) {
    try {
        const formData = new FormData();
        formData.append('image',image)
      const response = await axios.patch(`users/update-avatar`, formData, 
      {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.message;
    } catch (err) {
      throw err;
    }
  }
//cập nhật thông tin (tên và địa chỉ)
export async function updateInfor(Payload) {
    try {
        const response= await axios.patch(`/users/update-infor`,Payload)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//Thêm địa chỉ nhận hàng
export async function AddNewShippingAddress(Payload){
    try {
        const response= await axios.post(`/users/shipping-address`,Payload)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//Sửa địa chỉ nhận hàng
export async function EditShippingAddress(Payload){
    try {
        const response= await axios.put(`/users/shipping-address/${Payload.id}`,Payload)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//Xoá địa chỉ nhận hàng
export async function DeleteMyShippingAddress(id){
    try {
        const response= await axios.delete(`/users/shipping-address/${id}`)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//Lấy danh sách địa chỉ nhận hàng
export async function GetMyShippingAddress(){
    try {
        const response= await axios.get(`/users/shipping-address`)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//Lấy địa chỉ huyện tỉnh với mã xã
export async function GetFulladdress(wardID){
    try {
        const response= await axios.get(`/address/${wardID}`)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//lấy danh sách phiên đăng nhập
export async function GetMySessions(){
    try {
        const response= await axios.get(`/users/session`)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//Xoá phiên đăng nhập
export async function DeleteSession(id){
    try {
        const response= await axios.delete(`/users/delete-session/${id}`)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//Đăng xuất, xoá phiên đăng nhập hiện tại
export async function DeleteMySession(){
    try {
        const response= await axios.delete(`/users/logout`)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//Lấy danh sách phương thức thanh toán
export async function GetPaymentMethod(){
    try {
        const response= await axios.get(`/payments/list-payments`)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}

//xem trước đơn hàng
export async function CheckOut(Payload){
    try {
        const response= await axios.post(`/orders/checkout`,Payload)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//Tạo đơn hàng mới
export async function CreateOrder(Payload){
    try {
        const response= await axios.post(`/orders/create-order`,Payload)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//Lấy danh sách đơn hàng
export async function GetMyOrders(type=null,page=1,size=10){
    try {
        let query = {
            pageindex: page,
            pagesize: size,
            type:type
          };
        const response= await axios.get(`/orders/my-orders`,{
            params:query
        })
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}

//Lấy danh sách đánh giá
export async function GetComments(productId){
    try {

        const response= await axios.get(`/comments/${productId}`)
          let data = new ResponseAPI();
          data = response.data;
          return data.Result;
      } catch (error) {
          throw error
      }
}

//Tạo đánh giá mới
export async function CreateComment(Payload){
    try {
        const response= await axios.post(`/comments`,Payload)
          let data = new ResponseAPI();
          data = response.data;
          return data.result;
      } catch (error) {
          throw error
      }
}
//đổi mật khẩu
export async function ChangePassword(Payload){
    try {
        const response= await axios.post(`/users/change-password`,Payload)
          let data = response.data;
          data.result;
      } catch (error) {
          throw error
      }
}