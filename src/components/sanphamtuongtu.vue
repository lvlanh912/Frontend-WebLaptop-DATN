<template>
 <div class="bg-white bg-white mt-3 border-2 rounded-2 px-3 py-2 w-100">
    <strong class="fs-3 ps-3">Sản phẩm tương tự</strong>
    <carousel :items-to-show="4" :wrap-around="false">
        <slide v-for="laptop in list_laptop" :key="laptop" >
            <div class="carousel__item py-3 ms-2">
                <product :item="laptop" :showfull="true" />
            </div>
        </slide>
  </carousel>
 </div>
</template>

<script>
import { ref,watch } from 'vue';
import Product from './home/Product.vue'
import list_laptop from '../data/data-sample/laptop.js';

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
export default {
    components:{
        Product,
        Carousel,
        Slide
    },
    setup(){
        return {list_laptop}
    }

}
</script>

<style >
.list-item-slide{
overflow:scroll;
}
</style>

