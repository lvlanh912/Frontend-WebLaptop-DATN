<template>
    <section :class="{'card p-2 p-lg-3 px-lg-5 position-relative':true,'bg-darker':ishowAdd||ishowEdit}" style="height: 100vh;">
        <transition>
            <add-shipping-address v-if="ishowAdd"  @closeAdd="ishowAdd=false"/>
        </transition>
        <transition>
            <edit-shipping-address v-if="ishowEdit" :shippingAddress="shipping_address_picked"  @closeEdit="ishowEdit=false" @onReload="router.go(0)"/>
        </transition>
        <div class="border-bottom d-flex justify-content-between my-2">
            <h3 class="mt-1 fs-4">Địa chỉ của tôi</h3>
            <button @click="ishowAdd=true" class="btn bg-blue text-white mb-2"> <i class="bi bi-plus-circle me-2"></i>Thêm địa chỉ mới</button>
        </div>
        <p class="fs-5 mb-4">Địa chỉ</p>
        <div v-for="item,index in myFullAddress" :key="index" class="row border-bottom pb-3">
            <div class="col-12 mt-3">
                <div class="row">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <div class="border-end p-2">
                                <strong>{{item.fullname}}</strong>
                            </div>
                            <span class="text-muted ms-2"> {{item.phone}}</span>
                        </div>
                        <a @click="onEdit(item)" role="button" class="text-decoration-none inherit">Cập nhật</a>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex flex-column">
                            <span class="text-muted ms-2">{{item.address}}</span>
                            <span class="text-muted ms-2">{{ item.fulladdress }}</span>
                        </div>
                        <a @click="onDelete(item.id,index)" role="button" class="text-decoration-none inherit text-red">Xoá</a>
                    </div>
                </div>
            </div>
        </div>
       
        
    </section>
</template>

<script>
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import {GetMyShippingAddress,GetFulladdress,DeleteMyShippingAddress } from '../../../modules/home/HomeAPI.js'
import AddShippingAddress from '../../../components/home/Profile/AddShippingAddress.vue'
import EditShippingAddress from '../../../components/home/Profile/EditShippingAddress.vue'
import { useRouter } from 'vue-router'
export default {
    components: {
        AddShippingAddress,
        EditShippingAddress
    },
    setup() {
        const router=useRouter()
        const ishowAdd = ref(false)
        const ishowEdit=ref(false)
        const myAddress = ref([])
        const shipping_address_picked=ref({})
        const myFullAddress=ref([])
        onBeforeMount(async() => {
           await Getdata()
        })
        const Getdata = async () => {
             myAddress.value=await GetMyShippingAddress()
             await bindingAddress()
        }
        const bindingAddress=async()=>myAddress.value.forEach(async(item,index)=>{
            myFullAddress.value.push(item)
            myFullAddress.value[index].fulladdress=await GetFulladdress(item.wardId)
        })
        const onEdit=(shipping_address)=>{
            ishowEdit.value=true
            shipping_address_picked.value=shipping_address
        }
        const onDelete=(id,index)=>{
            Swal.fire({
                        title: "Bạn có chắc muốn xoá địa chỉ này?",
                        showDenyButton: true,
                        denyButtonText: `Đóng`,
                        confirmButtonText: "Xoá",
                        }).then(async (result) => {
                            try{
                                if (result.isConfirmed){
                                    await DeleteMyShippingAddress(id)
                                    Swal.fire("Đã xoá", "", "success");
                                    myFullAddress.value.splice(index,1)
                                }
                            }
                            catch{
                                Swal.fire("Something went wrong!", "", "error");
                            }
                        });
        }
        

      
    return{ishowAdd,myFullAddress,ishowEdit,onEdit,shipping_address_picked,router,onDelete}
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