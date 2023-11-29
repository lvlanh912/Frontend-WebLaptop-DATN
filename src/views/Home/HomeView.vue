<template>
  <Teleport to="body">
    <header_com />
    <section class=" container-lg container-fluid mt-5 pt-1">
      <router-view v-slot="{Component}">
        <transition  :duration="200">
          <component :is="Component" />
        </transition>
      </router-view>
    </section>
    <footer-com />
  </Teleport>
</template>

<script>
import Header from "../../components/Header.vue"

import FooterCom from "../../components/Footer.vue"

export default {
  components: {
    header_com: Header,
    FooterCom,
  },
  setup() {
    return {}
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
