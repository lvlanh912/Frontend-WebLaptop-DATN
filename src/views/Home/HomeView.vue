<template>
  <Teleport to="body">
    <header_com />
    <section id="section" class="container-lg container-fluid mt-5 pt-1">
      <router-view v-slot="{Component}">
        <transition  :duration="200">
          <component :is="Component" />
        </transition>
      </router-view>
    </section>
    <router-link v-if="islogin&&Routername!='chat'" :to="{name:'chat'}" class=" text-decoration-none position-fixed end-0 bottom-0 mb-4 me-2 bg-white align-self-center d-flex px-2 py-1 rounded-2 shadow" style="z-index: 2;">
      <i class="bi bi-chat-right-fill fs-5 text-orange me-2"></i>
      <span class="fw-bold text-dark">Liên hệ hỗ trợ</span>
    </router-link>
    <footer-com />
  </Teleport>
</template>

<script>
import Header from "../../components/Header.vue"
import FooterCom from "../../components/Footer.vue"
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  components: {
    header_com: Header,
    FooterCom,
  },
  setup() {
    const store=useStore()
    const route=useRoute()
    const Routername=computed(()=>route.name)
   const islogin=computed(()=>{
     return store.state.user.jwtToken !=null &&  !store.state.user.isAdmin
   })
    return {islogin,Routername}
  },
}

</script>

<style scoped>
main {
  margin-top: 50px;
}
span {
  cursor: pointer;
}
.bg-custom {
  position: relative;
  width: 100vw;
  background-image: url("../assets/template/home-collection-bg.png");
}
</style>
