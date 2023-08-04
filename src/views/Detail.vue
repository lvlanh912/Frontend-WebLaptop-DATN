<template>
  <h1>{{ route.params }}</h1>
</template>

<script >
import { useRoute } from 'vue-router'

export default{
    setup(){
        const route= useRoute()
        return {route}
    }
}
</script>

<style>

</style>