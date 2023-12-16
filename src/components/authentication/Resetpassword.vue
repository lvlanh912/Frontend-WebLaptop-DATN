<template>
    <transition name="slide-fade">
  <div v-if="isShow" style="min-width: 20rem;max-width: 50rem;" class=" card border-0 flex-column align-content-center p-3 p-lg-5">
            <div v-if="sending" class="d-flex justify-content-center shadow h-100 p-5">
                <div class="spinner-border" role="status">
                    <span class="sr-only"></span> 
                </div>
               <span class="ms-2 align-self-center"> Đang gửi yêu cầu</span>
            </div>
            <div class="" v-else>
                <h2 class=" p-2">Xác nhận đặt lại mật khẩu của bạn</h2>
                <div class="d-flex mt-4 justify-content-between">
                    <button @click="onSubmit" class="btn btn-success text-white">Xác nhận</button>
                    <router-link  class="btn btn-danger text-white" :to="{name:'login'}">Quay lại đăng nhập</router-link>
                </div>

            </div>
        </div>
        
    </transition>
</template>
<script>
import { onMounted,ref } from 'vue'
import {ResetPassword} from '../../modules/home/HomeAPI.js'
import { useRoute, useRouter } from 'vue-router'
export default{
setup(){
    const route=useRoute()
    const router=useRouter()
    const isShow=ref(false)
    const sending=ref(false)
    const onSubmit= async()=>{
            try{
                sending.value=true
                await ResetPassword(route.query.key)
                Swal.fire("Thành công","Mật khẩu đã thay đổi và dược gửi vào email cho bạn","success")
                sending.value=false
                setTimeout(()=>router.push('dang-nhap'),1000)
            }
            catch(err){
                sending.value=false
                if(err.response.data)
                    return Swal.fire("Thông báo",err.response.data.message,"warning")
                return Swal.fire("Something went wrong","","warning")
            }
    }

    onMounted(()=>{
        isShow.value=false
        isShow.value=true
    })
    return{isShow,onSubmit,sending}
}
}
</script>
<style>

</style>