import axios from "axios";
class ResponseAPI {
  constructor() {
    (this.Message = "Success"), (this.Result = {});
  }
}
export default ResponseAPI
//Account
//Get all
export async function Get_All_Account(page, size, filterobj, sort) {
  try {
    let query = {
      pageIndex: page,
      pageSize: size,
      keywords: filterobj.keywords,
      startdate: filterobj.startDate,
      endate: filterobj.endDate,
      gender: filterobj.gender,
      role: filterobj.role,
      type: filterobj.seach_type,
      sort: sort,
    };
    const response = await axios.get(`/users`, {
      params: query,
    });
    let data = new ResponseAPI();
    data = response.data;
    return data.result;
  } catch (err) {
    throw err;
  }
}
//Add
export async function Create_new_account(payload) {
  try {
    const response = await axios.post(`users`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.Message;
  } catch (err) {
    throw err;
  }
}
//Update
export async function Edit_Account(id,payload){
  try {
    console.log(payload)
    const response = await axios.put(`/users/${id}`,payload,{
      headers:{"Content-Type":"multipart/form-data"}
    });
    let data = new ResponseAPI();
    data = response.data;
    return data.result;
  } catch (err) {
    throw err;
  }
}
//Delete
export async function Delete_Account(id){
  try {
    const response= await axios.delete(`/users/${id}`)
    return response.data.result
  } 
  catch (err) {
    throw err
    
  }
}
//Get total order
export async function Get_totalOrder_by_Account(id){
  try {
    const response= await axios.get(`/users/total-orders?id=${id}`)
    return response.data.result
  } 
  catch (err) {
    throw err
    
  }
}
//Get total comments
export async function Get_totalComments_by_Account(id){
  try {
    const response= await axios.get(`/users/total-comments?id=${id}`)
    return response.data.result
  } 
  catch (err) {
    throw err
    
  }
}
//bộ select địa chỉ
export async function Get_List_Province() {
  try {
    const response = await axios.get(`/address/provinces`);
    let data = new ResponseAPI();
    data = response.data;
    return data.result;
  } catch (err) {
    throw err;
  }
}
export async function Get_List_districts(provinceCode) {
  try {
    const response = await axios.get(
      `/address/districts?ProvinceCode=${provinceCode}`
    );
    let data = new ResponseAPI();
    data = response.data;
    return data.result;
  } catch (err) {
    throw err;
  }
}
export async function Get_List_wards(districtCode) {
  try {
    const response = await axios.get(
      `address/wards?DistrictCode=${districtCode}`
    );
    let data = new ResponseAPI();
    data = response.data;
    return data.result;
  } catch (err) {
    throw err;
  }
}
//Voucher
//Get
export async function Get_all_voucher(page,size,filterobj,sort){
  try{
    let query = {
      pageindex: page,
      pagesize: size,
      keywords: filterobj.keywords,
      createTimeStart: filterobj.createTimeStart,
      createTimeEnd: filterobj.createTimeEnd,
      active: filterobj.active,
      sort: sort,
  }
    let response=await axios.get('/vouchers',{
      params:query
    })
    let data = new ResponseAPI();
    data = response.data;
    return data.result;
  }
  catch(err){
    throw err;
  }
  
}
//Create
export async function Create_new_Voucher(payload) {
  try {
    const response = await axios.post(`vouchers`, payload,{
      headers:{"Content-Type":"application/json"}
    });
    return response.data.message;
  } catch (err) {
    throw err;
  }
}
//Update
export async function Edit_Voucher(payload,id) {
  try {
    const response = await axios.put(`vouchers/${id}`, payload,{
      headers:{"Content-Type":"application/json"}
    });
    return response.data.message;
  } catch (err) {
    throw err;
  }
}
//Delete
export async function Delete_Voucher(id){
  try {
    const response= await axios.delete(`/vouchers/${id}`)
    return response.data.result
  } 
  catch (err) {
    throw err
  }
}

//Phương thức thanh toán
//Get
export async function Get_all_Payment(){
  try{
    let response=await axios.get('/payments',{
    })
    let data = new ResponseAPI();
    data = response.data;
    return data.result;
  }
  catch(err){
    throw err;
  }
  
}
//Create
export async function Create_new_Payment(payload) {
  try {
    const response = await axios.post(`payments`, payload,{
      headers:{"Content-Type":"application/json"}
    });
    return response.data.message;
  } catch (err) {
    throw err;
  }
}
//Update
export async function Edit_Payment(payload,id) {
  try {
    const response = await axios.put(`payments/${id}`, payload,{
      headers:{"Content-Type":"application/json"}
    });
    return response.data.message;
  } catch (err) {
    throw err;
  }
}
//Delete
export async function Delete_Payment(id){
  try {
    const response= await axios.delete(`/payments/${id}`)
    return response.data.result
  } 
  catch (err) {
    throw err
  }
}

//News

//Get
export async function Get_all_News(page,size,filterobj,sort){
  try{
    let query = {
      pageindex: page,
      pagesize: size,
      keywords: filterobj.keywords,
      startdate: filterobj.createTimeStart,
      enddate: filterobj.createTimeEnd,
      sort: sort,
  }
    let response=await axios.get('/news',{
      params:query
    })
    let data = new ResponseAPI();
    data = response.data;
    return data.result;
  }
  catch(err){
    throw err;
  }
  
}
//Create
export async function Create_News(payload) {
  try {
    const response = await axios.post(`news`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.Message;
  } catch (err) {
    throw err;
  }
}
//Update
export async function Edit_News(payload,id) {
  try {
    const response = await axios.put(`news/${id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.Message;
  } catch (err) {
    throw err;
  }
}
//Delete
export async function Delete_News(id){
  try {
    const response= await axios.delete(`/news/${id}`)
    return response.data.result
  } 
  catch (err) {
    throw err
  }
}
//Category
//Get
export async function Get_all_Category(ParentCategoryId,page,size,filterobj,sort){
  try{
    let query = {
      pageindex: page,
      pagesize: size,
      keywords: filterobj.keywords,
      sort: sort,
  }
    let response=await axios.get(ParentCategoryId!=null?`/categories/${ParentCategoryId}`:'/categories',{
      params:query
    })
    let data = new ResponseAPI();
    data = response.data;
    return data.result;
  }
  catch(err){
    throw err;
  }
  
}
export async function FindCategoryByName(name){
  try{
    let query = {
      name: name
  }
    let response=await axios.get(`/categories/getbyname`,
    {
      params:query
    })
    let data = new ResponseAPI();
    data = response.data;
    return data.result;
  }
  catch(err){
    throw err;
  }
  
}
//Create
export async function Create_new_Category(payload) {
  try {
    const response = await axios.post(`categories`, payload,{
      headers:{"Content-Type":"application/json"}
    });
    return response.data.message;
  } catch (err) {
    throw err;
  }
}
export async function Get_Category_by_id(CategoryId){
  try{
    if(CategoryId==undefined||CategoryId=='')
    return {}
    let response=await axios.get(`/categories/getbyId?id=${CategoryId}`)
    let data = new ResponseAPI();
    data = response.data;
    return data.result;
  }
  catch(err){
    throw err;
  }
}
//Update
export async function Edit_Category(payload,id) {
  try {
    const response = await axios.put(`categories/${id}`, payload,{
      headers:{"Content-Type":"application/json"}
    });
    return response.data.message;
  } catch (err) {
    throw err;
  }
}
//Delete
export async function Delete_Category(id){
  try {
    const response= await axios.delete(`/categories/${id}`)
    return response.data.result
  } 
  catch (err) {
    throw err
  }
}
//Product
//Get
export async function Get_all_Product(page,size,filterobj,sort){
  try{
    let query = {
      pageindex: page,
      pagesize: size,
      keywords: filterobj.keywords,
      category:filterobj.category,
      brand:filterobj.brand,
      min:filterobj.min,
      max:filterobj.max,
      stock:filterobj.stock,
      sort: sort,
  }
    let response=await axios.get(`/products`,
    {
      params:query
    })
    let data = new ResponseAPI();
    data = response.data;
    return data.result;
  }
  catch(err){
    throw err;
  }
  
}
//Create
//Add
export async function Create_new_Product(payload) {
  try {
    const response = await axios.post(`products`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.Message;
  } catch (err) {
    throw err;
  }
}
//Edit
export async function Edit_Product(id,payload) {
  try {
    const response = await axios.put(`products/${id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.Message;
  } catch (err) {
    throw err;
  }
}
//Delete
export async function Delete_Product(id){
  try {
    const response = await axios.delete(`products/${id}`)
    return response.data.Message;
  } catch (err) {
    throw err;
  }
}

//Orders
//get
export async function Get_all_Order(page,size,filterobj,sort){
  try{
    let query = {
      pageindex: page,
      pagesize: size,
      accountid: filterobj.accountid,
      status:filterobj.status,
      isPaid:filterobj.isPaid,
      paymentId:filterobj.paymentId,
      minPaid:filterobj.minPaid,
      maxPaid:filterobj.maxPaid,
      startdate:filterobj.startdate,
      enddate:filterobj.enddate,
      sort: sort,
  }
    let response=await axios.get(`/orders`,
    {
      params:query
    })
    let data = new ResponseAPI();
    data = response.data;
    return data.result;
  }
  catch(err){
    throw err;
  }
  
}

export async function Get_all_ProductsbyKeyword(keyword){
  try{
    let query = {
      keywords:keyword
  }
    let response=await axios.get(`/products/search`,
    {
      params:query
    })
    let data = new ResponseAPI();
    data = response.data;
    return data.result;
  }
  catch(err){
    throw err;
  }
  
}
//create
export async function Create_new_Order(payload) {
  try {
    const response = await axios.post(`orders/create`, payload,{
      headers:{"Content-Type":"application/json"}
    });
    return response.data.message;
  } catch (err) {
    throw err;
  }
}
//Update
export async function Update_Order(id,shippingAddress,ispaid,status) {
  try {
    let query = {
      ispaid:ispaid,
      status:status,
    }
    const response = await axios.put(`orders/${id}`, shippingAddress,{
      params:query,
      headers:{"Content-Type":"application/json"}
    });
    return response.data.message;
  } catch (err) {
    throw err;
  }
}
//Delete
export async function Delete_Order(id){
  try {
    const response = await axios.delete(`orders/${id}`)
    return response.data.Message;
  } catch (err) {
    throw err;
  }
}
//Commnet
//Get-all
export async function Get_all_Comments(page,size,filterobj,sort){
  try{
    let query = {
      pageindex: page,
      pagesize: size,
      accountid: filterobj.accountid,
      productId: filterobj.productId,
      keywords:filterobj.keywords,
      sort: sort,
  }
    let response=await axios.get(`/comments`,
    {
      params:query
    })
    let data = new ResponseAPI();
    data = response.data;
    return data.result;
  }
  catch(err){
    throw err;
  }
  
}
//Update
export async function Edit_Comment(payload,id) {
  try {
    const response = await axios.put(`comments/${id}`, payload,{
      headers:{"Content-Type":"application/json"}
    });
    return response.data.message;
  } catch (err) {
    throw err;
  }
}
//Delete
export async function Delete_Comment(id){
  try {
    const response = await axios.delete(`comments/${id}`)
    return response.data.Message;
  } catch (err) {
    throw err;
  }
}