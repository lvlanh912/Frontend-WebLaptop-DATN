<template>
  <!-- The Modal -->
<div class="modal position-absolute d-block shadow">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Thêm địa chỉ mới</h4>
          <button @click="onClose" type="button" class="btn-close" ></button>
        </div>
        <p class="mt-1 ms-2"><span class="text-danger">Vui lòng chọn lại địa chỉ</span></p>
        <!-- Modal body -->
        <div class="modal-body">
            <div class="d-md-flex gap-2 justify-content-between">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Họ và tên" v-model="shipping_address.fullname">
                </div>
                <div class="form-group">
                    <input type="text" @keyup="onlyNumber" class="form-control" placeholder="Số điện thoại" v-model="shipping_address.phone">
                </div>
            </div>
            <div class="d-md-flex gap-2">
                <select class="form-select mt-2" v-model="chosen_provices" @change="get_districts">
                    <option  :value="null">Chọn tỉnh</option>
                    <option v-for="province in provinces" :key="province.code" :value="province.code">
                      {{ province.name }}
                    </option>
                  </select>
                  <select class="form-select mt-2" @change="get_wards" v-model="chosen_district">
                    <option  :value="null">Chọn huyện</option>
                    <option v-for="district in districts" :key="district.code" :value="district.code">
                      {{ district.name }}
                    </option>
                  </select>
                  <select class="form-select mt-2" v-model="shipping_address.wardId" >
                    <option  :value="null">Chọn xã</option>
                    <option v-for="ward in wards" :key="ward.id" :value="ward.id">
                      {{ ward.name }}
                    </option>
                  </select>
            </div>
            <div v-if="shipping_address.wardId!=null" class="form-group mt-4">
                    <input v-model="shipping_address.address" type="text" class="form-control" placeholder="Địa chỉ cụ thể">
            </div>
            
        </div>
  
        <!-- Modal footer -->
        <div class="modal-footer d-flex gap-2">
          <button @click="onClose" type="button" class="btn btn-danger">Đóng</button>
          <button @click="onSubmit" type="button" class="btn text-white bg-blue">Xác nhận</button>
        </div>
  
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import {Get_List_Province,Get_List_districts,Get_List_wards,EditShippingAddress} from '../../../modules/home/HomeAPI.js'
export default {
  props:{
    shippingAddress:{

    }
  },
  setup(props,{emit}) {
        const shipping_address=reactive({
            id:props.shippingAddress.id,
            fullname:props.shippingAddress.fullname,
            address:props.shippingAddress.address,
            phone:props.shippingAddress.phone,
            wardId:null
        })
        const chosen_provices = ref(null)
        const chosen_district = ref(null);
        const provinces = ref([]);
        const districts = ref([]);
        const wards = ref([]);
       
        onMounted(async () => {
            provinces.value = await Get_List_Province();
        });
        const get_districts=async()=> {
            chosen_district.value=null
            shipping_address.wardId=null
            districts.value = await Get_List_districts(chosen_provices.value);
        }
        const get_wards=async()=>{
            shipping_address.wardId=null
            wards.value = await Get_List_wards(chosen_district.value);
        }
        const validate=()=>{
            if(shipping_address.fullname.trim()=='')
                return "Họ tên người nhận không được để trống"
            if(shipping_address.phone=='')
                return "Số điện thoại không được để trông"
            if(shipping_address.phone<300000000||shipping_address.phone>999999999)
                return "Số điện thoại không hợp lệ"
            if(shipping_address.address.trim()=='')
                return "Vui lòng nhập địa chỉ cụ thể"
            if(shipping_address.wardId==null)
                return "Vui lòng chọn xã phường"
        }
        const onlyNumber=(e)=>{
      if (!e.target.value.match(/^\d+$/))e.target.value = "";
    }
        const onSubmit=async()=>{
            if(validate()==undefined){
                try{
                  await EditShippingAddress(shipping_address)
                    Swal.fire({
                    text: "thành công",
                    icon: "success"
                    }).then(()=>onClose()
                    )
                }
                catch (err){
                    Swal.fire({
                    title: "Thất bại",
                    text:err.message,
                    icon: "error"
                    });
                }
            }
            else{
                Swal.fire({
                    text: validate(),
                    icon: "warning"
                    });
            }
          
        }
        const onClose=()=>{
          emit("closeEdit")
          emit("onReload")
      }
    return{provinces,chosen_district,shipping_address
        ,wards,get_districts,
        get_wards,districts,chosen_provices,
        onSubmit,onClose,onlyNumber}
    }

}
</script>

<style>

</style>