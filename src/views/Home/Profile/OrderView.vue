<template>
    <section class=" p-2 p-lg-3 px-lg-5 position-relative" style="height: 100vh;">
        <div class="border-bottom my-2">
            <h3 class="mt-1 fs-4">Đơn hàng của tôi</h3>
        </div>
        <div class="d-flex border-bottom border-1 py-3 bg-white">
            <!-- options -->
            <Carousel  class="w-100" :breakpoints="breakpoints" >
                <Slide v-for="option in myOptions" :key="option" >
                    <div @click="mychosenOption=option.type"   :class="{'px-2  col':true,'option-selected':mychosenOption==option.type}">
                        <strong class="text-muted">{{ option.name }}</strong>
                    </div>
                </Slide>
        </Carousel>
        </div>
            <div class="mt-2 bg-white px-3">
                <div class="col-12 mt-3">
                    <!-- order -->
                    <div class="row border-bottom">
                        <div class="d-flex justify-content-end ">
                            <span :class="{'text-uppercase inherit fw-bolder':true,'text-yellow':true}">Đang chờ thanh toán</span>
                        </div>
                    </div>
                </div>
            </div>
       
        
    </section>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { GetMyOrders} from '../../../modules/home/HomeAPI.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Carousel,Slide } from 'vue3-carousel'
export default {
components: {
    Carousel,
    Slide
},
    setup() {
        const router=useRouter()
        const store=useStore()
        const myOrder=ref([])
        const page_index=ref(1)
        const page_size=ref(10)
        const totalpage=ref(0)
        const myOptions=ref([
            {type:null,name:'Tất cả'},
            {type:1,name:'Chờ xác nhận'},
            {type:2,name:'Đang giao hàng'},
            {type:3,name:'Đã giao'},
            {type:0,name:'Đã huỷ'}
        ])
        const mychosenOption=ref(null)

        onBeforeMount(async() => {
           await Getdata()
        })
        const Getdata = async () => {
            try{
                const data= await GetMyOrders(mychosenOption.value,page_index.value,page_size.value)
                totalpage.value=data.totalPages
                myOrder.value=data.items
            }
            catch(err){
                Swal.fire("Lỗi",err.message,"error")
            }

        }
        const GetDate=(date)=>  new Date(date).toLocaleString()
        //setting for slide
        const breakpoints=reactive({  
    1:{
      itemsToShow: 2,
        snapAlign: 'start',
    },
    576:{
      itemsToShow: 3,
        snapAlign: 'center',
      },  // 700px and up
    760: {itemsToShow: 4,
        snapAlign: 'center',
      },
      // 1024 and up
      1200: {itemsToShow: 5,
        snapAlign: 'center',
      }})

    return{router,breakpoints,myOptions,mychosenOption,myOrder}
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

.option-selected{
    position: relative;
}
.option-selected::after{
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: rgb(4, 0, 255);
    left: 0;
    bottom: 0;
}
</style>