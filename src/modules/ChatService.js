import * as SignalR from '@microsoft/signalr'
import { GetChatList,GetAccountById } from './CallAPI';
import axios from 'axios';
import store from '../Store';
// var connection=new SignalR.HubConnectionBuilder().withUrl("localhost:5251/chatHub").build()
const jwtToken=store.state.user.jwtToken
export var connection = new SignalR.HubConnectionBuilder()
.configureLogging(SignalR.LogLevel.Debug)
.withUrl("https://localhost:7251/Hub", {
  accessTokenFactory: () => { return jwtToken.replace("Bearer ","")}
})
.withAutomaticReconnect().build();
async function IsStart() {
        if (connection.state === SignalR.HubConnectionState.Connected) 
            return true
          else {
            await connection.start()
            return true
        }
}
export async function SendtoAdmin(content){
    if(await IsStart()){
        connection.invoke(connection.invoke('SendMessageToAdmin',content))
        console.log(connection.state)
    }
        
}
export async function SendToUser(userId,content){
    if(await IsStart())
        connection.invoke(connection.invoke('SendMessageToUser',userId,content))
}
// Nhận được tin nhắn 
// connection.on('ReceiveMessage', (data)=>{
//     alert(data.content)
// })
export async function GetMyChat(){
    try{
      let response=await axios.get(`/chats/my-chat`)
      return response.data.result.messages;
    }
    catch(err){
      throw err;
    }
  }

  export async function GetListChat(pageindex,pagesize,sort){
    try{
      let arr=await GetChatList(pageindex,pagesize,sort)
      return arr
    }
    catch(err){
      throw err;
    }
  }
