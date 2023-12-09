<template>
  <div class="navbar-vertical-content me-2 pe-4 -3 card border-0" style="height: 100vh">
    <strong class="d-block text-center mb-3 text-muted">Danh mục sản phẩm</strong>
    <transition v-show="true" name="slide-fade">
      <ul v-if="isShow" class="navbar-nav flex-column">
          <li v-for="item,index in list_childs_categories" :key="index" :class="{'nav-item ps-2':true, 'choosen':parentCategoryID==item.id}">
              <div class="nav-item-wrapper">
                <router-link
                  :to="{name: 'products',params:{categoryID:item.id}}"
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
      </transition>
    </div>
</template>

<script>
import { ref,onBeforeMount, computed, onUpdated, onBeforeUpdate } from 'vue'
import {  onBeforeRouteUpdate, useRoute } from 'vue-router'
import {getChildsCategory,getCategory_noParent,GetSameLeverCategory} from '../../../modules/home/HomeAPI.js'
export default {
    setup(){
        const  router=useRoute()
        const isShow=ref(false)
         const list_childs_categories=ref([])
         const parentCategoryID=ref(router.params.categoryID)
         onBeforeMount(async()=>{
          await getChildCategory(parentCategoryID.value)
         })
        onBeforeRouteUpdate( async(to,from,next)=>{
          parentCategoryID.value=to.params.categoryID
          await getChildCategory(parentCategoryID.value)
             next()
        })
        const getChildCategory=async (categoryID)=>{
          isShow.value=false
          if(categoryID!=null&&categoryID!=undefined&&categoryID!='')
          {
            const result=await getChildsCategory(categoryID)
            list_childs_categories.value=result.length>0?
            result:list_childs_categories.value.length>0?
            list_childs_categories.value:await GetSameLeverCategory(categoryID)
          }
          else
            list_childs_categories.value=await getCategory_noParent()
            isShow.value=true
        }
        
         return {parentCategoryID,list_childs_categories,isShow}
    }
}
</script>

<style>
.flex-column .nav-item:hover,.choosen{
    border-radius: 15px;
    background-color: rgba(48, 48, 209, 0.381);
    color: rgb(251, 0, 0)!important;
    transition: all .5s ease-in-out;
}
</style>
../../../modules/home/ClientAction.js../../../modules/home/HomeAPI.js