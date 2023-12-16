<template>
    <transition name="slide-fade">
  <div v-if="isShow" style="min-width: 20rem;max-width: 50rem;" class=" card py-3 px-lg-5 px-sm-2 flex-column align-content-center">
    <div v-if="sending" class="d-flex justify-content-center shadow h-100 p-5">
        <div class="spinner-border" role="status">
            <span class="sr-only"></span> 
        </div>
        <span class="ms-2 align-self-center"> Đang gửi yêu cầu</span>
    </div>
    <div v-else class="">
        <h2 class=" p-2"> Bạn quên mật khẩu?</h2>
        <p class="text-body">Chỉ với 3 bước đơn giản chúng tôi sẽ cung cấp lại mật khẩu cho bạn!</p>
        <p class="m-0 p-0">1. Nhập địa chỉ Email của bạn</p>
        <p class="m-0 p-0">2. Chúng tôi sẽ gửi một đường dẫn đến hộp thư của bạn</p>
        <p class="m-0 p-0">3. Sử dụng nó để đặt lại mật khẩu của bạn</p>
        
<hr>
        <label for="" class="form-label">Email</label>
        <input type="email" v-model="email" placeholder="Nhập email của bạn" class="form-control">
        <div class="d-flex mt-4 justify-content-between">
            <button @click="onSubmit" class="btn btn-success text-white">Xác  nhận </button>
            <router-link   class="btn btn-danger text-white" :to="{name:'login'}">Quay lại đăng nhập</router-link>
        </div>
    </div>
        </div>
        
    </transition>
</template>
<script>
import { onMounted,ref } from 'vue'
import {RequestResetPassword} from '../../modules/home/HomeAPI.js'
export default{
setup(){
    const sending=ref(false)
    const isShow=ref(false)
    const email=ref('')
    const onSubmit= async()=>{
         if(!email.value.trim().match('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')){
            return Swal.fire("email không hợp lệ")
         }
         else
            try{
                sending.value=true
                await RequestResetPassword(email.value)
                sending.value=false
                return Swal.fire("Thành công","Liên kết đặt lại mật khẩu đã được gửi vào email của bạn","success")
            }
            catch(err){
                sending.value=false
                if(err.response)
                return Swal.fire("Thông báo",err.response.data.message,"warning")
                return Swal.fire("Thông báo","Something error","warning")
            }
    }
    onMounted(()=>{
        isShow.value=false
        isShow.value=true
    })
    return{isShow,onSubmit,email,sending}
}
}
</script>
<style>

</style>