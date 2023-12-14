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
        <router-link :to="{name:'myorder'}"  :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='myorder'}">
         <i class="bi bi-shop-window text-blue me-2"></i> Đơn đặt hàng
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
        <router-link :to="{name:'password'}"  :class="{'w-100 text-start btn align-items-center rounded':true,'active':page_name=='password'}">
         <i class="bi bi-lock-fill text-blue me-2"></i> Đổi mật khẩu
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