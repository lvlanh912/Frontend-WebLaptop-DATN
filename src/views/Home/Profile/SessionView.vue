<template>
    <section class="card p-2 p-lg-3 px-lg-5 position-relative" style="height: 100vh;">
        <div class="border-bottom my-2">
            <h3 class="mt-1 fs-4">Danh sách phiên đăng nhập của tôi</h3>
        </div>
        <div v-for="item,index in mySession" :key="index" class="row border-bottom pb-3">
            <div class="col-12 mt-3">
                <div class="row">
                    <span v-if="curent_jwt=='Bearer '+item.value" class=" inherit fw-bolder text-green ">Phiên hiện tại</span>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex flex-column">
                           <strong>{{item.ipAddress.replace('Other on Other','Thiết bị không xác định' )}}</strong>
                           <strong class="text-muted mt-2">Thời gian: {{ GetDate(item.createAt)}}</strong>
                        </div>
                        <a v-if="curent_jwt!='Bearer '+item.value" @click="onDelete(index)" role="button" class="text-decoration-none inherit text-red">Đăng xuất</a>
                    </div>
                </div>
            </div>
        </div>
       
        
    </section>
</template>

<script>
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import {GetMySessions,DeleteSession } from '../../../modules/home/HomeAPI.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
    setup() {
        const router=useRouter()
        const store=useStore()
        const mySession = ref([])
        const curent_jwt=computed(()=>{
           return store.state.user.jwtToken
        })
        onBeforeMount(async() => {
           await Getdata()
        })
        const Getdata = async () => {
            mySession.value=await GetMySessions()
        }
        const GetDate=(date)=>  new Date(date).toLocaleString()

        const onDelete=(index)=>{
            Swal.fire({
                        title: "Bạn có chắc muốn xoá phiên đăng nhập này?",
                        showDenyButton: true,
                        denyButtonText: `Đóng`,
                        confirmButtonText: "Xoá",
                        }).then(async (result) => {
                            try{
                                if (result.isConfirmed){
                                    console.log(mySession.value[index].id)
                                    await DeleteSession(mySession.value[index].id)
                                    Swal.fire("Đã xoá", "", "success");
                                    mySession.value.splice(index,1)
                                }
                            }
                            catch{
                                Swal.fire("Something went wrong!", "", "error");
                            }
                        });
        }
        

      
    return{router,onDelete,mySession,GetDate,curent_jwt}
}
}
</script>

<style scoped>
.avatar--img:hover img{
    filter:brightness(50%);
    transition:all .4s ease-in
}
.bg-darker{
    background-color: #0000000d!important;
}

</style>