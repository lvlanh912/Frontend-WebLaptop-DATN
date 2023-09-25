<template>
    <aside class="bg-white flex-shrink-0 p-3 shadow" 
    style="width: 250px; height: 100vh;">
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <router-link :to="{name:'admin'}" :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='admin'}">
          <i class="bi bi-house-fill text-blue me-2"></i>Trang chủ
        </router-link>
      </li>
      <li class="mb-1">
        <router-link :to="{name:'admin'}" class="w-100 text-start btn align-items-center rounded ">
         <i class="bi bi-speedometer2 text-red me-2"></i> Bảng điều khiển
        </router-link>
      </li>
      <li class="mb-1">
        <p class="w-100 text-start btn align-items-center rounded" >
         <i class="bi bi-shop-window text-blue me-2"></i> Đơn đặt hàng
        </p>
      </li>
      <li class="mb-1">
        <router-link :to="{name:'user_manager'}"  :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='user_manager'}">
         <i class="bi bi-person-fill text-blue me-2"></i> Account
        </router-link>
      </li>
      <li class="mb-1">
        <router-link :to="{name:'vouchers_manager'}"  :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='vouchers_manager'}">
       
         <i class="bi bi-gift-fill text-pink me-2"></i> Voucher
        </router-link>
        <div class="collapse" id="voucher-collapse" >
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Tạo mới</a></li>
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Danh sách Vourcher</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <p class="w-100 text-start btn btn-toggle align-items-center rounded " >
         <i class="bi bi-laptop-fill text-blue me-2"></i> Sản phẩm
        </p>
        <div class="collapse" id="product-collapse" >
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Tạo mới</a></li>
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Danh sách sản phẩm</a></li>
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Sản phẩm đã hết hàng</a></li>
          </ul>
        </div>
      </li>
     
      <li class="mb-1">
        <p class="w-100 text-start btn btn-toggle align-items-center rounded " data-bs-toggle="collapse" data-bs-target="#category-collapse" aria-expanded="false">
         <i class="bi bi-list-ul text-blue me-2"></i>Danh mục </p>
        <div class="collapse" id="category-collapse" >
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Tạo danh mục hàng mới</a></li>
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Các danh mục hàng</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <p class="w-100 text-start btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" >
         <i class="bi bi-currency-bitcoin text-blue me-2"></i>Thanh toán </p>
      </li>
      <li class="mb-1">
        <p class="w-100 text-start btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" >
         <i class="bi bi-messenger text-blue me-2"></i>Chăm sóc khách hàng </p>
      </li>
    </ul>
    </aside>
</template>

<script>
import { ref,computed } from 'vue';
import router from '../../router';

export default {
setup(){
const page_name =computed(()=>router.currentRoute.value.name)
  return {page_name}
}
}
</script>

<style scoped>
.active{
  background-color: blue;
  color:white;
}

</style>