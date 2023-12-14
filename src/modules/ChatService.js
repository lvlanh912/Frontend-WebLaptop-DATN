import * as SignalR from '@microsoft/signalr'
import { GetChatList,GetAccountById } from './CallAPI';
import axios from 'axios';
import store from '../Store';
export{GetChatList}
const jwtToken=store.state.user.jwtToken
export var connection = new SignalR.HubConnectionBuilder()
.configureLogging(SignalR.NullLogger.apply)
// .configureLogging(SignalR.LogLevel.Debug)
.withUrl("https://localhost:7251/Hub", {
  accessTokenFactory: () => { return jwtToken.replace("Bearer ","")}
})
.withAutomaticReconnect()
.build();
async function IsStart() {
        if (connection.state === SignalR.HubConnectionState.Connected) 
            return true
          else {
            console.log("Kết nối tiếp")
            await connection.start()
            return true
        }
}
export async function SendtoAdmin(content){
    if(await IsStart()){
       connection.invoke('SendMessageToAdmin',content)
    }
        
}
export async function SendToUser(userId,content){
    if(await IsStart())
       connection.invoke('SendMessageToUser',userId,content)
}
export async function DisconnectWithUser(userId){
  if(await IsStart())
   await connection.invoke('AdminDisconnectChat',userId)
}
export async function DisconnectWithAdmin(){
  if(await IsStart())
   await connection.invoke('UserDisconnectChat')
      
}
// Nhận được tin nhắn 
// connection.on('ReceiveMessage', (data)=>{
//     alert(data.content)
// })
export async function GetMyChat(){
    try{
      let response=await axios.get(`/chats/my-chat`)
      if(response.data.result)
        return response.data.result.messages;
      return []
    }
    catch(err){
      throw err;
    }
  }
