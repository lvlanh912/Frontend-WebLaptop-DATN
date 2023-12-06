<template>
    <section :class="{'card p-2 p-lg-3 px-lg-5 position-relative':true,'bg-darker':ishowAdd}" style="height: 100vh;">
        <transition>
            <add-Shipping-Address v-if="ishowAdd"  @closeAdd="ishowAdd=false"/>
        </transition>
        <div class="border-bottom d-flex justify-content-between my-2">
            <h3 class="mt-1 fs-4">Địa chỉ của tôi</h3>
            <button @click="ishowAdd=true" class="btn bg-blue text-white mb-2"> <i class="bi bi-plus-circle me-2"></i>Thêm địa chỉ mới</button>
        </div>
        <p class="fs-5 mb-4">Địa chỉ</p>
        <div v-for="item,index in myAddress" :key="index" class="row border-bottom pb-3">
            <div class="col-12 mt-3">
                <div class="row">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <div class="border-end p-2">
                                <strong>{{item.fullname}}</strong>
                            </div>
                            <span class="text-muted ms-2"> {{item.phone}}</span>
                        </div>
                        <a role="button" class="text-decoration-none inherit">Cập nhật</a>
                    </div>
                    <div class="d-flex flex-column">
                        <span class="text-muted ms-2">{{item.address}}</span>
                        <span class="text-muted ms-2"> {{getAddress(item.wardId) }}</span>
                    </div>
                </div>
            </div>
        </div>
       
        
    </section>
</template>

<script>
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import {GetMyShippingAddress,GetFulladdress } from '../../../modules/home/HomeAPI.js'
import AddShippingAddress from '../../../components/home/Profile/AddShippingAddress.vue'
export default {
    components: {
        AddShippingAddress
    },
    setup() {
        const ishowAdd = ref(false)
        const myAddress = ref([])
        onBeforeMount(async() => {
           await Getdata()
        })
        const Getdata = async () => {
             myAddress.value=await GetMyShippingAddress()
        }
        const getAddress=async(wardId)=> await GetFulladdress(wardId)

      
    return{ishowAdd,myAddress,getAddress}
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