<template>
  <li :class="{'d-flex px-2 mt-2 py-2':true}">
    <!-- avatar -->
    <div class=" overflow-hidden rounded rounded-circle position-relative align-self-center " style="min-width: 40px;height: 40px;">
            <i v-if="accountinfor.profileImage==null" class="bi bi-person-fill w-100 fs-3 text-blue ms-1"></i>

        <img v-else  class="position-absolute img-fluid" :src="BackendHost+'/images/avatar/'+accountinfor.profileImage" alt="" >
        <!-- <svg fill="#4f248f" width="256px" height="256px" viewBox="-6.08 -6.08 44.16 44.16" xmlns="http://www.w3.org/2000/svg" stroke="#4f248f" stroke-width="1.7600000000000002" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.536"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></path></g><g id="SVGRepo_iconCarrier"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></path></g></svg> -->
    </div>
    <div class="ms-2 d-flex flex-column">
        <!-- Tên -->
        <span class="fw-normal ">{{ accountinfor.fullname }}</span>
        <!-- Nội dung tin -->
        <span :class="{'max-line-2 col-11':true,'fw-bold':!lastmessage.isAdmin,'text-muted':lastmessage.isAdmin} " style="font-size: smaller;">{{ lastmessage.content }}</span>
    </div>
    </li>
</template>

<script>
import { computed, onMounted, reactive,ref } from 'vue'
import {GetAccountById} from '../../../modules/CallAPI.js'
export default {
props:{
    chatitem:{
    }
},
setup(props){
const chat=reactive(props.chatitem)
const accountInfor= ref({})
const BackendHost=backendHost
onMounted(async()=>{
    accountInfor.value= await GetAccountById(chat.accountId)
})
const accountinfor=computed(()=>accountInfor.value )
const lastmessage=computed(()=>chat.messages[chat.messages.length-1])
return {chat,accountinfor,accountInfor,lastmessage,BackendHost}
}
}
</script>

<style scoped>
.avatar-default{
background: currentColor
}
</style>