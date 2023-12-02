<template>
  <transition name="slide-fade">
    <div
      v-if="isShow"
      style="min-width: 20rem; max-width: 50rem"
      class="p-3 bg-white rounded-3 col-6 px-md-2 px-lg-5 px-sm-1 d-flex flex-column align-content-center"
    >
      <div class="d-flex flex-column p-sm-2 p-md-4 p-lg-5">
        <h3 class="text-center mb-2 pt-2" style="color: rgb(7, 93, 93)">
          Đăng nhập
        </h3>
        <span class="mb-3 fw-bold" style="color: rgb(13, 57, 43)">
          Chào mừng bạn quay trở lại
        </span>
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-person-fill m-auto"></i>
          </span>
          <input
            v-model="username"
            :class="{
              'form-control': true,
              'is-invalid': error.username,
              'is-valid': error.username == null,
            }"
            placeholder="Nhập tên đăng nhập"
            type="text"
          />
          <div class="invalid-feedback">{{ error.username }}</div>
        </div>
        <div class="input-group mt-2">
          <span class="input-group-text">
            <i class="bi bi-key-fill m-auto"></i>
          </span>
          <input
            v-model="password"
            type="password"
            :class="{
              'form-control': true,
              'is-invalid': error.password,
              'is-valid': error.password == null,
            }"
            placeholder="Nhập mật khẩu"
          />
          <div class="invalid-feedback">{{ error.password }}</div>
        </div>
        <div class="d-flex justify-content-end pt-3 form-check">
          <input class="form-check-input" type="checkbox" />
          <label class="form-check-label ms-2">Nhớ mật khẩu</label>
        </div>
        <div
          class="d-flex justify-content-center align-content-center mt-4 pt-2 mb-2"
        >
          <button @click="onLogin" class="btn text-white btn-success px-4">
            Đăng nhập
          </button>
        </div>
      </div>
      <hr />
      <p class="text-center bottom-0">
        <router-link
          class="link-info text-decoration-none mt-2 mb-3"
          :to="{name: 'forgetPassword'}"
        >
          Quên mật khẩu?
        </router-link>
        <br />
        <label for="">Chưa có tài khoản?</label>
        <router-link
          class="link-info text-decoration-none"
          :to="{name: 'signup'}"
        >
          Đăng ký
        </router-link>
      </p>
    </div>
  </transition>
</template>

<script>
import { reactive,ref,onMounted } from 'vue'
import {SignIn} from '../../modules/home/HomeAPI.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const isShow=ref(false)
   const error=reactive({
        username:'',
        password:''
        })
    const username=ref('')
    const password=ref('')
    const store=useStore()
    const router=useRouter()
    onMounted(()=>{
        isShow.value=false
        isShow.value=true
    })
    const validateForm=()=>{
      if(username.value.length==0){
        error.username='Tên đăng nhập không được để trống'
        return false
      }
     else if(username.value.includes(' ')){
       error.username='Tên đăng nhập không được có khoảng cách'
       return false
     }
      else if(!username.value.match('^[a-zA-Z0-9]+$')){
        error.username='Tên đăng nhập chứa ký tự không hợp lệ'
        return false
      }
      else
        error.username=null
      if(password.length==0){
        error.password='Mật khẩu không thể để trống'
        return false
      }
      else
        error.password=null
      return true
    }
    const onLogin=async ()=> {
      if(validateForm())
        try{
           let data= await SignIn({username:username.value,password:password.value})
            Swal.fire({
            icon: "success",
            title: "Thành công",
            text: "Đăng nhập thành công",
          }).then(()=>{
          store.dispatch('SetLoginUser',data)
          isShow.value=false
          router.push('/')

        })
        
        }
        catch(err){
            Swal.fire({
            icon: "error",
            title: "Đăng nhập thất bại",
            text: err.response.data.message??err.message,
        });
      }
    }
    return {error,username,password,onLogin,isShow}
  }

}
</script>

<style></style>
../../modules/home/ClientAction.js../../modules/home/HomeAPI.js