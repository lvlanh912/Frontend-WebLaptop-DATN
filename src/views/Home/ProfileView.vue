<template>
  <main class="m-2" >
    <div class="position-absolute bottom-50 d-block d-md-none icon-show" style="z-index: 2;">
        <p v-if="ishowSidebar==false" @click="ishowSidebar=!ishowSidebar" 
         class="bi bi-caret-right-fill text-blue m-0 fs-4 bg-light"></p>
    </div>
    <div class="row justify-content-between" style="min-height: 100vh;">
        <Transition :duration="300"  mode="out-in">
            <sidebar class="col d-none d-md-block" />
        </Transition>
        <!-- màn hình điện thoại -->
        <Transition name="slide-fade">
            <sidebar class="position-absolute d-md-none shadow" style="z-index: 2;"  v-if="ishowSidebar" @closeSidebar="ishowSidebar=false"/>
        </Transition>
        <div class="bg-light col col-md-9">
        <router-view v-slot="{Component}">
            <transition  :duration="200"  mode="out-in">
                <component :is="Component" />
            </transition>
      </router-view>
        </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue'
import Sidebar from '../../components/home/Profile/Sidebar.vue'

export default {
components:{
    Sidebar,
},
setup(){
    const ishowSidebar=ref(false)
    return {ishowSidebar}
}

}
</script>

<style scoped>
.icon-show{
    animation: slide 0.8s ease-in-out infinite alternate;
}
@keyframes slide {
  from {left:0px; }
  to {left:5px;}
}
</style>