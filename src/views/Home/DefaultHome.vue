<template>
    <div class="col">
        <banner-com/>
        <!-- Tin tức -->
    </div>
      <section class=" container container-fluid bg-custom" >
     <p class="position-relative header fw-bold fs-3 pt-3">Bán chạy<a href="" class=" fs-4 fw-bold text-decoration-none position-absolute end-0">Xem tất cả <i class=""></i></a></p>
     <div class=" row g-2">
      <!-- Sản phẩm bán chạy -->
      <product v-for="laptop in list_laptop" :key="laptop" :item="laptop"/>
     </div>
     <div class="list-more"></div>
    </section>
    <section class="container-fluid bg-light bg-white">
     <p class="position-relative header fw-bold fs-3 pt-3">Laptop mới cập nhật<a href="" class=" fs-4 fw-bold text-decoration-none position-absolute end-0">Xem tất cả <i class=""></i></a></p>
     <div class=" row g-2">
      <product v-for="laptop in list_laptop" :key="laptop" :item="laptop"/>
     </div>
     <div class="list-more"></div>
    </section>
    <section class="container-fluid bg-light bg-white mt-4">
     <p class="position-relative header fw-bold fs-3 pt-3">Phụ kiện<a href="" class=" fs-4 fw-bold text-decoration-none position-absolute end-0">Xem tất cả <i class=""></i></a></p>
     <div class=" row g-2">
       <product v-for="laptop in list_laptop" :key="laptop" :item="laptop"/>
     </div>
     <div class="list-more"></div>
    </section>
    <section class="container-fluid bg-light bg-white mt-4">
     <p class="position-relative header fw-bold fs-3 pt-3">Tin tức<a href="" class=" fs-4 fw-bold text-decoration-none position-absolute end-0">Xem tất cả <i class=""></i></a></p>
     <div class="row g-2">
      <news v-for="n in 3" :key="n"/>
     </div>
     <div class="list-more"></div>
    
  </section>
</template>

<script>
import BannerCom from '../../components/home/Banner-Com.vue'
import Product from '../../components/home/Product.vue'
import News from '../../components/home/news.vue'
import list_laptop from '../../data/data-sample/laptop.js'
export default {
components:{
    Product,
    News,
    BannerCom

},
setup(){
    return {list_laptop}
}
}
</script>

<style>

</style>