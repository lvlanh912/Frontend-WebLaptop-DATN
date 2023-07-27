<script setup>
import HeaderCom from './components/Header-Com.vue'
import FooterCom from './components/Footer-Com.vue'
</script>

<template>
    <header-com/>
  <RouterView />
    <footer-com/>
</template>
<style scoped>
header{
  position: relative;
  height: 70px;
  width: 100%;
}
</style>
