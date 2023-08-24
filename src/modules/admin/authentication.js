import {useStore} from 'vuex'
import router from '../../router';

function checklogin(){
   const store= useStore();
   //admin
   if(store.state.user.islogin){
    if(store.state.user.isAdmin)
        router.push({name:'admin'})
    else
    {
        alert('Không có quyền truy cập vào trang này')
        router.push({name:'home'})
    }
        
    
   }
}

export {checklogin}