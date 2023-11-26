<template>
  <!-- Sản phẩm đã chọn -->
<div class=" mb-2">
    <strong>Sản phẩm đã chọn:</strong>
    <div v-for="item,index in selected_product" :key="index"
     class=" dropdown-item d-flex justify-content-between">
     <div class="d-flex">
       <div class=" position-relative" style="width: 4rem;height: 4rem;">
           <div class="align-self-center">
               <img class="img-thumbnail border-0" :src="BackendHost+'/images/products/'+item.product.images[0]" alt="">
           </div>
       </div>
           <!-- Tên sản phẩm -->
       <span class="rounded-circle p-1">{{ item.product.productName }}</span>
     </div>
     <!-- Số lượng -->
     <div class="d-flex align-self-center justify-content-end">
       <i @click="DecreseQuantity(item)" class="bi bi-dash text-white bg-red px-2 align-self-center py-2"></i>
        <input @input="GetProduct" v-model="item.quantity" class="form-control text-center" style="max-width: 55px;" type="text">
        <i @click="increseQuantity(item)" class="bi bi-plus text-white bg-blue px-2 align-self-center py-2"></i>
        <i @click="DeleteChoosen(index)" class="bi bi-trash text-white bg-red px-2 align-self-center py-2 ms-2"></i>
     </div>
    </div>
</div>
<br>
  <!-- Danh sách sản phẩm -->
  <div class="dropdown-menu d-block position-static pt-0 mx-0 rounded-3 shadow overflow-hidden w-280px">
    <div class="p-2 mb-2 bg-light border-bottom">
      <input @input="GetProduct" v-model="keywords" type="text" class="form-control" autocomplete="false" placeholder="Type to filter...">
    </div>
    <ul  class="list-unstyled mb-0">
      <li v-if="loading" class=" spinner-border"></li>
      <li v-else  v-for="item,index in list_products" :key="index"
      @click="OnSelect(item)"
        class="d-flex dropdown-item">
        <!-- Ảnh sản phẩm -->
        <div class=" position-relative" style="width: 4rem;height: 4rem;">
            <div class="align-self-center">
                <img class="img-thumbnail border-0" :src="BackendHost+'/images/products/'+item.images[0]" alt="">
            </div>
        </div>
            <!-- Tên sản phẩm -->
        <span class="rounded-circle p-1">{{ item.productName }}</span>
       
    </li>
    </ul>
  </div>
  <h1>Sản phẩm</h1>
</template>

<script>
import {ref} from "vue"
import {Search_Product} from '../../../modules/admin/Order_Manager.js'
export default {
  setup(props, {emit}) {
    const BackendHost=ref(backendHost)
    const keywords = ref("")
    const loading=ref(false)
    const list_products = ref([])
    const selected_product = ref([])
    const OnSelect=(product)=>{
        //Nếu chưa có sản phẩm mới thêm
        if(!selected_product.value.some((item)=>item.product.id==product.id))
        {
            selected_product.value.push({
            product:product,
            quantity:1
        })
        }
        console.log(selected_product.value)
    }
    const DecreseQuantity=(product_select)=>{
      if(product_select.quantity==1)
        return product_select.quantity
      return --product_select.quantity
    }
     const increseQuantity=(product_select)=> ++product_select.quantity
    const DeleteChoosen=(index)=>selected_product.value.splice(index,1)
    
    let timeoutId
      const GetProduct= ()=>{
        clearTimeout(timeoutId);
        try{
          timeoutId = setTimeout(async ()=> {
            if(keywords.value.trim()!=''){
              loading.value=true
              list_products.value=await Search_Product(keywords.value)
              loading.value=false
            }
            else
            list_products.value=[]
         
          }, 1000);
        }
        catch{}
      }
    return {
      GetProduct,
      loading,
      list_products,
      selected_product,
      keywords,OnSelect,
      BackendHost,
      DecreseQuantity,
      increseQuantity,
      DeleteChoosen,
    }
  },
}
</script>

<style></style>
