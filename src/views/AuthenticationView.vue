<template>
    <div v-if="!isloggin" style="height: 100vh;" class=" position-relative justify-content-center align-items-center card border-0 bg-light bg-img">
     <login v-if="selected==1"></login>
     <sign-up v-if="selected==2"/>
     <resetpassword v-if="selected==3"/>
     <forgotpassword v-if="selected==4"></forgotpassword>
   </div>
</template>
<script>
import Login from '../components/authentication/Login.vue';
import SignUp  from '../components/authentication/SignUp.vue';
import Forgotpassword from '../components/authentication/Forgotpassword.vue'
import Resetpassword from '../components/authentication/Resetpassword.vue'
import { onMounted,ref } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
components:{
  Login,
  SignUp,
  Resetpassword,
  Forgotpassword
},
setup(){
  const store=useStore()
  const isloggin=ref(false)
  if(store.state.user.jwtToken!=null&&!store.state.user.isAdmin){
    isloggin.value=true
    useRouter().push('/')
  }
//Nếu đã đăng nhập -->điều hướng về trang chủ
 
  const selected=ref(1)
  const route=useRoute()
  const onChooseForm=(name)=>{
    switch(name){
      case 'login':
        selected.value=1
        break
      case 'signup':
        selected.value=2
        break
      case 'resetpass':
        selected.value=3
        break
      default :
       selected.value=4
    }
  }
  onMounted(()=>onChooseForm(route.name))
  onBeforeRouteLeave((to,from,next)=>{
    
    onChooseForm(to.name)
    next()
  })
  return{selected,isloggin}
  
}
}
</script>

<style  scoped>

</style>