<template>
    <transition name="slide-fade">
  <div v-if="isShow" style="min-width: 20rem;max-width: 50rem;" class=" card py-3 px-lg-5 px-sm-2 flex-column align-content-center">
            <h2 class=" p-2"> Bạn quên mật khẩu?</h2>
            <p class="text-body">Chỉ với 3 bước đơn giản chúng tôi sẽ cung cấp lại mật khẩu cho bạn!</p>
            <p class="m-0 p-0">1. Nhập địa chỉ Email của bạn</p>
            <p class="m-0 p-0">2. Chúng tôi sẽ gửi một đường dẫn đến hộp thư của bạn</p>
            <p class="m-0 p-0">3. Sử dụng nó để đặt lại mật khẩu của bạn</p>
            
    <hr>
            <label for="" class="form-label">Email</label>
            <input type="text" placeholder="Nhập email của bạn" class="form-control">
            <div class="d-flex mt-4 justify-content-between">
                <button class="btn btn-success text-white">Xác  nhận </button>
                <router-link   class="btn btn-danger text-white" :to="{name:'login'}">Quay lại đăng nhập</router-link>
            </div>
        </div>
    </transition>
</template>

<script>
import { onMounted,ref } from 'vue'
export default{
setup(){
    const isShow=ref(false)
    onMounted(()=>{
        isShow.value=false
        isShow.value=true
    })
    return{isShow}
}
}
</script>
<style>

</style>