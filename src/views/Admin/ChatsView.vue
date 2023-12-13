<template>
  <section class="w-100 position-relative d-flex" style="min-height: 100vh;min-width: 1024px;">
    <!-- List chat -->
    <div class="col-4 h-100 border">
        <ul class="nav d-flex justify-content-evenly py-3">
          <li class="nav-item px-2 text-muted fw-bold" >Tất cả</li>
          <li class="nav-item px-2 text-muted fw-bold" >Chưa đọc</li>
          <li class="nav-item px-2 text-muted fw-bold" >Đã đọc</li>
        </ul>
      <div class=" h-100 border-top">
        <ul class="border-end overflow-scroll h-100" style="min-height: 100dvh; overflow-x: visible !important;">
          <user-list-item ref="chatItem" @click="onPickChat(item)" v-for="item in listChat" :key="item.index" :chatitem="item" :class="{'chat--active':chat_picked.id==item.id}"/>
        </ul>
      </div>
    </div>
    <!-- Chat-windows -->
    <div class="col-8 px-2 position-relative bottom-0" >
     <chat-window v-if="isShowChat" :Chat_picked="chat_picked" :User="user_picked" />
    </div>
  </section>
</template>

<script>
import UserListItem from '../../components/Admin/Chats/UserListItem.vue'
import ChatWindow from '../../components/Admin/Chats/ChatWindow.vue'
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
import {SendToUser,connection,GetListChat} from '../../modules/ChatService.js'
import { useStore } from 'vuex';
import UserListItemVue from '../../components/Admin/Chats/UserListItem.vue';

export default {
  components: { UserListItem ,ChatWindow},
  setup() {
    const listChat=ref([])
    const pagging=reactive({
      pageindex:1,
      pagesize:5,
      sort:"date_desc"
    })
    const chatItem=ref()
    const chat_picked=ref({})
    const user_picked=ref({})
    const isShowChat=ref(false)
    const store=useStore()
    const onPickChat=(chat)=>{
      chatItem.value.forEach(item=>{
        if(item.accountInfor.id==chat.accountId){
          user_picked.value=item.accountInfor
        }
       
      })
      isShowChat.value=true
     
      chat_picked.value=chat
    }
    connection.on('ReceiveMessage',async (data)=>{
    let update=false
    listChat.value.forEach(element => {
      if(element.accountId==data.accountId){
        element.messages.push(data.message)
        update=true
      }
    });
    if(!update){
      await GetData()

    }
})
  onMounted(async ()=>{
    await GetData()
    connection.start()
   
  })
  const GetData=async()=>{
    listChat.value=[]
    listChat.value= await GetListChat(pagging.pageindex,pagging.pagesize,pagging.sort)
  }
    return {chat_picked,listChat,chatItem,
      onPickChat,user_picked,isShowChat
    
    }
       
  }
};
</script>
<style scoped>
.chat--active{
  background-color: #e3e6ed;
  border-radius: 12px;

}
</style>
