<template>
  <div class="navbar-vertical-content me-2 pe-4 -3 card border-0" style="height: 100vh;max-width: 240px;">
    <strong class="d-block text-center mb-3 text-muted">Danh mục sản phẩm</strong>
    <ul class="navbar-nav flex-column">
        <li v-for="item,index in list_childs_categories" :key="index" class="nav-item ps-2">
            <div class="nav-item-wrapper">
              <router-link
                :to="{name: 'home'}"
                class="nav-link label-1"
                role="button"
              >
                <div class="d-flex align-items-center">
                  <span class="">
                    <strong class="fs-6 text-dark">{{ item.name }}</strong>
                  </span>
                </div>
              </router-link>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import { ref,onBeforeMount, computed, onUpdated, onBeforeUpdate } from 'vue'
import {  onBeforeRouteUpdate, useRoute } from 'vue-router'
import {getChildsCategory} from '../../../modules/home/HomeAPI.js'
export default {
    setup(){
        const  router=useRoute()
         const list_childs_categories=ref([])
         const parentCategoryID=ref(router.params.categoryID)
         onBeforeMount(async()=>{
            list_childs_categories.value= await getChildsCategory(router.params.categoryID)
         })
        onBeforeRouteUpdate( async(to,from,next)=>{
             list_childs_categories.value= await getChildsCategory(to.params.categoryID)
             next()
        })
        
         return {parentCategoryID,list_childs_categories}
    }
}
</script>

<style>
.nav-item:hover{
    border-radius: 15px;
    background-color: rgba(48, 48, 209, 0.381);
    color: rgb(251, 0, 0)!important;
    transition: all .5s ease-in-out;
}
</style>
