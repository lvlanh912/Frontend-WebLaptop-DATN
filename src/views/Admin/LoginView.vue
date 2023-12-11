<template>
    <div class="full position-absolute m-0 row justify-content-center">
     <form @submit.prevent="Login" action="" class="login-form col-8 col-md-6 align-self-center mt-5 rounded-3">
          <label class="text-center fw-bold text-black fs-4 d-block text-uppercase py-2">Đăng nhập quản trị viên</label>
          <div class="mb-3 mt-5 ms-3 ">
              <label  class="form-label ms-3">Tên đăng nhập</label>
              <div class="position-relative col-10 ms-3 row">
                  <input v-model="user.username" type="text" class=" border border-1 rounded-2 fs-5 px-3">
                  <span v-if="!validate.username"  class="mt-1 position-absolute bottom-0 end-0 mb-1 w-auto" title="Tên đăng nhập không hợp lệ"><i class="text-danger bi bi-exclamation-circle-fill"></i></span>
              </div>
          </div>
          <div class="mb-3 ms-3 ">
              <label  class="form-label  ms-3">Mật khẩu</label>
              <div class="position-relative col-10 ms-3 row">
                  <input v-model="user.password" :type="ishow_pass?'password':'text'" class=" border border-1 rounded-2 fs-5 px-3">
                  <span v-if="!validate.password"  class="mt-1 position-absolute bottom-0 end-0 mb-1 w-auto" title="Mật khẩu phải có ít nhất 1 chữ in hoa,tối thiểu 1 ký tự đặc biệt, tối thiểu 1 số và trên 6 ký tự"><i class="text-danger bi bi-exclamation-circle-fill"></i></span>
              </div>
          </div>
          <div class="text-end">
              <input @change="ishow_pass=!ishow_pass" class="form-check-input mt-1"  type="checkbox">
              <label class="ms-2 form-check-label"> Hiện mật khẩu</label>
          </div>
          <div class="text-center py-4">
              <button  class="btn btn-danger text-white">Đăng nhập</button>
          </div>
     </form>
    </div>
  </template>
  
  <script>
  import { onBeforeMount, reactive,ref } from 'vue'
  import {checklogin} from '../../modules/admin/authentication.js'
  import {SignIn} from '../../modules/CallAPI.js'
import router from '../../router';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';
  export default {
  setup(){
    onBeforeMount(()=>{
       checklogin()
    })
    const store=useStore()
     const Login=async()=>{
          /^[a-zA-Z0-9]+$/.exec(user.username)?validate.username=true:validate.username=false;
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.exec(user.password)?validate.password=true:validate.password=false;
          try{
            const token=  await SignIn(user)
            store.dispatch("SetLoginAdmin",token)
            router.push({name:'adminhome'})
        }
        catch(err){
            Swal.fire("Lỗi",err.message,"error")
        }
        
     }
     const user=reactive({
      username:'',
      password:''
     })
     const ishow_pass=ref(true)
  
     const validate=reactive({
      username:true,
      password:true
     })
     
      return {Login,user,validate,ishow_pass}
  }
  }
  </script>
  
  <style scoped>
  .full{
      width: 100vw;
      height: 100vh;
      background-image: url("/src/assets/background.jpg");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
  }
  .login-form{
      min-width: 350px;
      max-width: 500px;
      min-height: 400px;
      background-color: hsla(0,0%,100%,.4);
  }
  </style>