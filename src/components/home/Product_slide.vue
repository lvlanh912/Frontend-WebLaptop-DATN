<template>
  <Carousel :items-to-show="5" :breakpoints="breakpoints" :wrap-around="true" :autoplay="5000">
    <Slide v-for="product,index in products" :key="index">
      <div class="carousel__item-edit">
          <product :item="product" :showfull="true"/>
      </div>
    </Slide>
   
  </Carousel>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import Product from '../../components/home/Product.vue'
import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'Breakpoints',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    Product
  },
  props:{
    products:{}
  },
  setup(){
   const settings=reactive( {
      itemsToShow: 1,
      snapAlign: 'center',
    })
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
   const breakpoints=reactive({  
    1:{
      itemsToShow: 1,
        snapAlign: 'center',
    },
    576:{
      itemsToShow: 2,
        snapAlign: 'center',
      },  // 700px and up
    768: {itemsToShow: 3,
        snapAlign: 'center',
      },
      // 1024 and up
      992: {itemsToShow: 4,
        snapAlign: 'start',
      }})
    return{breakpoints}
  }
})
</script>

<style scoped>
.carousel__item-edit {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: none;
}
</style>
