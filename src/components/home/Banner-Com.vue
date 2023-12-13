<template>
  <Carousel>
    <Slide v-for="image,index in images_banner" :key="index">
      <div class="carousel__item">
        <img style="width: 100%;" class="img-fluid" :src="image" alt="">
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
     '../../../src/assets/image/Banner/Banner_1.webp',
     '../../../src/assets/image/Banner/Banner_2.webp',
     '../../../src/assets/image/Banner/Banner_3.webp',
     '../../../src/assets/image/Banner/Banner_4.webp',
     '../../../src/assets/image/Banner/Banner_5.webp'
    ])
    return{images_banner}
  }
})
</script>

<style>
.carousel__item {
  min-height: 200px;
  width: 100%;
  aspect-ratio: 900/400;
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
