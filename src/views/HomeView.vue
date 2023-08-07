<template>
  <Teleport to="body">
    <header_com/>
    <section class="row">
      <div class="col-12">
        <banner-com/>
      </div>
    </section>
    <section class=" bg-custom" >
     <p class="position-relative header fw-bold fs-3 pt-3">Bán chạy<a href="" class=" fs-4 fw-bold text-decoration-none position-absolute end-0">Xem tất cả <i class=""></i></a></p>
     <div class=" row g-2">
      <product v-for="laptop in list_laptop" :item="laptop"/>
     </div>
     <div class="list-more"></div>
    </section>
    <section class="container-fluid bg-light bg-white">
     <p class="position-relative header fw-bold fs-3 pt-3">Laptop mới cập nhật<a href="" class=" fs-4 fw-bold text-decoration-none position-absolute end-0">Xem tất cả <i class=""></i></a></p>
     <div class=" row g-2">
      <product v-for="laptop in list_laptop" :item="laptop"/>
     </div>
     <div class="list-more"></div>
    </section>
    <section class="container-fluid bg-light bg-white mt-4">
     <p class="position-relative header fw-bold fs-3 pt-3">Phụ kiện<a href="" class=" fs-4 fw-bold text-decoration-none position-absolute end-0">Xem tất cả <i class=""></i></a></p>
     <div class=" row g-2">
       <product v-for="laptop in list_laptop" :item="laptop"/>
     </div>
     <div class="list-more"></div>
    </section>
    <section class="container-fluid bg-light bg-white mt-4">
     <p class="position-relative header fw-bold fs-3 pt-3">Tin tức<a href="" class=" fs-4 fw-bold text-decoration-none position-absolute end-0">Xem tất cả <i class=""></i></a></p>
     <div class="row g-2">
      <news v-for="n in 3"/>
     </div>
     <div class="list-more"></div>
    
  </section>
    <footer-com/>
  </Teleport>
</template>

<script>
import Product from '../components/home/Product.vue'
import Header from '../components/Header.vue'
import BannerCom from '../components/home/Banner-Com.vue'
import Forgotpassword from '../components/Forgotpassword.vue'
import HangmoiveCom from '../components/Hangmoive-Com.vue'
import FooterCom from '../components/Footer.vue'
import News from '../components/home/news.vue'
import list_laptop from '../data/data-sample/laptop.js'
export default{
  components:{
    header_com:Header,
    Forgotpassword,
    BannerCom,
    HangmoiveCom,
    FooterCom,
    Product,
    News
  },
  setup(){

    return {list_laptop}
  }
}
</script>

<style  scoped>
main{
  margin-top: 50px;
}
span{
   cursor: pointer;
}
.bg-custom{
  position: relative;
  width: 100vw;
  background-image: url('../assets/template/home-collection-bg.png');
}
</style>