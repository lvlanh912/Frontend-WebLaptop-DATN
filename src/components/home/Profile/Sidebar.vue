<template>
    <aside class="bg-white flex-shrink-0 p-3 w-100" 
    style="max-width: 250px; height: 100vh;">
    <ul class="list-unstyled ps-0">
        <div @click="closeThis" class=" position-absolute end-0 top-0 p-2 d-md-none"><i class="bi bi-x-lg fs-6 text-red"></i></div>
      <li class="mb-1 mt-4">
        <router-link :to="{name:'profile-home'}" :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='profile-home'}">
          <i class="bi bi-person-fill text-blue me-2"></i>Hồ sơ
        </router-link>
      </li>
      <li class="mb-1">
        <router-link :to="{name:'shipping-address'}"  :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='shipping-address'}">
         <i class="bi bi-signpost-2-fill text-red me-2"></i> Địa chỉ giao hàng
        </router-link>
      </li>
      <li class="mb-1">
        <router-link :to="{name:'session'}"  :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='session'}">
         <i class="bi bi-list-check text-yellow me-2"></i> Phiên đăng nhập
        </router-link>
      </li>
      <li class="mb-1">
        <router-link :to="{name:'myorder'}"  :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='myorder'}">
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
      <li class="mb-1">
        <router-link :to="{name:'chats_manager'}"  :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='chats_manager'}">
         <i class="bi bi-messenger text-blue me-2"></i>Chăm sóc khách hàng 
         </router-link>
      </li>
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
    </ul>
    </aside>
</template>

<script>
import { ref,computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
setup(props,{emit}){
    const router=useRouter()
    const closeThis=()=>{
        emit("closeSidebar")
    }
const page_name =computed(()=>router.currentRoute.value.name)
  return {page_name,closeThis}
}
}
</script>

<style scoped>
.active{
  background-color: blue;
  color:white;
}

</style>