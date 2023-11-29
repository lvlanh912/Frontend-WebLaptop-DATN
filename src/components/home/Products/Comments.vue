<template>
  <div class="bg-white mt-3 border-2 rounded-2 py-2">
  <h3 class="ms-2">Đánh giá nhận xét</h3>
  <div class="row px-2">
    <div class="text-center col-3">
   <span class="fs-4" style="color: #FAB204;">5 </span>
        <i  style="color: #FAB204;" class=" fs-4 bi bi-star-fill"></i>
        <p class="h5">1 đánh giá</p>
    </div>
    <div class="col-6">
        <ul class="list-unstyled d-flex flex-column ">
            <li class="d-flex align-items-center">
                <span class="">5 </span>
                <i  style="color: #FAB204;" class=" bi bi-star-fill"></i>
                <div class="ms-3 progress w-100">
                    <div class="progress-bar w-50"></div>
                </div>
                <strong class="text-blue flex-shrink-0 ms-2">1 Đánh giá</strong>
            </li>
            <li class="d-flex align-items-center">
                <span class="">4 </span>
                <i  style="color: #FAB204;" class=" bi bi-star-fill"></i>
                <div class="ms-3 progress w-100">
                    <div class="progress-bar w-50"></div>
                </div>
                <strong class="text-blue flex-shrink-0 ms-2">1 Đánh giá</strong>                
            </li>
            <li class="d-flex align-items-center">
                <span class="">3 </span>
                <i  style="color: #FAB204;" class=" bi bi-star-fill"></i>
                <div class="ms-3 progress w-100">
                    <div class="progress-bar w-50"></div>
                </div>
                <strong class="text-blue flex-shrink-0 ms-2">1 Đánh giá</strong>
            </li>
            <li class="d-flex align-items-center">
                <span class="">2 </span>
                <i  style="color: #FAB204;" class=" bi bi-star-fill"></i>
                <div class="ms-3 progress w-100">
                    <div class="progress-bar w-50"></div>
                </div>
                <strong class="text-blue flex-shrink-0 ms-2">1 Đánh giá</strong>
            </li>
            <li class="d-flex align-items-center">
                <span class="">1 </span>
                <i  style="color: #FAB204;" class=" bi bi-star-fill"></i>
                <div class="ms-3 progress w-100">
                    <div class="progress-bar w-50"></div>
                </div>
                <strong class="text-blue flex-shrink-0 ms-2">1 Đánh giá</strong>
            </li>
        </ul>
    </div>
    <div class="col-12 col-lg-3 align-self-center text-center">
        <button @click="showform=!showform" class="btn btn-send-commnent">{{contentbtn}}</button>
    </div>
    <transition name="slide-fade" :duration="200">
    <form action="" class="d-block" v-if="showform">
        <div class="d-flex align-items-center">
            <span class="float-left fs-6 fw-bolder d-inline">Chọn đánh giá của bạn: </span>
            <div class="d-inline ms-3 rating">
             <span @click="rating=1" :class="{'fs-3 bi px-1':true,'bi-star-fill star-yellow':rating>=1,'bi-star ':rating==0}"></span>
             <span @click="rating=2" :class="{'fs-3 bi px-1':true,'bi-star-fill star-yellow':rating>=2,'bi-star ':rating==1||rating==0}"></span>
             <span @click="rating=3" :class="{'fs-3 bi px-1':true,'bi-star-fill star-yellow':rating>=3,'bi-star ':rating<=2||rating==0}"></span>
             <span @click="rating=4" :class="{'fs-3 bi px-1':true,'bi-star-fill star-yellow':rating>=4,'bi-star ':rating<=3||rating==0}"></span>
             <span @click="rating=5" :class="{'fs-3 bi px-1':true,'bi-star-fill star-yellow':rating>=5,'bi-star ':rating<=4||rating==0}"></span>
            </div>
        </div>
        <div class="d-lg-flex align-items-center ">
            <div class="form-group col">
                <textarea type="text" class="form-control " placeholder="Nhập đánh giá của bạn"></textarea>
            </div>
            <div class="d-block ms-4 align-self-center m-0">
                <button class="btn btn-send-commnent mt-2 col py-1 px-0 pe-2"><i class="fs-5 bi bi-telegram ps-2 ms-0 me-2"></i>Gửi</button>
            </div>
        </div>
    </form>
</transition>
    <!-- list comment -->
    <ul class="list-unstyle">
        <li>
            <div class="name">
                <strong>Hải đăng </strong>
                <span class="text-muted">| Ngày 18-03-2023, 8:26 AM</span>
            </div>
            <div class="d-flex ">
                <!-- star -->
                <div class="d-inline-block me-2">
                    <span class="fs-6 bi px-0 bi-star-fill star-yellow"></span>
                    <span class="fs-6 bi px-0 bi-star-fill star-yellow"></span>
                    <span class="fs-6 bi px-0 bi-star-fill star-yellow"></span>
                    <span class="fs-6 bi px-0 bi-star-fill star-yellow"></span>
                    <span class="fs-6 bi px-0 bi-star-fill star-yellow"></span>
                </div>
                <!-- comment -->
                <span class="text-comment">
                    về làm Lumion mượt phết
                </span>
            </div>
        </li>
    </ul>
  </div>
</div> 
</template>

<script>
import { computed, ref } from 'vue'
export default {
    props:{
        productId:{
            
        }
    },
 setup(){
    const listComment=ref([])
    const rating= ref(0)
    const showform=ref(false)
    const contentbtn= computed(()=>{
        if(!showform.value){
            return 'Gửi đánh giá'
        }
        return 'Đóng lại'
    })
    return {rating,showform,contentbtn}
 }
}
</script>

<style>
.progress{
    height: 8px;
}
.btn-send-commnent{
    border: 2px solid #1988EC;
    background-color: #fff;
    color: #1988EC;
    font-weight: bolder;
}
.btn-send-commnent:hover{
    border: 2px solid #1988EC;
    background-color: #1988EC;
    color: #fff;
}
.star-yellow{
    color: #FAB204;
}
.text-comment{
    font-weight: 500;
}
</style>