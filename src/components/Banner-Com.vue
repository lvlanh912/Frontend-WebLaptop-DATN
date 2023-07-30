<template>
<div class="banner position-relative">
    <div v-for="(image,index) in img" :key="index" class="position-absolute img-fluid h-100 w-100">
      <div  :class="{'slide-on':show==index,
      'slide-off':show<index
      ,'slide-item img-item':true}" :style="{'background-image': `url(${image})`}"></div>
    </div>
    <!-- image-item-crike -->
   <div class="page position-absolute bottom-0 pb-3 d-flex justify-content-center w-100 gap-2">
      <span v-for="(n,index) in img.length" :key="index" :class="{'rounded-circle text-white-50 p-0 align-self-center':true,'fs-5 mb-2 text-white':show==index}"><i class="bi bi-circle-fill"></i></span>
   </div>
   <div @click="show==0?show=img.length-1:show--" class="position-absolute top-0 bottom-0 start-0 d-flex flex-column justify-content-center px-3">
      <button class="control-left bg-transparent border-0"><i class="bi bi-caret-left-fill fs-3"></i></button>
   </div>
   <div @click="show==img.length-1?show=0:show++" class="position-absolute top-0 bottom-0 end-0 d-flex flex-column justify-content-center px-3">
    <button class="control-right bg-transparent border-0"><i class="bi bi-caret-right-fill fs-3"></i></button>
 </div>
</div>
</template>

<script>
  import {ref} from 'vue'
export default {

  setup(){
    const show=ref(0)
    const img=ref([
      'https://i.pinimg.com/564x/1d/04/77/1d0477a44a7093f7016cb0fdaebf538d.jpg',
      'https://i.etsystatic.com/24507784/r/il/68307c/3509385322/il_1140xN.3509385322_fpha.jpg',
      'https://spreethemesprevious.github.io/bisum/html/assets/img/slideshow/f2.jpg'
  ])
  
  setInterval(()=>{
    if(show.value==img.value.length-1)
      show.value=0
    else
    show.value++
  },7000)
  return {img,show}
  }
}
</script>

<style scoped>
.banner{
  margin-top: 56px;
  width: 100%;
  height: 600px;
  background-color: transparent;
  overflow: hidden;
}
.img-item{
  background-repeat: no-repeat;
  background-size:cover;
  opacity: 0;
  background-position:center center;
  width: 100%;
  height: 100%;
  transition: all 1s linear;
}
.slide-on{
  opacity: 1;
}
.slide-off{
  opacity: 0;
}
.control-left{
  animation: slidecontrol-left 1s infinite alternate linear;
}
.control-right{
  animation: slidecontrol-right 1s infinite alternate ease-in-out;
}
@keyframes slidecontrol-left {
  from{
    margin-left: -20px;
    opacity: 0.5;
  }
}
@keyframes slidecontrol-right {
  from{
    margin-right: -20px;
    opacity: 0.5;
  }
}
</style>