<template>
<main class="container-fluid px-0 d-block bg-light" style="height: 100vh;">

  <danhmuc-com-vue/>
  <banner-com/>
</main>
</template>

<script>
import BannerCom from '../components/banner-Com.vue'
import DanhmucComVue from '../components/Danhmuc-Com.vue'
import Forgotpassword from '../components/Forgotpassword.vue'
export default{
  components:{
    DanhmucComVue,
    Forgotpassword,
    BannerCom
  }
}
</script>
,
    BannerCom
<style  scoped>
main{
  margin-top: 50px;
}


</style>