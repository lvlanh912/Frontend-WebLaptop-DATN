<template>
    <transition name="slide-fade">
   <ul v-if="ishow" class="breadcrumb justify-content-start">
            <li class="breadcrumb-item ">
                <RouterLink class="text-decoration-none fw-bold"  :to="{name:'home'}">Trang chủ</RouterLink>
            </li>
            <li  class="breadcrumb-item ">
                <RouterLink class="text-decoration-none fw-bold"  :to="{name:'products'}">Sản phẩm</RouterLink>
            </li>
            <li v-for="item,index in list_category" :key="index" class="breadcrumb-item ">
                <RouterLink class="text-decoration-none fw-bold"  :to="{name:'products',params:{categoryID:item.id}}">{{ item.name }}</RouterLink>
            </li>
            <li v-if="product"  class="breadcrumb-item active">
                {{ product.productName }}
            </li>
        </ul>
    </transition>
</template>

<script>
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import {GetCategorybyId} from '../../../modules/home/HomeAPI.js'
export default {
props:{
    product:{

    }
},
setup(props){
    const route=useRoute()
    const product=props.product
    const CategoryId=ref()
    const list_route=route.matched
    const list_category=ref([])
    const ishow=ref(true)
    const GetCrumbname=(route)=>{
        if(route.name=='products'&&route.params==null)
            return 'Sản phẩm'
        if(route.name=='index')
            return 'Trang chủ'
    }
    onMounted(()=>{
        if(!product){
            CategoryId.value=route.params.categoryID//undefind if no params
            getListparentCategory()
            ishow.value=true
        }
    })
    onBeforeRouteUpdate((to,from,next)=>{
        ishow.value=false
        list_category.value=[]
        CategoryId.value=to.params.categoryID
        getListparentCategory()
        ishow.value=true
        next()

    })
    const getListparentCategory= async()=>{
        if(CategoryId.value==undefined)
            return
        let lastCategory=await GetCategorybyId(CategoryId.value)
        list_category.value.push(lastCategory)
        //nếu có danh mục cha
        while(lastCategory.parentCategoryId!=null){
            //danh mục cha
            lastCategory=await GetCategorybyId(lastCategory.parentCategoryId)
            list_category.value.push(lastCategory)
        }
        list_category.value.reverse()
          
    }
    console.log(list_route.value)
    return {list_route,GetCrumbname,list_category,ishow}
}
}
</script>

<style>

</style>