import axios from "axios";
class ResponseAPI {
  constructor() {
    (this.Message = "Success"), (this.Result = {});
  }
}
//Account
//Get
async function Get_All_Account(page, size, filterobj, sort) {
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
//thêm
async function Create_new_account(payload) {
  try {
    const response = await axios.post(`users`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.Message;
  } catch (err) {
    throw err;
  }
}
//Sửa
async function Edit_Account(id,payload){
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
//Xoá Account
export async function Delete_Account(id){
  try {
    const response= await axios.delete(`/users/${id}`)
    return response.data.result
  } 
  catch (err) {
    throw err
    
  }
}

async function Get_List_Province() {
  try {
    const response = await axios.get(`/address/provinces`);
    let data = new ResponseAPI();
    data = response.data;
    return data.result;
  } catch (err) {
    throw err;
  }
}

async function Get_List_districts(provinceCode) {
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

async function Get_List_wards(districtCode) {
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
async function Get_all_voucher(page,size,filterobj,sort){
  try{
    let query = {
      pageindex: page,
      pagesize: size,
      keywords: filterobj.keywords,
      createTimeStart: filterobj.createTimeStart,
      createTimeEnd: filterobj.createTimeEnd,
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

export {
  Get_All_Account,
  Edit_Account,
  Get_List_Province,
  Get_List_districts,
  Get_List_wards,
  Create_new_account,
  Get_all_voucher
  
};
