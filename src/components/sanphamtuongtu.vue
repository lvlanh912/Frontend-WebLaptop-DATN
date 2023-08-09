<template>
 <div class="d-flex list-item-slide position-relative py-3" >
    <product @drag="onswipe"
     v-for="laptop in list_laptop" :item="laptop"/>
    <product  v-for="laptop in list_laptop" :item="laptop"/>
 </div>
</template>

<script>
import { ref,watch } from 'vue';
import Product from './home/Product.vue'
import list_laptop from '../data/data-sample/laptop.js';
import newsVue from './home/news.vue';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
export default {
    components:{
        Product,
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
    setup(){
        const curentscreen=ref(0)
        function onswipe(e){
          curentscreen.value= e
        }
       
        return {list_laptop,onswipe,curentscreen}
    }

}
</script>

<style >
.list-item-slide{
overflow:scroll;
}
</style>