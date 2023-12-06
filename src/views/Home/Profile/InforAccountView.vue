<template>
    <section class="card p-2 p-lg-3 px-lg-5" style="height: 100vh;">
        <div class="border-bottom d-flex flex-column">
            <h3 class="mt-1">Hồ Sơ Của Tôi</h3>
            <span class="text-muted">Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
        </div>
        <div class="row mt-4 justify-content-around">
            <div class="col-8 mt-3">
                <div class="row">
                    <div class="col-5 text-end">
                        <label class="text-muted">Tên đăng nhập</label>
                    </div>
                    <div class="col text-start">
                        <span>{{account.username}}</span>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-5 text-end align-self-center">
                        <label class="text-muted">Tên đầy đủ</label>
                    </div>
                    <div class="col text-start">
                        <input class="form-control" v-model="account.fullname"/>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-5 text-end align-self-center">
                        <label class="text-muted">Số điện thoại</label>
                    </div>
                    <div class="col text-start">
                        <span>{{account.phone}}</span>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-5 text-end align-self-center">
                        <label class="text-muted">Địa chỉ email</label>
                    </div>
                    <div class="col text-start">
                        <span>{{account.email}}</span>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-5 text-end align-self-center">
                        <label class="text-muted">Giới tính</label>
                    </div>
                    <div class="col text-start d-flex">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" :value="true" v-model="account.sex" >
                            <label class="form-check-label" >
                              Nam
                            </label>
                          </div>
                          <div class="form-check ms-2">
                            <input class="form-check-input" type="radio" :value="false"  v-model="account.sex" >
                            <label class="form-check-label" >
                              Nữ
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-5 text-end align-self-center">
                        <label class="text-muted">Địa chỉ</label>
                    </div>
                    <div class="col text-start">
                        <input type="text" class="form-control" v-model="account.address">
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-5 text-end align-self-center">
                        <label class="text-muted">Ngày tham gia</label>
                    </div>
                    <div class="col text-start">
                        <span>{{GetDate(account.createAt)}}</span>
                    </div>
                </div>
            </div>
            <div class="col-4 justify-content-center align-content-center border-start flex-column">
                <p class="text-center fw-bolder">Ảnh đại diện</p>
                <!-- Ảnh -->
                <div @mouseenter="showUpload=true" @mouseleave="showUpload=false"  class="d-flex flex-column justify-content-center position-relative align-content-centeralign-items-center avatar--img" >
                    <img  class="img-fluid" :src="avatarPath" alt="">
                    <!-- Upload -->
                    <div v-if="showUpload" class="position-absolute text-center w-100">
                        <label for="file-upload"><i class="bi bi-plus-circle-fill text-white fs-1 align-self-center"></i></label>
                        <input @change="onUploadImage" id="file-upload" class="form-control d-none" type="file" accept=".png, .jpg, .jpeg, .webp">
                    </div>
                </div>
                <transition>
                    <div v-if="updated_avatar" class="alert alert-success mt-2" role="alert">
                            cập nhật thành công
                    </div>
                </transition>
            </div>
        </div>
        <div class="d-flex justify-content-center mt-5">
            <button @click="onUpdate" class="btn btn-success px-4"> Lưu lại</button>
        </div>
        
    </section>
</template>

<script>
import { onMounted, ref } from 'vue'
import {GetProfile,updateAvatar,updateInfor} from '../../../modules/home/HomeAPI.js'
import Swal from 'sweetalert2'
export default {
    setup() {
        const avatarPath=ref('')
        const showUpload=ref(false)
        const updated_avatar=ref(false)
        const file_uploader=ref()

        const onUpdate=async()=>{
            try{
                await updateInfor({
                    fullname:account.value.fullname,
                    address:account.value.address
                })
                Swal.fire({
                        text: "Thành công!",
                        icon: "success"
                        });

            }
            catch{
                Swal.fire({
                        text: "something went wrong!",
                        icon: "error"
                        });
            }
        }
        const onUploadImage=async(e)=>{
            try{
                file_uploader.value=e.target.files[0]
                 await updateAvatar(file_uploader.value)
                avatarPath.value=URL.createObjectURL(file_uploader.value);
                updated_avatar.value=true
                setTimeout(()=>updated_avatar.value=false,2000)
            }
            catch{
                Swal.fire({
                        text: "something went wrong!",
                        icon: "error"
                        });
            }
        }

        const GetDate = (e) => {
            let date=new Date(e)
        return date.toLocaleString()
    }
    const account=ref({})
    onMounted(async()=>{
        account.value= await GetProfile()
        avatarPath.value= backendHost+'/images/avatar/'+account.value.profileImage??'../../../../public/Images/avatar-default.svg'
    })
    return{account,GetDate,showUpload,avatarPath,updated_avatar,onUploadImage,onUpdate}
}
}
</script>

<style scoped>
.avatar--img:hover img{
    filter:brightness(50%);
    transition:all .4s ease-in
}

</style>