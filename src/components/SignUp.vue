<template>
   <div style="min-width: 20rem;;max-width: 50rem;" class="p-3 bg-white rounded-3 col-7 col-lg-6  px-md-2 px-lg-5 px-sm-1 d-flex flex-column align-content-center">
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
           <a @click="this.$emit('switch',1)" class="link-info text-decoration-none">Đăng Nhập</a>
        </p>
    </div>
</template>

<script>
export default {
  data () {
    return {
        Error:{
            username:'',
            fullname:'',
            password:'',
            password_repeat:'',
            email:'',
            phone:''
            },
        Payload:{
            username:'',
            fullname:'',
            password:'',
            password_repeat:'',
            email:'',
            phone:''
            }
        }
    
  },
  methods: {
    OnSignup(){
        this.Validate()
    },
    NumberOnly(evt){
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else 
        return true;
    },
    v_username(){
        //username
        if(this.Payload.username.length==0)
            this.Error.username='Tên đăng nhập không được để trống'
        else if(!this.Payload.username.match('^[a-zA-Z0-9]+$'))
            this.Error.username='Tên đăng nhập chứa ký tự không hợp lệ'
        else
            this.Error.username=null
    },
    v_fullname(){
         //fullname
         if(this.Payload.fullname.length==0)
            this.Error.fullname='Họ tên không được để trống'
        else
            this.Error.fullname=null
    },
    v_password(){
        //password
        if(this.Payload.password.length==0)
            this.Error.password='Mật khẩu không được để trống'
        else
                this.Error.password=null
    },
    v_password_repeat(){
         //password-repeat
         if(this.Payload.password_repeat.length==0)
            this.Error.password_repeat='Không được để trống trường này'
        else if(this.Payload.password!=this.Payload.password_repeat)
            this.Error.password_repeat='Mật khẩu không giống nhau'
        else
                this.Error.password_repeat=null
    },
    v_email(){
         //email
         if(this.Payload.email.length==0)
            this.Error.email='Email không được để trống'
        else if(!this.Payload.email.match('[a-z0-9]+@[a-z]+\.[a-z]{2,3}'))
            this.Error.email='Email không hợp lệ'
        else
                this.Error.email=null
    },
    v_phone(){
        //phone
        if(this.Payload.phone.length==0)
            this.Error.phone='Số điện thoại không được để trống'
        else if(!this.Payload.phone.match('(84|0[3|5|7|8|9])+([0-9]{8})$'))
            this.Error.phone='Số điện thoại không hợp lệ'
        else
                this.Error.phone=null
    }
  },

}
</script>

<style>

</style>