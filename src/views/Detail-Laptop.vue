<template>
    <header_com/>
    <hr class="mb-5">
  <div class="card">
    <!-- product name -->
    <span class="px-2 w-100 fw-bolder fs-3 ">
        {{laptop.name}}
    </span>
    <hr>
     <!-- product infor content -->
     <div class="row">
      <!-- image -->
      <div class="col-12  col-md-6">
        <!-- image big -->
        <a href="" class=" position-relative d-block text-center" >
          <img :src="active_image" alt="" class="img-fluid mx-auto img-big" >
        </a>
        <!-- image list -->
        <div class="w-100 mt-3 list-image" >
          <img v-for="(image) in laptop.image" :key="image"
          @click="active_image=image" 
           :src="image" alt="" :class="{'img-fluid px-1':true,'active':active_image==image}" style="max-width: 390px;max-height: 100px;">
        </div>
      </div>
      <!-- thông số sản phẩm-->
    <div class="col-12  col-md-6">
        <!-- review -->
      <div class="d-flex head-infor">
        <p>
          <label for="">Đánh giá: </label><span class=" ms-2 "><i class="bi bi-star-fill text-yellow me-1"></i>5.0</span>
        </p>
        <p>
          <label for="">Bình luận:<span class="ms-2">2.001</span> </label>
        </p>
        <p>
          <label for="">Lượt xem:<span class="ms-2">2.003</span></label>
        </p>
      </div>
      <!-- Thông số sản phẩm -->
      <div class="d-flex flex-column">
        <label for="" class="fs-3 fw-bold">Thông số sản phẩm</label>
        <ul class="ps-3">
          <li class="mt-1 ms-2 text-uppercase">CPU:  {{laptop.CPU}}</li>
          <li class="mt-1 ms-2 text-uppercase">RAM: {{laptop.RAM}}</li>
          <li class="mt-1 ms-2 text-uppercase">ROM: {{laptop.ROM}}</li>
          <li class="mt-1 ms-2 text-uppercase">Card đồ hoạ: {{laptop.GPU}}</li>
          <li class="mt-1 ms-2 text-uppercase">Màn hình: {{laptop.Screen}}</li>
        </ul>
      </div>
      <!-- Giá sản phẩm -->
      <div class="price ">
        <p class="text-blue fw-bold fs-3 d-inline"> {{toVND(laptop.new_price)}}</p>
        <p class="fw-bolder ms-2 d-inline text-decoration-line-through text-secondary fs-6">{{toVND(laptop.old_price)}}</p>
        <span class=" product-discout badge  ms-1">{{discount}}%</span>
        <p class="baohanh text-white p-2 fs-5">Bảo hành 6 tháng</p>
      </div>
      <!-- ưu đãi -->
      <div class="promote bg-white border border-pink rounded-3">
      <p class="bg-pink text-red m-0 fw-bolder px-2 "><i class="bi bi-gift"></i> Quà tặng và ưu đãi kèm theo</p>
      <ul class="list-unstyled ms-3">
        <li class="py-1 fw-bolder text-danger" ><i class="bi bi-star-fill text-yellow"></i> Tặng ngay bộ phím chuột và bàn di chuột + 5 mét dây mạng khi mua cấu hình PC trên</li>
        <li class="py-1 fw-bolder text-danger" ><i class="bi bi-star-fill text-yellow"></i> Tặng ngay bộ phím chuột và bàn di chuột + 5 mét dây mạng khi mua cấu hình PC trên</li>
        <li class="py-1 fw-bolder text-danger" ><i class="bi bi-star-fill text-yellow"></i> Tặng ngay bộ phím chuột và bàn di chuột + 5 mét dây mạng khi mua cấu hình PC trên</li>
      </ul>
      </div>
      <!-- button -->
      <div class="d-flex gap-2 px-3">
        <button class="mt-3 w-100 bg-red text-center text-white btn  align-self-center">MUA NGAY <p class="d-none d-lg-block m-0" >Giao hàng tận nơi nhanh chóng</p></button>
        <button class="mt-3 w-100 bg-blue text-center text-white btn  align-self-center">THÊM VÀO GIỎ HÀNG <p class="d-none d-lg-block m-0">Thêm vào giỏ hàng để chọn tiếp</p></button>
      </div>
</div>
</div>
</div>
<section class="row px-3">
  <div class="col-8 px-2">
    <comment/>
  </div>
  <div class="col-4 px-2">
    <tintucmoi/>
  </div>
</section>
<section class="row">
  <sanphamtuongtu/>
</section>
<footer_vue/>
</template>

<script >
import Comment from '../components/Comments.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useRoute } from 'vue-router'
import {Getbyid} from '../data/data-sample/laptop.js'
import { ref,computed } from 'vue'
import Tintucmoi from '../components/Tintucmoi.vue'
import Sanphamtuongtu from '../components/sanphamtuongtu.vue'
export default{
  components:{
    Comment,
    Tintucmoi,
    Sanphamtuongtu,
    header_com:Header,
    footer_vue:Footer
  },
    setup(){
      const route= useRoute()
      const laptop=Getbyid(1)
     const active_image= ref(laptop.image[0])
     function toVND(n){
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)
    }
    const discount= computed(()=>{return 100-((laptop.new_price/laptop.old_price)*100).toFixed(2)})
      return {route,laptop,active_image,toVND,discount}
    }
}
</script>

<style scoped>
.list-image{
  transition: transform 0.7s linear;
  text-align: center;
}
.img-big{
  width: 390px;
}
.active{
  transform: translateY(-7px);
}
.head-infor label{
  font-weight: 600;
}
.head-infor p{
    margin: 0 8px 0 0;
    padding: 0 8px 0 0;
    position: relative;
}
.head-infor p:not(:last-child)::after{
  content: '';
    width: 1px;
    height: 16px;
    background: #A3A3A3;
    position: absolute;
    right: 0;
    bottom: 0;
    margin-bottom: 3px;
}
.head-infor span{
  color: var(--product-price);
  font-weight: 500;
  font-size: medium;
}
.product-discout{
  animation:blink 0.8s ease-in-out infinite alternate ;
}
@keyframes blink {
  from{
    color:#A3A3A3;
    background-color:white ;
  }
  to{
    background-color: red;
    color: white;
  }
  
}
.price{
  border: 1px dashed #FF8125;
    border-radius: 10px;
    margin: 12px 0;
    padding: 10px;
}
.baohanh{
  margin: 8px 0 0;
    font-size: 14px;
    background: #ff2525;
    border-radius: 4px;
    line-height: 18px;
    display: block;
    width: fit-content;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from{
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}
</style>