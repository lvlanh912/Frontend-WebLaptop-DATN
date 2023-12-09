<template>
    <section class=" p-2 p-lg-3 px-lg-5 position-relative" style="min-height: 100vh;">
        <div class="border-bottom my-2">
            <h3 class="mt-1 fs-4">Đơn hàng của tôi</h3>
        </div>
        <div class="d-flex border-bottom border-1 py-1 bg-white">
            <!-- options -->
        <Carousel  class="w-100" :breakpoints="breakpoints" >
                <Slide v-for="option in myOptions" :key="option" >
                    <div @click="mychosenOption=option.type"   :class="{'px-2 py-2 col no-wrap':true,'option-selected':mychosenOption==option.type}">
                        <strong class="text-muted">{{ option.name }}</strong>
                    </div>
                </Slide>
        </Carousel>
        </div>

        <div v-if="myOrder.length==0&&!loading" class="">
            Không có đơn hàng nào
        </div>
        <div v-else  class="mt-2  px-3">
            <!-- Loading -->
            <div class="card" v-if="loading">
                <div class="card-body">
                    <div class="d-flex justify-content-end">
                         <div class="col-3 skeleton-loader" style="height: 15px;"></div>
                    </div>
                    <div class="d-flex">
                        <div class="skeleton-loader" style="height: 53px; aspect-ratio: 1;"></div>
                        <div class="d-flex justify-content-between w-100">
                            <div class="d-block text-muted skeleton-loader ms-2 col-5" style="height: 16px;"></div>
                            <div class=" d-flex justify-content-end align-content-center w-100 mt-5">
                               <div class="skeleton-loader col-8" style="height: 18px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div class="w-100 mt-3" v-else>
                    <!-- order -->
                    <div @click="pickedOrder=order" :class="{'row border-bottom mt-2 bg-white':true,'picked--order shadow':pickedOrder==order}" v-for="order in myOrder" :key="order.id">
                        <!-- Tình trạng đơn -->
                        <div class="d-flex justify-content-end align-content-center mt-1">
                            <span :class="{'inherit fw-bolder':true,
                                'text-orange':order.status.code==1,
                                'text-blue':order.status.code==2,
                                'text-green':order.status.code==3,
                                }">
                                {{ order.status.description }}
                            </span>
                        </div>
                        <div class=" d-flex justify-content-end mt-2 px-3">
                            <hr class="m-0 w-100">
                        </div>
                        <!-- Sản phẩm đầu tiên-->
                       <Myorder :orderItem="order.items[0]" />
                        <!-- Thông tin đơn hàng -->
                        <transition :duration="400" name="slide-fade" mode="out-in">
                            <div v-if="pickedOrder==order" class="">
                                <!-- Sản phẩm khác v-for -->
                                <Myorder v-for="orderItem,index in order.items.slice(1)" :key="index" :orderItem="orderItem" />
                                <div class="w-100 d-flex justify-content-end">
                                    <div class="d-flex flex-column col-12 col-sm-9 col-lg-8">
                                            <div class="col-12 d-flex mt-1">
                                                <div class="col text-end text-muted">Tổng tiền hàng</div>
                                                <div class="col text-end">{{ ToVND(order.total) }}</div>
                                            </div>
                                            <div class="col-12 d-flex mt-1">
                                                <div class="col text-end text-muted">Khấu trừ mã giảm giá</div>
                                                <div class="col text-end">{{ ToVND(order.total-order.paid) }}</div>
                                            </div>
                                            <div class="col-12 d-flex mt-1">
                                                <div class="col text-end text-muted align-self-end">Phương thức thanh toán</div>
                                                <div class="col text-end text-dark">Thanh toán khi nhận hàng</div>
                                            </div>
                                    </div>
                                </div>
                                <div class="d-flex flex-column text-muted py-2">
                                    <span>
                                        Người nhận: {{ order.shippingAddress.fullname }}(+84{{ order.shippingAddress.phone }})
                                    </span>
                                   <span >
                                    Địa chỉ: {{ order.shippingAddress.address }} - {{  myaddress}}
                                   </span>
                                </div>
                                
                            </div>
                        </transition>
                        <div class="col-12 text-end">
                                <span class="col text-end text-muted align-self-end me-2 fw-bold">Thành tiền</span>
                                <span class="col text-end text-blue fw-bold fs-5">{{ ToVND(order.paid) }}</span>
                        </div>
                    </div>
                </div>
        </div>
        <nav class="d-flex justify-content-end pt-2" v-if="totalpage>1">
        <ul class="pagination">
          <li v-if="page_index > 1" @click="changepage(--page_index)" class="page-item">
            <a class="page-link" href="#!"><span>«</span><span class="sr-only"></span></a>
          </li>
          <li class="page-item active">
            <a role="button" class="page-link" href="#!">{{ page_index }}</a>
          </li>
          <li v-if="page_index < totalpage" @click="changepage(++page_index)" class="page-item">
            <a class="page-link" href="#!"><span>»</span><span class="sr-only"></span></a>
          </li>
        </ul>
      </nav>
       
        
    </section>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { computed, onBeforeMount, reactive, ref, watch } from 'vue'
import { GetMyOrders,GetFulladdress} from '../../../modules/home/HomeAPI.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Carousel,Slide } from 'vue3-carousel'
import Myorder from '../../../components/home/Profile/OrderManager/Myorder.vue'
export default {
components: {
    Carousel,
    Slide,
    Myorder
},
    setup() {
        
        const router=useRouter()
        const store=useStore()
        const loading=ref(true)
        const iserror=ref(false)
        const myOrder=ref([])
        const pickedOrder=ref()
        const page_index=ref(1)
        const page_size=ref(10)
        const totalpage=ref(0)
        const mychosenOption=ref(null)
        const myOptions=ref([
            {type:null,name:'Tất cả'},
            {type:1,name:'Chờ xác nhận'},
            {type:2,name:'Đang giao hàng'},
            {type:3,name:'Đã giao'},
            {type:0,name:'Đã huỷ'}
        ])
        
        const myaddress=ref('')
        const changepage = async (e) => {
            page_index.value = e;
            await Getdata();
            loading.value = false;
        };
        const ToVND = (e) => {
      return e.toLocaleString("it-IT", {style: "currency", currency: "VND"})
    }
        

        onBeforeMount(async() => {
           await Getdata()
        })
        
        const Getdata = async () => {
            try{
                loading.value = true;
                const data= await GetMyOrders(mychosenOption.value,page_index.value,page_size.value)
                totalpage.value=data.totalPages
                myOrder.value=data.items
                loading.value = false;
            }
            catch(err){
                Swal.fire("Lỗi",err.message,"error")
                loading.value = false;
                iserror.value=true
            }

        }
        watch(mychosenOption,async()=> {
            page_index.value=1
            await Getdata()
        })
        watch(pickedOrder,async (value)=>myaddress.value=await GetFulladdress(value.shippingAddress.wardId))
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

    return{router,breakpoints,myOptions,mychosenOption,myOrder,ToVND,pickedOrder,changepage,totalpage,page_index,iserror,loading,myaddress}
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
.picked--order{
    scale: 103%;
}
</style>