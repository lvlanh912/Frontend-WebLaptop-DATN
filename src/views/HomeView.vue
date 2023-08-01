<template>
  <Teleport to="body">
    <header-com/>
    <banner-com/>
    <section class="container-fluid bg-light bg-white">
     <p class="position-relative header fw-bold fs-3 pt-3">Laptop mới cập nhật<a href="" class=" fs-4 fw-bold text-decoration-none position-absolute end-0">Xem tất cả <i class=""></i></a></p>
     <div class="list-product row g-2">
       <product v-for="n in 8"/>
     </div>
     <div class="list-more"></div>
    </section>
    <section class="container-fluid bg-light bg-white mt-4">
     <p class="position-relative header fw-bold fs-3 pt-3">Phụ kiện<a href="" class=" fs-4 fw-bold text-decoration-none position-absolute end-0">Xem tất cả <i class=""></i></a></p>
     <div class="list-product row g-2">
       <product v-for="n in 8"/>
     </div>
     <div class="list-more"></div>
    </section>
    <footer-com/>
  </Teleport>
</template>

<script>
import Product from '../components/Product.vue'
import HeaderCom from '../components/Header-Com.vue'
import BannerCom from '../components/Banner-Com.vue'
import Forgotpassword from '../components/Forgotpassword.vue'
import HangmoiveCom from '../components/Hangmoive-Com.vue'
import FooterCom from '../components/Footer-Com.vue'
export default{
  components:{
    HeaderCom,
    Forgotpassword,
    BannerCom,
    HangmoiveCom,
    FooterCom,
    Product
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

</style>