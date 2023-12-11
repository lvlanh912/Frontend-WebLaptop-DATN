<template>
  <div class="bg-white mt-3 border-2 rounded-2 py-2">
  <h3 class="ms-2">Đánh giá nhận xét</h3>
  <div class="row px-2">
    <div class="text-center col-3">
   <span class="fs-4 fw-bold me-2" style="color: #FAB204;"> {{ AvgRate }}</span>
        <i  style="color: #FAB204;" class=" fs-4 bi bi-star-fill"></i>
        <p class="h5">{{ Total }} đánh giá</p>
    </div>
    <div class="col-6">
        <ul class="list-unstyled d-flex flex-column ">
            <li class="d-flex align-items-center">
                <span class="">5 </span>
                <i  style="color: #FAB204;" class=" bi bi-star-fill"></i>
                <div class="ms-3 progress w-100">
                    <div class="progress-bar" :style="{width:(Count5Star/Total)*100+'%'}"></div>
                </div>
                <strong class="text-blue flex-shrink-0 ms-2">{{ Count5Star }} Đánh giá</strong>
            </li>
            <li class="d-flex align-items-center">
                <span class="">4 </span>
                <i  style="color: #FAB204;" class=" bi bi-star-fill"></i>
                <div class="ms-3 progress w-100">
                    <div class="progress-bar" :style="{width:(Count4Star/Total)*100+'%'}"></div>
                </div>
                <strong class="text-blue flex-shrink-0 ms-2">{{ Count4Star }} Đánh giá</strong>                
            </li>
            <li class="d-flex align-items-center">
                <span class="">3 </span>
                <i  style="color: #FAB204;" class=" bi bi-star-fill"></i>
                <div class="ms-3 progress w-100">
                    <div class="progress-bar" :style="{width:(Count3Star/Total)*100+'%'}"></div>
                </div>
                <strong class="text-blue flex-shrink-0 ms-2">{{ Count3Star }} Đánh giá</strong>
            </li>
            <li class="d-flex align-items-center">
                <span class="">2 </span>
                <i  style="color: #FAB204;" class=" bi bi-star-fill"></i>
                <div class="ms-3 progress w-100">
                    <div class="progress-bar" :style="{width:(Count2Star/Total)*100+'%'}"></div>
                </div>
                <strong class="text-blue flex-shrink-0 ms-2">{{ Count2Star }} Đánh giá</strong>
            </li>
            <li class="d-flex align-items-center">
                <span class="">1 </span>
                <i  style="color: #FAB204;" class=" bi bi-star-fill"></i>
                <div class="ms-3 progress w-100">
                    <div class="progress-bar" :style="{width:(Count1Star/Total)*100+'%'}"></div>
                </div>
                <strong class="text-blue flex-shrink-0 ms-2">{{ Count1Star }} Đánh giá</strong>
            </li>
        </ul>
    </div>
    <div class="col-12 col-lg-3 align-self-center text-center">
        <button @click="showform=!showform" class="btn btn-send-commnent">{{contentbtn}}</button>
    </div>
    <transition name="slide-fade" :duration="200">
    <form action="" class="d-block" v-if="showform" @submit.prevent="onSubmit">
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
                <textarea v-model="content" type="text" class="form-control" placeholder="Nhập đánh giá của bạn"></textarea>
            </div>
            <div class="d-block ms-4 align-self-center m-0">
                <button  class="btn btn-send-commnent mt-2 col py-1 px-0 pe-2">
                    <i class="fs-5 bi bi-telegram ps-2 ms-0 me-2"></i>Gửi
                </button>
            </div>
        </div>
    </form>
</transition>
    <!-- list comment -->
    <ul class=" list-unstyled">
        <li v-for="item,index in commnentShow" :key="index" class="py-2">
            <div class="name">
                <strong>{{ item.AccountInfor.Fullname }}</strong>
                <span class="text-muted ms-2"> {{ GetDate(item.Comment.CreateAt) }}</span>
            </div>
            <div class="d-flex flex-column">
                <!-- star -->
                <div class="d-inline-block me-2">
                    <span :class="{'fs-6 bi px-0 star-yellow':true, 'bi-star-fill':true}"></span>
                    <span :class="{'fs-6 bi px-0 star-yellow':true, 'bi-star-fill':item.Comment.Star>1,'bi-star':item.Comment.Star<=1}"></span>
                    <span :class="{'fs-6 bi px-0 star-yellow':true, 'bi-star-fill':item.Comment.Star>2,'bi-star':item.Comment.Star<=2}"></span>
                    <span :class="{'fs-6 bi px-0 star-yellow':true, 'bi-star-fill':item.Comment.Star>3,'bi-star':item.Comment.Star<=3}"></span>
                    <span :class="{'fs-6 bi px-0 star-yellow':true, 'bi-star-fill':item.Comment.Star>4,'bi-star':item.Comment.Star<=4}"></span>
                </div>
                <!-- comment -->
                <span class="text-comment">
                    {{item.Comment.Conntent}}
                </span>
            </div>
        </li>
    </ul>
  </div>
</div> 
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue'
import {GetComments,CreateComment} from '../../../modules/home/HomeAPI.js'
import { useRouter } from 'vue-router'
export default {
    props:{
        productId:{
            
        }
    },
 setup(props){
    const listComment=ref([])
    const Total=ref(0)
    //đánh giá hiển thị
    const itemtoShow=ref(2)
    const commnentShow=ref([])
    const sumStar=ref(0)
    const rating= ref(5)
    const content=ref('')
    const showform=ref(false)
    const router=useRouter()

    onBeforeMount(async()=>{
        listComment.value=await GetComments(props.productId)
        Total.value=listComment.value.length;
        commnentShow.value=listComment.value.slice(0,itemtoShow.value)
        getsumStar()
    })
    const GetDate=(date)=>new Date(date).toLocaleString()
    const GetsumStar=(star)=> listComment.value.filter(value=>value.Comment.Star==star).length
    const Count5Star=computed(()=>GetsumStar(5))
    const Count4Star=computed(()=>GetsumStar(4))
    const Count3Star=computed(()=>GetsumStar(3))
    const Count2Star=computed(()=>GetsumStar(2))
    const Count1Star=computed(()=>GetsumStar(1))
    
    const getsumStar=()=>{
        listComment.value.forEach(e=>sumStar.value+=e.Comment.Star)
    }
    const AvgRate=computed(()=>{
        const rs=(sumStar.value/(Total.value!=0?Total.value:1))
        return rs!=0?rs.toFixed(1):""
    })
    const contentbtn= computed(()=>{
        if(!showform.value)
            return 'Gửi đánh giá'
        return 'Đóng lại'
    })
    const onSubmit=async ()=>{
        try{
            await CreateComment({
                productId:props.productId,
                conntent:content.value,
                star:rating.value
            })
            Swal.fire("Thành công","","success")
            showform.value=false
            router.go(0)
        }
        catch(err){
            if(err.response)
                Swal.fire("Thất bại",err.response.data.message,"error")
            else
                Swal.fire("Something went wrong!","","error")
        }
    }

    return {rating,showform,contentbtn,Count5Star,Count4Star,Count3Star,Count2Star,Count1Star,
        listComment,commnentShow,Total,AvgRate,GetDate,onSubmit,content
    }
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