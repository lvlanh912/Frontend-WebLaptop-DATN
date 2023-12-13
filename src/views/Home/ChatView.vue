<template>
<main class="mb-5">
    <div class=" position-relative">
       <div class="col-12 px-2 position-relative bottom-0" >
         <div class="card" style="min-height: 600px;">
           <!-- Tài khoản chat -->
           <div class="card-header  d-flex justify-content-between">
             <span class="fw-bold fs-5">Chăm Sóc Khách Hàng</span>
             <a role="button" class="btn btn-outline-danger  d-flex"><span class="align-self-center fw-bold">Kết thúc</span></a>
           </div>
           <!-- Nội dung chat -->
           <div id="chat" class="card-body p-3 p-sm-4 h-100" style="overflow-x: visible;overflow-y: scroll; max-height: 75dvh;">
             <div v-for="item,index in messages" :key="index" :class="{'d-flex':true,'justify-content-end':!item.isAdmin}">
               <div class="mt-2">
                 <p :class="{'mb-0 border px-2 py-1 rounded-2':true,'bg-blue text-white':!item.isAdmin}"> {{ item.content }}</p>
                <p class="text-muted" style="font-size: small;">{{ new Date(item.timeSend).toLocaleString() }}</p>
               </div>
             </div>
           </div>
           <!-- Khung nhập -->
           <div class="card-footer">
             <form class="d-flex" @submit.prevent="onSubmit">
               <input class="form-control" v-model="mymessage"  />
               <div class="align-self-center ms-2">
                 <button   type="submit" class="btn bg-blue text-white px-3">Gửi</button>
               </div>
             </form>
   
           </div>
         </div>
       </div>
    </div>
    </main>
   </template>
   
   <script>
import { onMounted, ref } from 'vue'
   import {connection,SendtoAdmin,GetMyChat} from '../../modules/ChatService.js'
import { useStore } from 'vuex'
   export default {
   setup(){
    const store=useStore()
    const messages=ref([])
    const mymessage=ref('')
    connection.on('ReceiveMessage', (data)=>{
        messages.value.push(data)
        tobottomChat()
})
const tobottomChat=()=>setTimeout(()=>document.querySelector('#chat').scrollTop= document.querySelector('#chat').scrollHeight,1000) 
    const onSubmit=async ()=>{
        if(mymessage.value.trim()!=''){
            //gửi tin nhắn cho admin
          await SendtoAdmin(mymessage.value)
          messages.value.push({
                content:mymessage.value,
                isAdmin:false,
                timeSend:new Date()
          })
          tobottomChat()
        }
        mymessage.value=''
    }
    onMounted( async ()=>{
        connection.start()
        let data= await GetMyChat()
        messages.value=data
    })
   
    return{messages,mymessage,onSubmit}
   }
   }
   </script>
   
   <style scoped>
   
   </style>