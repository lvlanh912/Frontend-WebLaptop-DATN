<template>
        <div style="min-width: 20rem;;max-width: 50rem;" class="p-3 bg-white rounded-3 col-6 px-md-2 px-lg-5 px-sm-1 d-flex flex-column align-content-center">
            <div class="d-flex flex-column p-sm-2 p-md-4 p-lg-5">
            <h3 class="text-center mb-2 pt-2" style="color: rgb(7, 93, 93);">Đăng nhập</h3>
            <span class="mb-3 fw-bold" style="color:rgb(13, 57, 43)"> Chào mừng bạn quay trở lại</span>
           <div class="input-group">
            <span class=" input-group-text"><i class="bi bi-person-fill m-auto"></i></span>
            <input v-model="username" :class="{'form-control':true, 'is-invalid':error.username,'is-valid':error.username==null }" placeholder="Nhập tên đăng nhập" type="text">
            <div  class="invalid-feedback">{{ error.username }}</div>
           </div>
            <div class="input-group mt-2">
              <span class="input-group-text"> <i class="bi bi-key-fill m-auto"></i></span>
            <input v-model="password" type="password" :class="{'form-control':true, 'is-invalid':error.password,'is-valid':error.password==null }" placeholder="Nhập mật khẩu">
            <div  class="invalid-feedback">{{ error.password }}</div>
          </div>
            <div class="d-flex justify-content-end pt-3 form-check">
                <input class="form-check-input"  type="checkbox" > 
                <label class="form-check-label ms-2">Nhớ mật khẩu</label>
            </div>
            <div class=" d-flex justify-content-center align-content-center mt-4 pt-2 mb-2">
                <button @click="onLogin" class=" btn text-white btn-success px-4" >Đăng nhập</button>
            </div>
        </div>
    <hr>
        <p class="text-center bottom-0">
           <a @click="this.$emit('switch',3)" class="link-info text-decoration-none mt-2 mb-3">Quên mật khẩu?</a><br>
           <label for="">Chưa có tài khoản?</label>
           <a @click="this.$emit('switch',2)" class="link-info text-decoration-none">Đăng ký</a>
        </p>
    </div>
</template>

<script>
export default {
  methods: {
    onLogin () { 
      if(this.username.length==0)
        this.error.username='Tên đăng nhập không được để trống'
     else if(this.username.includes(' '))
      this.error.username='Tên đăng nhập không được có khoảng cách'
      else if(!this.username.match('^[a-zA-Z0-9]+$'))
      this.error.username='Tên đăng nhập chứa ký tự không hợp lệ'
      else{
        this.error.username=null
      }
      if(this.password.length==0)
      this.error.password='Mật khẩu không thể để trống'
      else
      this.error.password=null
    },

  },
  data () {
    return {
      error:{
        username:'',
        password:''
        }
      ,
      username:'',
      password:''
    }
  },

}
</script>

<style>

</style>