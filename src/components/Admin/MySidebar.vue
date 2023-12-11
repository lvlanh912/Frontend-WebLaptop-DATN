<template>
    <aside class="bg-white flex-shrink-0 p-3 shadow" 
    style="width: 250px; height: 100vh;">
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <router-link :to="{name:'adminhome'}" :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='adminhome'}">
          <i class="bi bi-house-fill text-blue me-2"></i>Trang chủ
        </router-link>
      </li>
      <li class="mb-1">
        <router-link :to="{name:'statistics_manager'}"  :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='statistics_manager'}">
         <i class="bi bi-speedometer2 text-red me-2"></i> Thống kê
        </router-link>
      </li>
      <li class="mb-1">
        <router-link :to="{name:'user_manager'}"  :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='user_manager'}">
         <i class="bi bi-person text-pink me-2"></i> Tài khoản
        </router-link>
      </li>
      <li class="mb-1">
        <router-link :to="{name:'orders_manager'}"  :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='orders_manager'}">
         <i class="bi bi-shop-window text-blue me-2"></i> Đơn đặt hàng
        </router-link>
      </li>
      <li class="mb-1">
        <router-link :to="{name:'vouchers_manager'}"  :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='vouchers_manager'}">
         <i class="bi bi-gift-fill text-pink me-2"></i> Voucher
        </router-link>
      </li>
      <li class="mb-1">
        <router-link :to="{name:'products_manager'}"  :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='products_manager'}">
         <i class="bi bi-laptop-fill text-blue me-2"></i> Sản phẩm
        </router-link>
      </li>
      <li class="mb-1">
        <router-link :to="{name:'categories_manager'}"  :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='categories_manager'}">
         <i class="bi bi-list-ul text-blue me-2"></i>Danh mục
         </router-link>
      </li>
      <li class="mb-1">
        <router-link :to="{name:'payments_manager'}"  :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='payments_manager'}">
         <i class="bi bi-currency-bitcoin text-yellow me-2"></i>Thanh toán
        </router-link>
      </li>
      <!-- <li class="mb-1">
        <router-link :to="{name:'chats_manager'}"  :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='chats_manager'}">
         <i class="bi bi-messenger text-blue me-2"></i>Chăm sóc khách hàng 
         </router-link>
      </li> -->
      <li class="mb-1">
        <router-link :to="{name:'news_manager'}"  :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='news_manager'}">
         <i class="bi bi-newspaper text-blue me-2"></i>Tin đăng
         </router-link>
      </li>
      <li class="mb-1">
        <router-link :to="{name:'comments_manager'}"  :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='comments_manager'}">
         <i class="bi bi-star-fill text-yellow me-2"></i>Đánh giá
         </router-link>
      </li>
      <li class="mb-1" @click="onLogout">
        <a role="button" class="w-100 text-start btn align-items-center rounded">
          <i class="bi bi-box-arrow-left text-red me-2"></i>Đăng xuất
        </a>
      </li>
    </ul>
    </aside>
</template>

<script>
import { ref,computed } from 'vue';
import router from '../../router';
import { useStore } from 'vuex';

export default {
setup(){
  const store=useStore()
  const onLogout=()=>{
    store.dispatch("Logout")
    router.push('/admin/dang-nhap')
  }
const page_name =computed(()=>router.currentRoute.value.name)
  return {page_name,onLogout}
}
}
</script>

<style scoped>
.active{
  background-color: blue;
  color:white;
}

</style>