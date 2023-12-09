<template>
  <main class="position-relative">
    <div class="container px-0">
      <h3 class="text-blue fw-bold">Đơn hàng của tôi</h3>
      <div style="height: 100%; min-height: 100vh" class="px-lg-3">
        <div v-if="Cart_show.length > 0">
          <!-- Địa chỉ nhận hàng -->
          <section>
            <select-shipping-address ref="select_address" />
          </section>
          <ol class="list-unstyled col-12 py-4">
            <li
              v-for="item in Cart_show"
              :key="item.product.id"
              class="px-2 d-flex justify-content-between row py-2 border-top border-bottom bg-white mb-2"
            >
              <!-- Sản phẩm -->
              <div class="d-flex col-xl-5 col-md-6">
                <!-- ảnh -->
                <div class="align-middle white-space-nowrap py-0 me-3">
                  <a class="d-block rounded-2 border">
                    <img
                      :src="
                        backendhost +
                        '/images/products/' +
                        item.product.images[0]
                      "
                      alt=""
                      width="53"
                    />
                  </a>
                </div>
                <!-- tên sản phẩm -->
                <div
                  class="align-middle white-space-nowrap align-self-center ms-2"
                >
                  <span class="fw-bold">{{ item.product.productName }}</span>
                </div>
              </div>
              <!-- Giá sản phẩm-->
              <div
                class="align-middle white-space-nowrap align-self-center col-xl-2 col-md-3 justify-content-start mt-2 mt-lg-0"
              >
                <span class="fs-6">{{ ToVND(item.product.price) }}</span>
                <strong class="d-block text-red text-decoration-line-through">
                  {{ ToVND(item.product.maxPrice) }}
                </strong>
              </div>
              <!-- Số lượng-->
              <div
                class="align-middle white-space-nowrap align-self-center col justify-content-start col-xl-3"
              >
                <span
                  type="number"
                  class="text-center border-0 my-0 py-0"
                  style="max-width: 40px"
                >
                  SL: {{ item.quantity }}
                </span>
              </div>
            </li>
          </ol>
          <!-- Mã giảm giá -->
          <section class="d-flex justify-content-end">
            <div class="d-md-flex justify-content-end">
              <h4 class="text-red fs-5 mt-2 me-2 no-wrap">
                <strong>Mã giảm giá</strong>
                <span class="text-dark fs-6 inherit ms-2">(Nếu có)</span>
              </h4>
              <input
                v-model="voucherCode"
                type="text"
                class="py-1 border-1 text-muted fw-bolder fs-6 col col-md-8"
              />
            </div>
          </section>
          <!-- Phương thức thanh toán -->
          <section>
            <h4 class="fw-bold fs-5 text-red">Phương thức thanh toán</h4>
            <div class="row gap-2">
              <div
                @click="selected_method = null"
                :class="{
                  'card  col-12 col-md-5 col-xl-3 text-center': true,
                  selected: selected_method == null,
                }"
              >
                <div class="p-4">
                  <strong>Thanh toán khi nhận hàng</strong>
                </div>
              </div>
              <div
                v-for="item in payment_method"
                :key="item.id"
                @click="selected_method = item"
                :class="{
                  'card  col-12 col-md-5 col-xl-3 text-center': true,
                  selected: selected_method == item,
                }"
              >
                <div class="p-4">
                  <strong>{{ item.name }}</strong>
                </div>
              </div>
            </div>
          </section>
          <!-- Thông tin kiểm tra đơn hàng -->
          <section v-if="Order_checkout.ischeckout" class="mt-3 d-flex justify-content-end ">
            <div class="col-12 col-md-8 col-xl-6 bg-white px-3 px-lg-5">
              <div class=" d-flex align-items-center">
                <strong class="text-muted col-6 text-end">Giá trị đơn hàng: </strong>
                <strong class="text-black fs-6 col-6 ms-2 text-end"> {{ Order_checkout.total }}</strong>
              </div>
              <div class=" d-flex align-items-center">
                <strong class="text-muted col-6 text-end">Khấu trừ mã giảm giá: </strong>
                <span class="text-danger fw-bold fs-6 col-6 ms-2 text-end">{{ Order_checkout.discount}}</span>
              </div>
              <div class=" d-flex align-items-center">
                <strong class="text-muted col-6 text-end fw-bold">Số tiền phải thanh toán: </strong>
                <strong class="text-blue col-6 fs-6 ms-2 text-end">{{ Order_checkout.paid }}</strong>
              </div>

            </div>

          </section>
          <div class="d-flex justify-content-end gap-2 mt-2">
            <button @click="onCheck" class="btn btn-danger bg-red px-4">
              Kiểm tra
            </button>
            <button @click="onSubmit" v-if="Order_checkout.ischeckout" class="btn btn-success bg-blue px-4">
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {onBeforeMount, reactive, ref, watch} from "vue"
import {GetPaymentMethod,CheckOut,CreateOrder,DeleteOneItem} from "../../modules/home/HomeAPI.js"
import {useStore} from "vuex"
import SelectShippingAddress from "../../components/home/Checkout/SelectShippingAddress.vue"
import { useRouter } from 'vue-router'
export default {
  components: {
    SelectShippingAddress,
  },
  setup() {
    const store = useStore()
    const router=useRouter()
    const Cart_show = ref([])
    const backendhost = ref(backendHost)
    const selected_item = ref([])
    const select_address = ref()
    const payment_method = ref([])
    const selected_method = ref(null)
    const voucherCode = ref("")
    const Order_checkout=reactive({
      ischeckout:false,
      total:null,
      paid:null,
      discount:0
    })
    const ToVND = (e) => {
      return e.toLocaleString("it-IT", {style: "currency", currency: "VND"})
    }
    const onCheck =async () => {
      try{
        const result= await CheckOut({
            paymentMethod:selected_method.value,
            items:Cart_show.value,
            shippingAddress:select_address.value.picked_address,
            voucher:voucherCode.value.trim()!=''?{code:voucherCode.value}:null
          })
        Order_checkout.total= ToVND(result.total)
        Order_checkout.paid= ToVND(result.paid)
        Order_checkout.discount=ToVND(result.total-result.paid)
        Order_checkout.ischeckout=true
      }
      catch(error){
        if(error.response){
          Swal.fire("Lỗi",error.response.data.message,"error")
          return
        }
          Swal.fire("Lỗi","something went wrong","error")
      } 
    }
    const onSubmit= async()=>{
      try{
        await CreateOrder({ 
              paymentMethod:selected_method.value,
              items:Cart_show.value,
              shippingAddress:select_address.value.picked_address,
              voucher:voucherCode.value.trim()!=''?{code:voucherCode.value}:null
        })
        Swal.fire("Đặt hàng thành công","","success")
        //Xoá giỏ hàng các sản phẩm đã đặt
        Cart_show.value.forEach(async item=>{
         await DeleteOneItem({
          productId:item.product.id,
          quantity:item.quantity
        })
        })
        //về trang quản lý đơn hàng
        store.dispatch("UpdateTotalCart")
        router.push('/tai-khoan/don-hang')
      }
      catch(error){
        if(error.response){
          Swal.fire("Lỗi",error.response.data.message,"error")
          return
        }
          Swal.fire("Lỗi","something went wrong","error")
      } 
    }
    onBeforeMount(async () => {
      try {
        payment_method.value = await GetPaymentMethod()
        payment_method.value = payment_method.value.filter(
          (value) => value.name.toLowerCase() != "thanh toán khi nhận hàng"
        )
        Cart_show.value = store.state.user.items_checkout
      } catch (error) {
        if (error.response && error.response.status == 401) {
          store.dispatch("Logout")
        }
      }
    })
    watch(voucherCode, () =>Order_checkout.ischeckout=false)
    return {
      Cart_show,
      backendhost,
      ToVND,
      selected_item,
      select_address,
      onCheck,
      payment_method,
      selected_method,
      voucherCode,
      Order_checkout,
      onSubmit
    }
  },
}
</script>

<style scoped>
.list-cart input {
  -webkit-appearance: none;
  appearance: none;
}
.list-cart input:focus {
  border: none;
  background-color: #fff;
  outline: none;
}
.input-custom {
  background: #f5f8fd;
  color: #929ead;
  border: 0;
  font-size: 14px !important;
  font-weight: 455;
  line-height: normal;
}
.selected {
  border: 3px solid rgb(12, 55, 225);
}
</style>
../../modules/home/ClientAction.js../../modules/home/HomeAPI.js
