<template>
    <transition name="slide-fade">
   <div v-if="isShow" style="min-width: 20rem;;max-width: 50rem;" class="p-3 bg-white rounded-3 col-7 col-lg-6  px-md-2 px-lg-5 px-sm-1 d-flex flex-column align-content-center">
            <div class="d-flex flex-column p-sm-2 p-md-4 p-lg-5 ">
                <h3 class="text-center mb-5 pt-4" style="color: rgb(7, 93, 93);">Đăng ký</h3>
               <div class="input-group">
                <span class=" input-group-text"><i class="bi bi-person-fill m-auto"></i></span>
                <input @change="v_username" v-model="Payload.username" :class="{'form-control':true,'is-invalid':Error.username,'is-valid':Error.username==null}" placeholder="Nhập tên đăng nhập" type="text">
                 <div  class="invalid-feedback">{{ Error.username }}</div>
               </div>
               <div class="input-group mt-2">
                <span class=" input-group-text"><i class="bi bi-card-text m-auto"></i></span>
                <input @change="v_fullname" v-model="Payload.fullname" :class="{'form-control':true,'is-invalid':Error.fullname,'is-valid':Error.fullname==null}" placeholder="Nhập họ tên" type="text">
                 <div  class="invalid-feedback">{{ Error.fullname }}</div>
               </div>
                <div class="input-group mt-2">
                    <span class="input-group-text"> <i class="bi bi-key-fill m-auto"></i></span>
                <input @change="v_password" type="password" v-model="Payload.password" :class="{'form-control':true,'is-invalid':Error.password,'is-valid':Error.password==null}" placeholder="Nhập mật khẩu"  >
                 <div  class="invalid-feedback">{{ Error.password }}</div>
                </div>
                <div class="input-group mt-2">
                    <span class="input-group-text"> <i class="bi bi-key-fill m-auto"></i></span>
                <input @change="v_password_repeat" type="password" v-model="Payload.password_repeat" :class="{'form-control':true,'is-invalid':Error.password_repeat,'is-valid':Error.password_repeat==null}" placeholder="Nhập lại mật khẩu" >
                 <div  class="invalid-feedback">{{ Error.password_repeat }}</div>
                </div>
                <div class="input-group mt-2">
                    <span class="input-group-text"> <i class="bi m-auto">@</i></span>
                <input @change="v_email" v-model="Payload.email" :class="{'form-control':true,'is-invalid':Error.email,'is-valid':Error.email==null}" placeholder="Nhập email"  type="email">
                 <div  class="invalid-feedback">{{ Error.email }}</div>
                </div>
                <div class="input-group mt-2">
                    <span class="input-group-text"> <i class="bi bi-telephone-fill m-auto"></i></span>
                <input @change="v_phone" v-model="Payload.phone"  @keypress="NumberOnly"
                 :class="{'form-control':true,'is-invalid':Error.phone,'is-valid':Error.phone==null}" placeholder="Nhập số điện thoại"  type="tel">
                 <div  class="invalid-feedback">{{ Error.phone }}</div>
                </div>
                <div class=" d-flex justify-content-center align-content-center pt-2 mb-2 mt-4">
                    <button @click="OnSignup" class=" btn text-white btn-primary px-4">Đăng ký</button>
                </div>
        </div>
    <hr>
        <p class="text-center bottom-0">
           <label for="">Đã có tài khoản?</label>&nbsp;
           <router-link class="link-info text-decoration-none" :to="{name:'login'}">Đăng Nhập</router-link>
        </p>
    </div>
</transition>
</template>

<script>
import { onMounted, reactive,ref } from 'vue'
import {SignUp} from '../../modules/home/HomeAPI.js'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const isShow=ref()
    const Error=reactive({
            username:'',
            fullname:'',
            password:'',
            password_repeat:'',
            email:'',
            phone:''
    })
    const Payload=reactive({
            username:'',
            fullname:'',
            password:'',
            password_repeat:'',
            email:'',
            phone:''
    })

    const validate=()=>{
        if(Payload.username==''||Payload.password==''||Payload.email==''||Payload.phone=='')
            return false
        return true
    }
    onMounted(()=>{
        isShow.value=false
        isShow.value=true
    })
    
    const OnSignup= async()=>{
        if(!validate())
            return
        try{
            await SignUp(Payload)
            Swal.fire({
            icon: "success",
            title: "Thành công",
            text: "Đăng ký thành công, Có thể đăng nhập",
          })
        }
        catch(err){
            Swal.fire({
          icon: "error",
          title: "Thất Bại",
          text: err.response.data.message??err.message,
        });
           
        }
        

        

    }
    const NumberOnly=(evt)=>{
        evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else 
        return true;
    }

    const v_username=()=>{
        if(Payload.username.length==0)
            Error.username='Tên đăng nhập không được để trống'
        else if(!Payload.username.match('^[a-zA-Z0-9]+$'))
            Error.username='Tên đăng nhập chứa ký tự không hợp lệ'
        else
            Error.username=null
    }
    const v_fullname=()=>{
        if(Payload.fullname.length==0)
            Error.fullname='Họ tên không được để trống'
        else
            Error.fullname=null
    }
    const  v_password=()=>{
        //password
        if(Payload.password.length==0)
            Error.password='Mật khẩu không được để trống'
        else
            Error.password=null
    }
   const v_password_repeat=()=>{
         //password-repeat
         if(Payload.password_repeat.length==0)
            Error.password_repeat='Không được để trống trường này'
        else if(Payload.password!=Payload.password_repeat)
            Error.password_repeat='Mật khẩu không giống nhau'
        else
                Error.password_repeat=null
    }
    const v_email=()=>{
         //email
         if(Payload.email.length==0)
            Error.email='Email không được để trống'
        else if(!Payload.email.match('[a-z0-9]+@[a-z]+\.[a-z]{2,3}'))
            Error.email='Email không hợp lệ'
        else
                Error.email=null
    }
    const v_phone=()=>{
        //phone
        if(Payload.phone.length==0)
            Error.phone='Số điện thoại không được để trống'
        else if(!Payload.phone.match('(84|0[3|5|7|8|9])+([0-9]{8})$'))
            Error.phone='Số điện thoại không hợp lệ'
        else
                Error.phone=null
    }
    return {isShow,Payload,Error,OnSignup,NumberOnly,
        v_username,v_fullname,v_password,v_password_repeat,v_email,v_phone

    }
}
}
</script>

<style>

</style>../../modules/home/ClientAction.js../../modules/home/HomeAPI.js