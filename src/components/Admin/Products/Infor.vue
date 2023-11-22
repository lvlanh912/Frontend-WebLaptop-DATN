<template>
    <div :class="'modal-backdrop pt-3 model-show'">
        <div class="modal-dialog modal-dialog-centered modal-lg" >
            <div class="modal-content">
                <div class="modal-header justify-content-end border-bottom-0">
                    <button type="button" class="btn" @click="onEdit">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button @click="closeInfor" type="button" class="btn-close m-0"></button>
                </div>
                <div class="modal-body pt-0">
                    <div class="row no-gutters">
                        <div class="col-md-6">
                            <div class="px-4">
                                <div class="text-center px-0 border-0">
                                    <div class="card-img mx-auto rounded-circle">
                                        <img class="img-fluid" :src="image_profile"
                                        style="width: 200px;"
                                        alt="user image">
                                    </div>
                                    <div class="card-body">
                                        <h4 class="py-2 text-dark">{{ account.fullname }}</h4>
                                        <strong>Tài khoản {{ Role }}</strong>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between  px-4">
                                    <div class="text-center pb-4">
                                        <h6 class="text-dark pb-1">354</h6>
                                        <p class="">Đơn hàng đã đặt</p>
                                    </div>

                                    <div class="text-center pb-4">
                                        <h6 class="text-dark pb-1">30</h6>
                                        <p class="">Lượt Đánh giá</p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="contact-info px-4">
                                <h4 class="text-dark mb-1">Thông tin</h4>
                                <p class="text-dark pt-2 mb-0">Tên người dùng</p>
                                <p class="ms-1">{{ account.username }}</p>
                                <p class="text-dark pt-2 mb-0">Địa chỉ email</p>
                                <p class="ms-1">{{ account.email }}</p>
                                <p class="text-dark pt-2 mb-0">Số điện thoại</p>
                                <p class="ms-1">+84{{ account.phone }}</p>
                                <p class="text-dark pt-2 mb-0">Giới tính</p>
                                <p class="ms-1">{{ gender }}</p>
                                <p class="text-dark-2 mb-0">Địa chỉ</p>
                                <p class="ms-1">{{ account.address }}</p>
                                <p class="text-dark-2 mb-0">Ngày tham gia</p>
                                <p class="ms-1">{{ CreateAt }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'

export default {
    props: {
    account: {
      required: true,
    },
  },
  setup(props,{emit}){

    //avatar tài khoản
    const image_profile= props.account.profileImage? backendHost+`/images/avatar/${props.account.profileImage}`:backendHost+'/images/avatar/'+'null_avatar.png'
    const gender=computed(()=>{
        return props.account.sex?'Nam':'Nữ'
    })
    //Quyền của tài khoản
    const Role=computed(()=>{
        switch(props.account.role){
            case 0:
                return "Đã bị khoá"
            case 1:
                return "Thành viên"
            case 2:
                return "Quản trị viên"
            default:
                return "Không xác định"
        }
    })
    const CreateAt=computed(()=>{
        let datetime = new Date(props.account.createAt);
      return (
        "Ngày "+
        datetime.getDay() +
        "/" +
        datetime.getMonth() +
        "/" +
        datetime.getFullYear()+
        " lúc "+
        datetime.getHours()+
        " giờ "+
        datetime.getMinutes()+
        " phút"
      );
    })
    function closeInfor(){
        emit('closeInfor')
    }
    function onEdit(){
        emit('openEdit')
    }
    return {image_profile,gender,Role,closeInfor,CreateAt,onEdit}
  }

}
</script>

<style scoped>
.modal-backdrop {
    background-color: #0000005b;
}
.model-show{
    overflow-x:hidden;
    overflow-y: auto;
}
</style>