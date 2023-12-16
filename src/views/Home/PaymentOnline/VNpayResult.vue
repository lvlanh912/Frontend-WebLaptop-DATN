<template>
<main class="">
  <div class="position-relative p-4 d-flex justify-content-center" style="min-height:100vh">
    <div class="position-absolute shadow col-12 col-md-8 col-lg-6" style="top:10%;">
      <div class="card w-100">
        <div class="card-header border-0 border-bottom bg-white">
          <h4 class=" my-2 d-flex justify-content-center align-content-center">
            <svg viewBox="0 0 24 24" width="50px"  fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.3399 14.49L18.3399 12.83C18.1299 12.46 17.9399 11.76 17.9399 11.35V8.82C17.9399 6.47 16.5599 4.44 14.5699 3.49C14.0499 2.57 13.0899 2 11.9899 2C10.8999 2 9.91994 2.59 9.39994 3.52C7.44994 4.49 6.09994 6.5 6.09994 8.82V11.35C6.09994 11.76 5.90994 12.46 5.69994 12.82L4.68994 14.49C4.28994 15.16 4.19994 15.9 4.44994 16.58C4.68994 17.25 5.25994 17.77 5.99994 18.02C7.93994 18.68 9.97994 19 12.0199 19C14.0599 19 16.0999 18.68 18.0399 18.03C18.7399 17.8 19.2799 17.27 19.5399 16.58C19.7999 15.89 19.7299 15.13 19.3399 14.49Z" fill="#ff7b00"></path> <path d="M14.8297 20.01C14.4097 21.17 13.2997 22 11.9997 22C11.2097 22 10.4297 21.68 9.87969 21.11C9.55969 20.81 9.31969 20.41 9.17969 20C9.30969 20.02 9.43969 20.03 9.57969 20.05C9.80969 20.08 10.0497 20.11 10.2897 20.13C10.8597 20.18 11.4397 20.21 12.0197 20.21C12.5897 20.21 13.1597 20.18 13.7197 20.13C13.9297 20.11 14.1397 20.1 14.3397 20.07C14.4997 20.05 14.6597 20.03 14.8297 20.01Z" fill="#ff7b00"></path> </g></svg>            
            <span class="fw-bold align-self-center">Thông báo</span>
            <svg viewBox="0 0 24 24" width="50px"  fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.3399 14.49L18.3399 12.83C18.1299 12.46 17.9399 11.76 17.9399 11.35V8.82C17.9399 6.47 16.5599 4.44 14.5699 3.49C14.0499 2.57 13.0899 2 11.9899 2C10.8999 2 9.91994 2.59 9.39994 3.52C7.44994 4.49 6.09994 6.5 6.09994 8.82V11.35C6.09994 11.76 5.90994 12.46 5.69994 12.82L4.68994 14.49C4.28994 15.16 4.19994 15.9 4.44994 16.58C4.68994 17.25 5.25994 17.77 5.99994 18.02C7.93994 18.68 9.97994 19 12.0199 19C14.0599 19 16.0999 18.68 18.0399 18.03C18.7399 17.8 19.2799 17.27 19.5399 16.58C19.7999 15.89 19.7299 15.13 19.3399 14.49Z" fill="#ff7b00"></path> <path d="M14.8297 20.01C14.4097 21.17 13.2997 22 11.9997 22C11.2097 22 10.4297 21.68 9.87969 21.11C9.55969 20.81 9.31969 20.41 9.17969 20C9.30969 20.02 9.43969 20.03 9.57969 20.05C9.80969 20.08 10.0497 20.11 10.2897 20.13C10.8597 20.18 11.4397 20.21 12.0197 20.21C12.5897 20.21 13.1597 20.18 13.7197 20.13C13.9297 20.11 14.1397 20.1 14.3397 20.07C14.4997 20.05 14.6597 20.03 14.8297 20.01Z" fill="#ff7b00"></path> </g></svg>            
          </h4>
          </div>
       
        <div class="card-body py-2">
          <div class="row py-3">
              <div :class="{'col-12 text-center fw-bold':true,'text-success':!isFailed,'text-danger':isFailed}">{{ message }}</div>
          </div>
          <div class="row  my-2">
            <div class="col-6 text-end">Số tiền thanh toán</div>
            <div class="col-6">
              <span class="fw-bold text-blue">: {{ Amount }}</span>
            </div>
          </div>
          <div class="row  my-2">
            <div class="col-6 text-end">Thời gian thanh toán</div>
            <div class="col-6">
              <span class="fw-bold text-blue">: {{ Paydate }}</span>
            </div>
          </div>
          <div class="row  my-2 mt-5 py-3">
            <div class="col-12 text-center">Quay về trang chủ sau {{number}} giây</div>
          </div>
          <div class="row">
            <router-link class="col-12 d-flex justify-content-center text-decoration-none align-self-center" :to="{name:'home'}">
              <i class="bi bi-house-fill me-2 fw-semibold text-red fs-4"></i>
             <span class="align-self-center fw-bold"> Về trang chủ</span>
              </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

</main>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import {CheckVNPayPayment} from '../../../modules/home/HomeAPI.js'
import { useRouter } from 'vue-router'
export default {
  props: [
    "vnp_Amount",
    "vnp_BankCode",
    "vnp_BankTranNo",
    "vnp_CardType",
    "vnp_OrderInfo",
    "vnp_PayDate",
    "vnp_ResponseCode",
    "vnp_SecureHash",
    "vnp_TmnCode",
    "vnp_TransactionNo",
    "vnp_TransactionStatus",
    "vnp_TxnRef"
  ],
  setup(props) {
    const number=ref(7)
    const message=ref('')
    const router=useRouter()
    const isFailed=computed(()=>{
      return message.value.toLowerCase().match("không thành công")
    })
    const Amount=computed(()=>{
      return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(props.vnp_Amount/100)    
      })
    const Paydate=computed(()=>{
      const year = parseInt(props.vnp_PayDate.substring(0, 4), 10);
      const month = parseInt(props.vnp_PayDate.substring(4, 6), 10) - 1;
      const day = parseInt(props.vnp_PayDate.substring(6, 8), 10);
       return 'Ngày '+day+'/'+month+'/'+year
    })
      onMounted(async ()=>{
        const payload=props
        interval
        try{
          message.value = await CheckVNPayPayment(payload)
        }
        catch{
          message.value='Lỗi'
        }

      })
      const interval= setInterval(() => {
          --number.value
        }, 1000);
    watch(number,(value)=>{
      if(value==0){
        clearInterval(interval)
        router.push('/')
      }
      
    })
        
    
    return {message,Amount,Paydate,number,isFailed}
  }
}
</script>

<style></style>
