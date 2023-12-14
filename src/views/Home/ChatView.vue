<template>
<main class="mb-5">
    <div class=" position-relative">
       <div class="col-12 px-2 position-relative bottom-0" >
         <div class="card " style="min-height: 600px; min-width: 400px;">
           <!-- Tài khoản chat -->
           <div class="card-header d-flex justify-content-between border-0">
            <div class="d-flex">
              <svg width="30" fill="#300f61" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 414.594 414.594" xml:space="preserve" stroke="#2503ce"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M357.594,298.009l-84.891-33.848l-19.881-16.748c-5.25-4.438-13.004-4.11-17.873,0.73l-27.64,27.481l-27.717-27.492 c-4.874-4.832-12.618-5.146-17.864-0.722l-19.879,16.748l-84.895,33.854C29.622,308.9,29.644,405.708,27.297,414.594h360 C384.955,405.73,384.941,308.885,357.594,298.009z"></path> <path d="M314.002,87.668C308.106,38.434,262.505,0,207.297,0s-100.81,38.434-106.705,87.668 c-4.898,3.137-8.153,8.613-8.153,14.859v39.996c0,9.743,7.899,17.646,17.646,17.646l15.942-0.04 c9.848,51.453,44.795,80.728,81.27,80.728c36.475,0,57.666-17.339,71.719-49.293c-10.729,8.416-26.324,16.114-48.134,17.704 c-2.004,2.985-5.411,4.951-9.276,4.951h-10.189c-6.167,0-11.167-4.999-11.167-11.167s5-11.167,11.167-11.167h10.189 c3.611,0,6.813,1.723,8.854,4.383c35.067-2.815,51.558-24.083,58.134-36.091l15.916-0.006c9.746,0,17.646-7.903,17.646-17.646 v-39.996C322.154,96.281,318.899,90.805,314.002,87.668z M287.961,89.47c-10.407-32.854-40.473-52.385-80.664-52.385 c-40.192,0-70.276,19.519-80.694,52.357c-1.612-1.456-3.49-2.616-5.559-3.401C127.705,48.656,163.845,20,207.297,20 s79.591,28.656,86.253,66.041C291.468,86.832,289.58,88,287.961,89.47z"></path> </g> </g> </g> </g></svg>
               <span class="fw-bold fs-5 text-success ms-2 align-self-end">Hỗ trợ viên</span>
            </div>
             <a @click="onDisconnect" v-if="!isDisconnected" role="button" class="btn btn-outline-danger  d-flex"><span class="align-self-center fw-bold">Thoát</span></a>
           </div>
           <!-- Nội dung chat -->
           <div id="chat" class="card-body p-3 p-sm-4 h-100" style="overflow-x: visible;overflow-y: scroll; max-height: 75dvh;">
             <div v-for="item,index in messages" :key="index" :class="{'d-flex':true,'justify-content-end':!item.isAdmin}">
               <div class="mt-2">
                 <p :class="{'mb-0 border px-2 py-1 rounded-2':true,'bg-blue text-white':!item.isAdmin}"> {{ item.content }}</p>
                <p class="text-muted" style="font-size: small;">{{ new Date(item.timeSend).toLocaleString() }}</p>
               </div>
             </div>
             <div v-if="isDisconnected" class="text-center text-muted">
               <span class=""> Đã kết thúc trò chuyện</span>
               <div class="text-center">
                <router-link  class="mt-2 link-info text-blue text-decoration-none fw-semibold" :to="{name:'home'}"><i class="bi bi-arrow-left-circle"></i> Quay lại trang chủ</router-link>
               </div>
              <br>
            </div>
           </div>
           <!-- Khung nhập -->
           <div class="card-footer border-0 py-2" v-if="!isDisconnected">
             <form class="d-flex" @submit.prevent="onSubmit">
               <input class="form-control" v-model="mymessage"  />
               <div class="align-self-center ms-2">
                 <button  type="submit" class="btn bg-blue text-white px-3 fw-bold">Gửi</button>
               </div>
             </form>
   
           </div>
         </div>
       </div>
    </div>
    </main>
   </template>
   
   <script>
import { onMounted, onUnmounted, ref } from 'vue'
   import {connection,SendtoAdmin,GetMyChat,DisconnectWithAdmin} from '../../modules/ChatService.js'
import { useStore } from 'vuex'
   export default {
   setup(){
    const store=useStore()
    const messages=ref([])
    const isDisconnected=ref(false)
    const mymessage=ref('')
    
    connection.on('ReceiveMessage', (data)=>{
        messages.value.push(data)
        tobottomChat()
})
    
    connection.on('Disconnect',async ()=>{
      isDisconnected.value=true
      await connection.stop()
})
    


const tobottomChat=()=>setTimeout(()=>document.querySelector('#chat').scrollTop= document.querySelector('#chat').scrollHeight,220) 

    const onSubmit=async ()=>{
      if(isDisconnected.value)
        isDisconnected.value=false

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

    const onDisconnect=async()=>{

      Swal.fire({
      title: "Đóng cuộc trò chuyện",
      text: "Sẽ xoá lịch sử cuộc hội thoại",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Vẫn đóng"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await DisconnectWithAdmin()
        isDisconnected.value=true
        await connection.stop()
        Swal.fire({
          title: "Thành công",
          icon: "success"
        });
      }});

     
    }
    onMounted( async ()=>{
       await connection.start()
        let data= await GetMyChat()
        messages.value=data
    })
    onUnmounted(async()=>{
      await connection.stop()
    })
    return{messages,mymessage,onSubmit,
      isDisconnected,onDisconnect
    
    
    }
   }
   }
   </script>
   
   <style scoped>
   
   </style>