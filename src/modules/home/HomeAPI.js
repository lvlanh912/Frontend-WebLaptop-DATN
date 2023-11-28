import ResponseAPI from '../CallAPI.js'
import axios from "axios";
import {Get_all_Product,FindCategoryByName,Get_Category_by_id,Get_all_News} from '../CallAPI.js'

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

export async function getProduct(pageindex,pagesize,fillterObj,sort){
    try {
       return await Get_all_Product(pageindex,pagesize,fillterObj,sort)
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
