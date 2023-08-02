<template>
   <Teleport to="body">
    <header-com/>
    <hr class="mt-5">
    <filter-com />
    <section class="container-fluid bg-light bg-white">
     <p class="position-relative header fw-bold fs-3 pt-3">Laptop mới cập nhật<a href="" class=" fs-4 fw-bold text-decoration-none position-absolute end-0">Xem tất cả <i class=""></i></a></p>
     <div class=" row g-2">
       
     </div>
     <div class="list-more"></div>
    </section>
   
    <section class="container-fluid bg-light bg-white mt-4">
     <p class="position-relative header fw-bold fs-3 pt-3">Tin tức<a href="" class=" fs-4 fw-bold text-decoration-none position-absolute end-0">Xem tất cả <i class=""></i></a></p>
     <div class="row g-2">
      
     </div>
     <div class="list-more"></div>
    </section>
    <footer-com/>
  </Teleport>
</template>

<script>
import HeaderCom from '../components/Header-Com.vue'
import BannerCom from '../components/home/Banner-Com.vue'
import FooterCom from '../components/Footer-Com.vue'
import {useRoute} from 'vue-router'
import FilterCom from '../components/filterCom.vue'
export default {
components:{
    HeaderCom,
    FooterCom,
    FilterCom
},
setup(){
    const route=useRoute()
    setTimeout(() => {
        console.log('hello')
        console.log(route.name)
    }, 2000);
}
}
</script>

<style>

</style>