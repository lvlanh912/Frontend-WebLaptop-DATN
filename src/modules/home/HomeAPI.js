import ResponseAPI from '../CallAPI.js'
import axios from "axios";
import {Get_all_Product,FindCategoryByName,Get_Category_by_id,Get_all_News,Get_List_Province,Get_List_districts,Get_List_wards} from '../CallAPI.js'
import { useStore } from 'vuex';
export{Get_List_Province,Get_List_districts,Get_List_wards}
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

export async function FindCategory(keyword){
    if(keyword&&keyword.length>0){
      let data= await FindCategoryByName(keyword)
      return data
    return []
    }
}
export async function GetnameCategory(id){
    try {
       let data= await Get_Category_by_id(id)
       return data.name
    } catch (error) {
        throw error
    }
}
export async function GetCategorybyId(id){
    try {
       let data= await Get_Category_by_id(id)
       return data
    } catch (error) {
        throw error
    }
}

export async function getProduct(pageindex,pagesize,fillterObj,sort){
    try {
       return await Get_all_Product(pageindex,pagesize,fillterObj,sort)
    } catch (error) {
        throw error
    }
}
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
export async function InsertView(productId){
    try {
      await axios.post(`/products/view?id=${productId}`)
    } catch (error) {
        throw error
    }
}
//tin tức
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

//đăng ký
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