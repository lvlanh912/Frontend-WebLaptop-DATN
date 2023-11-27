<template>
  <Carousel>
    <Slide v-for="image,index in images_banner" :key="index">
      <div class="carousel__item">
        <img :src="image" alt="">
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'Basic',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  setup(){
    const images_banner=ref([
      'https://cf.shopee.vn/file/vn-50009109-af1827253632c27d09043549fc3d6eb3_xxhdpi',
      'https://cf.shopee.vn/file/vn-50009109-af1827253632c27d09043549fc3d6eb3_xxhdpi',
      'https://cf.shopee.vn/file/vn-50009109-af1827253632c27d09043549fc3d6eb3_xxhdpi',
      'https://cf.shopee.vn/file/vn-50009109-af1827253632c27d09043549fc3d6eb3_xxhdpi'
    ])
    return{images_banner}
  }
})
</script>

<style>
.carousel__item {
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
