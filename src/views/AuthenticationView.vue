<template>
   <div style="background-color: rgb(228, 200, 134); height: 100vh;" class="justify-content-center align-items-center card">
    <Crumd_Com/>
    <login @switch="(n)=>select=n" v-if="select==1"></login>
    <sign-up @switch="(n)=>select=n" v-if="select==2"/>
    <forgotpassword @switch="(n)=>select=n" v-if="select==3"></forgotpassword>
  </div>
</template>
<script>
import Login from '../components/Login.vue';
import SignUp  from '../components/SignUp.vue';
import Forgotpassword from '../components/Forgotpassword.vue'
import Crumd_Com from '../components/Crumd_Com.vue';
export default {
  created () {
    console.log(this.$route)
  },
  data () {
    return {
      select:1
    }
  },
  components: { Login, SignUp,Forgotpassword,Crumd_Com}
}
</script>

<style>

</style>