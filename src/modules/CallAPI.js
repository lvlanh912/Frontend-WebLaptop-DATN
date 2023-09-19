import axios from 'axios'
class ResponseAPI{
  constructor(){
    this.Message="Success",
    this.Result= {}
  }
}

async function Get_All_Account(page, size,keywords,sort) {
    try {
      const response = await axios.get(`/users?pageIndex=${page}&pageSize=${size}&keywords=${keywords??''}&sort=${sort??''}`);

    let data=new ResponseAPI()
      data = response.data;
      return data.result;
    } catch (err) {
      throw err
    }
  }
  async function Get_List_Province() {
    try {
      const response = await axios.get(`/address/provinces`);
      let data=new ResponseAPI()
      data = response.data;
      return data.result;
    } catch (err) {
      throw err
    }
  }

  async function Get_List_districts(provinceCode) {
    try {
      const response = await axios.get(`/address/districts?ProvinceCode=${provinceCode}`);
    let data=new ResponseAPI()
      data = response.data;
      return data.result;
    } catch (err) {
      throw err
    }
  }

  async function Get_List_wards(districtCode) {
    try {
      const response = await axios.get(`address/wards?DistrictCode=${districtCode}`);
    let data=new ResponseAPI()
      data = response.data;
      return data.result;
    } catch (err) {
      throw err
    }
  }
  async function Create_new_account(payload){
    try {
      const response=await axios.post(`users`,payload,
      {headers:{'Content-Type': 'multipart/form-data' }}
      )
      return response.data.Message
    }
    catch(err){
      throw err
    }
  }

  export  {Get_All_Account,Get_List_Province,Get_List_districts,Get_List_wards,Create_new_account}