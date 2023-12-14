<template>
  <section class="w-100 position-relative" style="min-height: 100vh;min-width: 1024px;">
    <div v-if="isNochat" class="position-absolute top-50 start-50 fs-2 fw-bold">Không có đoạn chat nào</div>
    <!-- List chat -->
    <div v-else class="w-100 position-relative d-flex">
      <div  class="col-4 h-100 border">
        <div class="col-12  d-flex p-2">
          Hiển thị tối đa
          <select @change="changepagesize" v-model="pagging.pagesize"
            class="pt-0 ms-2 form-select"
            style="max-width: 70px; height: 28px !important">
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
          <!-- <ul class="nav d-flex justify-content-evenly py-3">
            <li class="nav-item px-2 text-muted fw-bold" >Tất cả</li>
            <li class="nav-item px-2 text-muted fw-bold" >Chưa đọc</li>
            <li class="nav-item px-2 text-muted fw-bold" >Đã đọc</li>
          </ul> -->
        <div class=" h-100 border-top">
          <ul class="border-end overflow-scroll h-100 px-1" style="min-height: 80dvh; overflow-x: visible !important;">
            <user-list-item ref="chatItem" @click="onPickChat(item)" v-for="item in listChat" :key="item" :chatitem="item" :class="{'chat--active':chat_picked.id==item.id}"/>
          </ul>
          <nav class="d-flex justify-content-center pt-2">
            <ul class="pagination">
              <li v-if="pagging.pageindex > 1" @click="changepage(--pagging.pageindex)" class="page-item">
                <a class="page-link" href="#!"><span>«</span><span class="sr-only"></span></a>
              </li>

              <li class="page-item active">
                <span  class="page-link" >{{ pagging.pageindex }}</span>
              </li>
              <li v-if="pagging.pageindex < pagging.totalpage" @click="changepage(++pagging.pageindex)" class="page-item">
                <a class="page-link" href="#!"><span>»</span><span class="sr-only"></span></a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <!-- Chat-windows -->
      <div class="col-8 px-2 position-relative bottom-0" >
       <chat-window v-if="isShowChatWindow" :Chat_picked="chat_picked" :User="user_picked" @onDisconectChat="onDisconnectUser" />
      </div>

    </div>
  </section>
</template>

<script>
import UserListItem from '../../components/Admin/Chats/UserListItem.vue'
import ChatWindow from '../../components/Admin/Chats/ChatWindow.vue'
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
import {SendToUser,connection,GetChatList} from '../../modules/ChatService.js'
import { useStore } from 'vuex';

export default {
  components: { UserListItem ,ChatWindow},
  setup() {
    const listChat=ref([])
    const pagging=reactive({
      pageindex:1,
      pagesize:10,
      totalpage:1,
      sort:"date_desc"
    })
    const chatItem=ref()
    const chat_picked=ref({})
    const user_picked=ref({})
    const isShowChatWindow=ref(false)
    const store=useStore()
    const onPickChat=(chat)=>{
      chatItem.value.forEach(item=>{
        if(item.accountInfor.id==chat.accountId){
          user_picked.value=item.accountInfor
        }
       
      })
      isShowChatWindow.value=true
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
    connection.on('Disconnect',async(UserId)=>{
      //xoá chat trong list
      listChat.value.forEach((value,index)=>{
      if(value.accountId==UserId)
        listChat.value.splice(index,1)
    })
    //đóng cửa sổ chat
    if(chat_picked.value.accountId==UserId){
        isShowChatWindow.value=false
        chat_picked.value={}
        Swal.fire("Người dùng đã rời đoạn chat","","warning")
    }
    })
    
    const changepage = async (e) => {
      pagging.pageindex = e;
      await GetData()
      isShowChatWindow.value=false
      chat_picked.value={}
    };
    const changepagesize = async () => {
      pagging.pageindex = 1;
      pagging.pagesize= pagging.pagesize
      await GetData();
    };
onMounted(async ()=>{
    await GetData()
    if(connection.state=="Disconnected")
    await connection.start()
  })
  
  const GetData=async()=>{
    let data= await GetChatList(pagging.pageindex,pagging.pagesize,pagging.sort)
    listChat.value=data.items
    pagging.totalpage=data.totalPages
  }

  const onDisconnectUser=(chatId)=>{
    isShowChatWindow.value=false
    //xoá trong list
    listChat.value.forEach((value,index)=>{
      if(value.id==chatId)
        listChat.value.splice(index,1)
    })
  }
  const isNochat=computed(()=>listChat.value.length==0)
    return {chat_picked,listChat,chatItem,
      onPickChat,user_picked,isShowChatWindow,
      onDisconnectUser,isNochat,pagging,changepage,
      changepagesize
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
