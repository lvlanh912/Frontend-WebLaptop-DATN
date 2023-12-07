<template>
  <div class="col-12 bg-white py-2">
   <h5 class="py-2 fs-5 inherit fw-bold text-red"><i class="bi bi-geo-alt-fill ms-2 me-2 text-red"></i> Địa chỉ nhận hàng</h5>
   <div class="row">
    <transition>
        <list-address v-if="isShowList" @onClose="isShowList=false" :ListShippingAddress="myAddress" :Picked_id="picked_address.id" @onSelected="onSelect" />
    </transition>
    <div class="d-flex justify-content-between align-items-center py-2">
        <div class=" d-lg-flex d-block align-items-center">
            <div class="d-flex">
                <strong class="ms-2 no-wrap">{{ picked_address.fullname }}</strong>
                <strong class="ms-2">{{ picked_address.phone }}</strong>
            </div>
            <span class="text-muted ms-2"> {{ picked_address.address }} - {{ fulladdress }}</span>
        </div>
        <a @click="isShowList=true"  role="button" class="text-decoration-none no-wrap px-4" style="font-weight: 600;">Thay đổi</a>
    </div>
   </div>
  </div>
</template>

<script>
import {  onMounted, ref } from 'vue'
import {GetMyShippingAddress,GetFulladdress } from '../../../modules/home/HomeAPI.js'
import ListAddress from './ListAddress.vue'
export default {
components:{
    ListAddress
},
setup(){
    const myAddress = ref([])
    const picked_address=ref({})
    const fulladdress=ref('')
    const isShowList=ref(false)

    const Getdata = async () => {
             myAddress.value=await GetMyShippingAddress()
            }
    onMounted(async()=>{
        await Getdata()
        picked_address.value=myAddress.value[0]
        fulladdress.value= await GetFulladdress(picked_address.value.wardId)
    })
    const onSelect=(e)=>{
        picked_address.value=myAddress.value.filter(item=>item.id==e)[0]
    }
    return{
        picked_address,
        fulladdress,
        isShowList,
        myAddress,
        onSelect
    }
}
}
</script>

<style>

</style>