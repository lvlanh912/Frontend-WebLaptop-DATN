<template>
    <section class="card p-2 p-lg-3 px-lg-5" style="height: 100vh;">
        <div class="border-bottom d-flex flex-column">
            <h3 class="mt-1">Đổi mật khẩu</h3>
        </div>
        <form class="row mt-4 px-4 justify-content-center" @submit.prevent="onSubmit">
            <div class="mb-3 col-12  col-sm-7 col-xl-4">
                <label  class="form-label">Mật khẩu cũ</label>
                <input v-model="old_pass" type="password" class="form-control"  placeholder="Nhập mật khẩu cũ">
            </div>
            <div class="mb-3 col-12  col-sm-7 col-xl-4">
                <label  class="form-label">Mật khẩu mới</label>
                <input v-model="new_pass1" type="password" class="form-control"  placeholder="Nhập mật khẩu mới">
            </div>
            <div class="mb-3 col-12  col-sm-7 col-xl-4">
                <label  class="form-label">Nhập lại mật khẩu mới</label>
                <input v-model="new_pass2" type="password" class="form-control"  placeholder="Nhập lại mật khẩu mới">
            </div>
            <div class="d-flex justify-content-center mt-3">
            <button type="submit" class="btn btn-success px-4"> Lưu lại</button>
        </div>
        </form>
       
        
    </section>
</template>

<script>
import { onMounted, ref } from 'vue'
import {ChangePassword} from '../../../modules/home/HomeAPI.js'
import Swal from 'sweetalert2'
export default {
    setup() {
       const old_pass=ref('')
       const new_pass1=ref('')
       const new_pass2=ref('')
       
       const onSubmit= async()=>{
        let rs=validate()
        if(rs!=undefined)
           return Swal.fire("Thông báo",rs,"warning")
        //gọi API đổi mật khẩu
        else{
            try{
                await ChangePassword({
                password:old_pass.value,
                newpassword:new_pass1.value})
                old_pass.value=''
                new_pass1.value=''
                new_pass2.value=''
                return Swal.fire("Thành công","Mật khẩu đã thay đổi","success")

            }
            catch(err){
                if(err.response.data)
                    return Swal.fire("Thông báo",err.response.data.message,"warning")
                return Swal.fire("Something went wrong","","warning")
            }
        }
       
       }
       const validate=()=>{
        if(old_pass.value.trim()==''||new_pass1.value.trim()==''||new_pass2.value.trim()=='')
            return "Vui lòng nhập đầy đủ thông tin"
        if(new_pass1.value!=new_pass2.value)
            return "2 mật khẩu mới không khớp nhau"
        if(!old_pass.value.match('^[a-zA-Z0-9]+$'))
            return "Mật khẩu cũ chứa ký tự không hợp lệ"
        if(!new_pass1.value.match('^[a-zA-Z0-9]+$')||!new_pass2.value.match('^[a-zA-Z0-9]+$'))
            return "Mật khẩu mới chứa ký tự không hợp lệ"

       }
    return{
        old_pass,new_pass1,new_pass2,onSubmit
    }
}
}
</script>

<style scoped>
.avatar--img:hover img{
    filter:brightness(50%);
    transition:all .4s ease-in
}

</style>