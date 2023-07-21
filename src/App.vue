<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink :to="{ name:'authenticaton' }">Login</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>
<style scoped>
header{
  position: relative;
  height: 70px;
  width: 100%;
}
</style>
