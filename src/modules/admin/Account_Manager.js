import { Get_All_Account,Create_new_account, Get_List_Province, Get_List_districts, Get_List_wards } from "../CallAPI.js"
import removeEmptyFields from "../removeEmptyFields.js"
async function Get_list_accounts(page = 1, size = 5,filterobj, sort = '') {
       try {
              return await Get_All_Account(page, size, filterobj, sort)
       }
       catch (err) {
              throw err
       }
}

async function add_account(account,image){
       //xoá thuộc tính trống
       let datajson= JSON.stringify(removeEmptyFields(account))
       const formData = new FormData();
       formData.append('data',datajson)
       formData.append('images',image)
      return await Create_new_account(formData)
}

function validateData_Create(account){
var a=[
       account.username!=null && /^[a-zA-Z0-9]+$/.test(account.username) && account.username.length>4
       ,account.password!=null && !/\s/.test(account.password)
]
      a.forEach(e=>{
       if(e===false) 
              return e
      })
      return true
}
export {validateData_Create,add_account,
        Get_list_accounts, Get_List_Province, Get_List_districts, Get_List_wards, }