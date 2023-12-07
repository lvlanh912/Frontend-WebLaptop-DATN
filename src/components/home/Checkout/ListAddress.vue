<template>
  <!-- The Modal -->
<div class="position-absolute ">
  <div class="modal d-block modal-backdrop ">
    <div class="modal-dialog " style="top:10%">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Chọn địa chỉ</h4>
          <button @click="onClose" type="button" class="btn-close" ></button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <div v-for="item,index in myFullAddress" :key="index" class="row border-bottom pb-3">
            <div class="col-12 d-flex align-items-center">
                <input type="radio" class="form-check-input me-2" v-model="picked" :value="item.id">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <div class=" d-flex flex-column">
                            <strong>{{item.fullname}}( {{item.phone}}) </strong>
                            <span class="text-muted">{{item.address}} - {{ item.fulladdress }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-end mt-1">
          <button @click="onSubmit" class="btn btn-info text-white bg-blue px-2" >Xác nhận</button>
        </div>
        </div>
  

      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive, ref } from 'vue';
import {GetFulladdress,GetMyShippingAddress} from '../../../modules/home/HomeAPI.js'
export default {
  props:{
    ListShippingAddress:{
    },
    Picked_id:{}
  },
  setup(props,{emit}) {
    const myFullAddress=ref([])
    const myAddress=props.ListShippingAddress
    const picked_address=ref({})
    const picked=ref(props.Picked_id)

    onBeforeMount(async() => {
           await Getdata()
        })
    const Getdata = async () => {
             await bindingAddress()
        }
    const bindingAddress=async()=>myAddress.forEach(async(item,index)=>{
            myFullAddress.value.push(item)
            myFullAddress.value[index].fulladdress=await GetFulladdress(item.wardId)
        })
  const onClose=()=>emit("onClose")
  const onSubmit=()=>{
    emit("onSelected",picked.value)
    onClose()
  }
    return{onClose,myFullAddress,picked_address,picked,onSubmit}
    }

}
</script>

<style>

</style>