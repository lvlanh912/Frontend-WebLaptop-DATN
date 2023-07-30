<template>
  <header-com/>
  <banner-com/>
  <h1 class="mt-5">đây là trang chủ</h1>
  <footer-com/>
</template>

<script>
import HeaderCom from '../components/Header-Com.vue'
import BannerCom from '../components/Banner-Com.vue'
import DanhmucComVue from '../components/Danhmuc-Com.vue'
import Forgotpassword from '../components/Forgotpassword.vue'
import HangmoiveCom from '../components/Hangmoive-Com.vue'
import FooterCom from '../components/Footer-Com.vue'
export default{
  components:{
    HeaderCom,
    DanhmucComVue,
    Forgotpassword,
    BannerCom,
    HangmoiveCom,
    FooterCom
  }
}
</script>

<style  scoped>
main{
  margin-top: 50px;
}


</style>