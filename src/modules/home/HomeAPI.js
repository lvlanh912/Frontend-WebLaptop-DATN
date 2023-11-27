import ResponseAPI from '../CallAPI.js'
import axios from "axios";
import {Get_all_Product} from '../CallAPI.js'

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
export async function getProduct(pageindex,pagesize,fillterObj,sort){
    try {
       return await Get_all_Product(pageindex,pagesize,fillterObj,sort)
    } catch (error) {
        throw error
    }
}
