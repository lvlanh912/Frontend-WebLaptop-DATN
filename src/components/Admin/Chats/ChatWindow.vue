<template>
   <div class="card" style="height: 85dvh;">
        <!-- Tài khoản chat -->
        <div class="card-header  d-flex justify-content-between">
          <span class="fw-bold fs-5">{{ fullname }}</span>
          <a @click="onClose" role="button" class="btn btn-outline-danger  d-flex"><span class="align-self-center fw-bold">Kết thúc</span></a>
        </div>
        <!-- Nội dung chat -->
        <div id="chat" class="card-body p-3 p-sm-4 h-100" style="overflow-x: visible;overflow-y: scroll;">
          <div  v-for="item,index in message" :key="index" :class="{'d-flex':true,'justify-content-end':item.isAdmin}">
            <div class="mt-2 my-2">
                <p :class="{'m-0':true,'text-end':item.isAdmin}">
                    <span :class="{'mb-0 border px-2 py-1 rounded-2':true,'bg-blue text-white':item.isAdmin}"> {{ item.content }}</span>
                </p>
              <span class="mb-0 text-muted" style="font-size: small;">{{ new Date(item.timeSend).toLocaleString() }}</span>
            </div>
          </div>
        </div>
        <!-- Khung nhập -->
        <div class="card-footer">
            <form class="d-flex" @submit.prevent="onSubmit">
               <input class="form-control" v-model="messagetext"  />
               <div class="align-self-center ms-2">
                 <button   type="submit" class="btn bg-blue text-white px-3">Gửi</button>
               </div>
             </form>

        </div>
      </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import {SendToUser,connection,GetListChat} from '../../../modules/ChatService.js'
export default {
props:{
    Chat_picked:{
    },
    User:{}
},
setup(props){
    const messagetext=ref('')
    const message=computed(()=>props.Chat_picked.messages)
    const fullname=computed(()=> props.User.fullname)
    const tobottomChat=()=>setTimeout(()=>document.querySelector('#chat').scrollTop= document.querySelector('#chat').scrollHeight,1000)

    connection.on('ReceiveMessage', (data)=>{tobottomChat()})

    const onClose=()=>{
        
    }
    const onSubmit=async()=>{
        if(messagetext.value.trim()!=''){
            await SendToUser(props.Chat_picked.accountId,messagetext.value)
            props.Chat_picked.messages.push({
                content:messagetext.value,
                isAdmin:true,
                timeSend:new Date()
            })
        }
        messagetext.value=''
        tobottomChat()
}
      

    return {message,onSubmit,
        fullname,messagetext
    
    
    }
}
}
</script>

<style>

</style>