<template>
  <div class="mb-4">
    <div class="col">
        <banner-com/>
    </div>
      <section class=" container-fluid bg-light" >
     <p class="position-relative header fw-bold fs-3 pt-3">Bán chạy<a href="" class=" fs-4 fw-bold text-decoration-none position-absolute end-0">Xem tất cả <i class=""></i></a></p>
     <div class=" row g-1">
      <!-- Sản phẩm bán chạy -->
      <product_slide-vue :products="top_product_sold.items"/>
     </div>
     <div class="list-more"></div>
    </section>
    <!-- Sản phẩm mới cập nhật -->
    <section class="container-fluid bg-light">
     <p class="position-relative header fw-bold fs-3 pt-3">Sản phẩm mới cập nhật<a href="" class=" fs-4 fw-bold text-decoration-none position-absolute end-0">Xem tất cả <i class=""></i></a></p>
     <div class=" row g-1">
      <product_slide-vue :products="new_product_add.items"/>
     </div>
     <div class="list-more"></div>
    </section>
    <!-- Sản phẩm mới cập nhật -->
    <section class="container-fluid bg-light">
     <p class="position-relative header fw-bold fs-3 pt-3">Sản phẩm được xem nhiều<a href="" class=" fs-4 fw-bold text-decoration-none position-absolute end-0">Xem tất cả <i class=""></i></a></p>
     <div class=" row g-1">
      <product_slide-vue :products="new_product_add.items"/>
     </div>
     <div class="list-more"></div>
    </section>
    <section class="container-fluid bg-light">
     <p class="position-relative header fw-bold fs-3 pt-3">Tin tức mới<a href="" class=" fs-4 fw-bold text-decoration-none position-absolute end-0">Xem tất cả <i class=""></i></a></p>
     <div class=" row g-1">
      <MyPost v-for="item in new_post_updated.items" :key="item.id" :post="item" ></MyPost>
     </div>
     <div class="list-more"></div>
    </section>
  </div>
</template>

<script>
import News from '../../components/home/news.vue'
import { onBeforeMount, onMounted, ref } from 'vue'
import {GettopProductSold,GetTopProductNew,GetTopPost} from '../../modules/home/HomeAPI.js'
import BannerCom from '../../components/home/Banner-Com.vue'
import Product_slideVue from '../../components/home/Product_slide.vue'

import MyPost from '../../components/home/Post/MyPost.vue'
export default {
components:{
    News,
    BannerCom,
    Product_slideVue,
    MyPost
},
setup(){
 const top_product_sold=ref([])
 const new_product_add=ref([])
 const new_post_updated=ref([])
  onBeforeMount(async ()=>{
    top_product_sold.value=await GettopProductSold(6)
    new_product_add.value=await GetTopProductNew(6)
    new_post_updated.value=await GetTopPost(6)

  })

    return {
      top_product_sold,new_product_add,
      new_post_updated
    }
}
}
</script>

<style>

</style>../../modules/home/ClientAction.js../../modules/home/HomeAPI.js