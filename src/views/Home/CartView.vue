<template>
    <main>
   <div class="container px-0">
     <h3 class="text-blue fw-bold">Giỏ hàng của tôi</h3>
     <div style="height: 100%; min-height: 100vh;" class="px-3">
      <div v-if="Cart_show.length>0">
        <p class="text-end ">
          <button @click="onDeleteAll" class="btn bg-red text-white">
            <i class="bi bi-trash me-2"></i>Xoá tất cả </button>
        </p>
        <ol class="list-unstyled col-12 py-4">
        
          <li v-for="item,index in Cart_show" :key="item.product.id" class="px-2 d-flex justify-content-between row py-2 border-top border-bottom bg-white mb-2">
             <!-- Sản phẩm -->
             <div class="d-flex col-xl-5 col-md-6">
               <div class=" align-self-center col-1 me-4 text-start">
                     <input v-model="selected_item" :value="item" type="checkbox" class="form-check-input fs-5">
                 </div>
               <!-- ảnh -->
               <div class="align-middle white-space-nowrap py-0 me-3">
                   <a class="d-block rounded-2 border">
                   <img :src="backendhost+'/images/products/'+item.product.images[0]" alt="" width="53"></a>
               </div>
               <!-- tên sản phẩm -->
               <div class="align-middle white-space-nowrap align-self-center ms-2">
                   <span class="fw-bold">{{item.product.productName}}</span>
               </div>
           </div>
           <!-- Tình trạng hàng -->
           <div class="px-2 ms-2 align-middle white-space-nowrap align-self-center col-xl-1 col-md-2 justify-content-start">
                <p class=" inherit text-muted pt-2 mb-0">
                   còn lại {{ item.product.stock }}
                 </p>
           </div>
           <!-- Giá sản phẩm-->
           <div class="align-middle white-space-nowrap align-self-center col-xl-2 col-md-3 justify-content-start">
             <span class="fs-6">{{ ToVND(item.product.price) }}</span>
               <strong class="d-block text-red text-decoration-line-through">{{ ToVND(item.product.maxPrice) }}</strong>
           </div>
           <!-- Số lượng-->
           <div class="align-middle white-space-nowrap align-self-center col justify-content-start col-xl-3">
             <div class="d-flex">
                 <!-- Giảm SL -->
                  <i @click="onDecrease(index)" class="bi bi-dash-lg  px-2 bg-red text-white"></i>
                  <!-- Số lượng trong giỏ -->
                  <input v-model="item.quantity" disabled type="number" class="bg-light text-center border-0 my-0 py-0" style="max-width: 40px;">
                  <!-- Tăng SL -->
                  <i  @click="onIncrease(index)" class="bi bi-plus-lg px-2 bg-blue text-white"></i>
                </div>
           </div>
           <!-- Xoá-->
           <div class="align-middle white-space-nowrap align-self-center col d-flex justify-content-end">
             <button @click="onDeleteOne(index)" class=" ms-4 fs-4 btn btn-outline-danger bi-trash3 px-1 py-0 text-red bg-white"></button>
           </div>
          </li>
         
        </ol>
        <section v-if="selected_item.length>0" class="px-4">
          <Pendingorder :items="selected_item" />
        </section>
      </div>
      <div v-else class="">
        Không có sản phẩm nào trong giỏ hàng
      </div>
       <!-- infor customer -->
       <!-- <section class="infor-customer border-start col-12 col-lg-5 mb-3 p-3">
         <div class="cart border border-info p-2 shadow rounded-2 px-3 px-lg-4">
           <h5 class="fw-bold text-blue mb-3 text-center">Thông tin thanh toán</h5>
           <input type="text" class="form-control mb-3 input-custom" placeholder="Họ tên người nhận hàng">
           <input type="tel" class="form-control mb-3 input-custom" placeholder="Số điện thoại người nhận">
           <input type="email" class="form-control mb-3 input-custom" placeholder="Email">
           <input type="text" class="form-control mb-3 input-custom" placeholder="Địa chỉ nhận hàng">
           <input type="text" class="form-control mb-3 input-custom" placeholder="Ghi chú">
           <button class="btn bg-blue text-white d-block m-auto">Xác nhận đặt hàng</button>
         </div>
       </section> -->
     </div>
   </div>
 </main>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import {GetCart,GetProductbyId,UpdateQuantity,DeleteOneItem,DeleteAllItem} from '../../modules/home/HomeAPI.js'
import { useStore } from 'vuex'
import Pendingorder from '../../components/home/Pendingorder.vue'
export default {
  components:{
    Pendingorder
  },
    setup(){
        const mycart=ref({})
        const store= useStore()
        const Cart_show=ref([])
        const backendhost=ref(backendHost)
        const selected_item=ref([])

        const ToVND = (e) => {
      return e.toLocaleString("it-IT", {style: "currency", currency: "VND"})
    }

    const onDeleteAll= async()=>{
      try{
        await DeleteAllItem()
        Cart_show.value=[]
        Swal.fire(
						  {
                icon: 'success',
                title: 'Đã xoá',
                text: 'Giỏ hàng đã được làm trống'   
						  })
        store.dispatch("UpdateTotalCart")
      }
      catch(err){
        Swal.fire(
						  {
                icon: 'error',
                title: 'Thất bại',
                text:  err.message 
						  })
      }
    }
    const onDecrease=(index)=>{
      if(Cart_show.value[index].quantity>=1){
        Cart_show.value[index].quantity-=1;
        if(Cart_show.value[index].quantity==0)
        onDeleteOne(index)
      }
    }
    const onIncrease= async(index)=>{
      if(Cart_show.value[index].quantity<Cart_show.value[index].product.stock){
        Cart_show.value[index].quantity+=1;
       await UpdateQuantity({
        productId:Cart_show.value[index].product.id,
        quantity:Cart_show.value[index].quantity
      })
      }
      else
        Swal.fire(
						  {
                icon: 'warning',
                title: 'Không thể tăng',
                text: 'Sản phẩm đã quá số lượng còn lại'   
						  })
      }
    const onDeleteOne=async (e)=>{
      await DeleteOneItem({
        productId:Cart_show.value[e].product.id,
        quantity:Cart_show.value[e].quantity
      })
      Cart_show.value.splice(e,1)
      store.dispatch("UpdateTotalCart")
    }
      onBeforeMount( async()=>{
            try{
                mycart.value=await GetCart()
                mycart.value.items.forEach(async (item)=>{
                  Cart_show.value.push({product: await GetProductbyId(item.productId),quantity:item.quantity})
                })
            }
            catch(error){
                if(error.response&&error.response.status==401){
                    store.dispatch('Logout')
                }
            }
        })
    return{Cart_show,backendhost,ToVND,onDeleteOne,onDecrease,onIncrease,onDeleteAll,selected_item}
    }

}
</script>

<style scoped>
.list-cart input{
    -webkit-appearance: none;
    appearance: none;
}
.list-cart input:focus{
    border: none;
    background-color: #fff;
    outline: none;
}
.input-custom{
    background: #F5F8FD;
    color: #929EAD;
    border: 0;
    font-size: 14px!important;
    font-weight: 455;
    line-height: normal;
}
</style>../../modules/home/ClientAction.js../../modules/home/HomeAPI.js