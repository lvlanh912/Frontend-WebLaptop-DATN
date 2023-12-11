<template >
    <my-header @show_menu="ishow=!ishow"/>
    <div class="d-flex mt-5 pt-2" style="min-height: 100vh;" >
        <transition  mode="out-in">
        <my-sidebar v-if="ishow"/>
    </transition>
    <div class="bg-light p-4 w-100">
     <router-view/>
    </div>
   </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import MyHeader from '../../components/Admin/MyHeader.vue'
import MySidebar from '../../components/Admin/MySidebar.vue'
import MyTable from '../../components/Admin/Mytable.vue';
export default {
components:{MyHeader,MySidebar,MyTable},
 setup(){
    const ishow=ref(true)
    return {ishow}
}
}
</script>

<style scoped>

.v-enter-active,
.v-leave-active {
  transition: all 0.6s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
</style>