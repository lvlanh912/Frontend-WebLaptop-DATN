<template>
  <!-- Sản phẩm đã chọn -->
<div class=" mb-2">
    <strong>Sản phẩm đã chọn:</strong>
    <div v-for="item,index in selected_product" :key="index"
     class=" dropdown-item d-flex">
        <div class=" position-relative" style="width: 4rem;height: 4rem;">
            <div class="align-self-center">
                <img class="img-thumbnail border-0" :src="BackendHost+'/images/products/'+item.product.Images[0]" alt="">
            </div>
        </div>
            <!-- Tên sản phẩm -->
        <span class="rounded-circle p-1">{{ item.product.productName }}</span>
    </div>
</div>
<br>
  <!-- Danh sách sản phẩm -->
  <div class="dropdown-menu d-block position-static pt-0 mx-0 rounded-3 shadow overflow-hidden w-280px">
    <div class="p-2 mb-2 bg-light border-bottom">
      <input v-model="keywords" type="text" class="form-control" autocomplete="false" placeholder="Type to filter...">
    </div>
    <ul class="list-unstyled mb-0">
      <li  v-for="item,index in list_products" :key="index"
      @click="OnSelect(item)"
        class="d-flex dropdown-item">
        <!-- Ảnh sản phẩm -->
        <div class=" position-relative" style="width: 4rem;height: 4rem;">
            <div class="align-self-center">
                <img class="img-thumbnail border-0" :src="BackendHost+'/images/products/'+item.Images[0]" alt="">
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

export default {
  setup(props, {emit}) {
    const BackendHost=ref(backendHost)
    const keywords = ref("")
    const list_products = ref([
      {
        id:"aaksasjsj",
        productName: "Sản phẩm 1",
        Price: 50000,
        Product_CategoriesID: [],
        Max_Price: 60000,
        CreateAt: {
          $date: "2023-11-23T15:00:34.850Z",
        },
        Images: [
          "products655f6912764490c6b14390a7-0.jpg",
          "products655f6912764490c6b14390a7-1.jpg",
        ],
        Stock: 36,
        Sold: 64,
        View: {
          $numberLong: "0",
        },
        Brand_name: "SAMSUNG",
        Weight: 500,
        Special: [],
      },
      {
        productName: "Sản phẩm 2",
        Price: 50000,
        Product_CategoriesID: [],
        Max_Price: 60000,
        CreateAt: {
          $date: "2023-11-23T15:00:34.850Z",
        },
        Images: [
          "products655f6912764490c6b14390a7-0.jpg",
          "products655f6912764490c6b14390a7-1.jpg",
        ],
        Stock: 36,
        Sold: 64,
        View: {
          $numberLong: "0",
        },
        Brand_name: "SAMSUNG",
        Weight: 500,
        Special: [],
      },
    ])
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
    const GetProduct = () => {}
    return {
      list_products,
      selected_product,
      keywords,OnSelect,
      BackendHost
    }
  },
}
</script>

<style></style>
