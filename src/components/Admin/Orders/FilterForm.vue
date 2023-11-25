<template>
  <div class="d-flex flex-column col ms-lg-3 ">
    <div class="card">
      <div class=" mb-2 mt-2 mx-2">
        <input v-model="filterobj.accountid" @input="Search" class="rounded-2 form-control px-3" type="text"
          @click="isOpenFilter=true" placeholder="Nhập id tài khoản" />
        <Transition>
          <div class="" v-show="isOpenFilter">
            <div class="form-control border-0">
              <strong class="form-label">Trạng thái thanh toán</strong>
              <select class="form-select" v-model="filterobj.isPaid">
                <option value="" >Tất cả</option>
                <option :value="true">Đã thanh toán</option>
                <option :value="false">Chưa thanh toán</option>
              </select>
            </div>
            <div class="form-control border-0">
              <strong class="form-label">Trạng thái đơn hàng</strong>
              <select class="form-select" v-model="filterobj.status">
                <option value="" >Tất cả</option>
                <option :value="1">Đơn hàng đang chờ xác nhận</option>
                <option :value="2">Đơn hàng đã xác nhận</option>
                <option :value="3">Đơn hàng đã hoàn thành</option>
                <option :value="0">Đơn hàng đã huỷ</option>
              </select>
            </div>
            <div class="form-control border-0">
              <strong class="form-label d-block">Giá trị đơn hàng</strong>
              <div class="d-flex justify-content-center align-content-center">
                <input @keyup="onlyNumber" type="text" v-model="filterobj.minPaid">
                <span class="mx-2">đến</span>
                <input  @keyup="onSubmit" type="text" v-model="filterobj.maxPaid">
              </div>
            </div>
            <div class="form-control border-0">
              <strong class="form-label d-block">Thời gian đặt hàng</strong>
              <div class="d-flex justify-content-center align-content-center">

                <input @change="dateValidate" type="date" v-model="filterobj.startdate">
                <span class="mx-2">đến</span>
                <input type="date" v-model="filterobj.enddate" @change="dateValidate">
              </div>
            </div>
            <div class="d-flex justify-content-center gap-3">
              <button @click="onCancel" class="btn btn-primary mt-2 px-4">Huỷ lọc</button>
              <button @click="onSubmit" class="btn btn-success mt-2 px-4">Xác nhận</button>
              
              <button @click="isOpenFilter=false" class="btn btn-danger mt-2 px-4"> Đóng</button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
  import { reactive, ref } from 'vue'
  export default {
    setup(_,{emit}) {
      const isOpenFilter = ref(false)
      const filterobj = reactive({
        accountid: '',
        status:'',
        isPaid:'',
        paymentId:'',
        minPaid:'',
        maxPaid:'',
        startdate: '',
        enddate: '',
      })

      const onlyNumber=(e)=>{
      if (!e.target.value.match(/^\d+$/))e.target.value = "";
    }
      const onSubmit=() =>emit("filData",filterobj)
      const onCancel=()=>emit("CancelFil")
      function dateValidate() {
        let currentdate = new Date().toISOString().slice(0, 10);
        if (filterobj.startdate != null && filterobj.enddate > currentdate) {
          Swal.fire(
            {
              icon: 'error',
              title: 'Vui lòng chọn lại',
              text: 'Ngày bắt đầu không được lớn hơn ngày kết thúc'
            }
          )
          filterobj.startdate = ''
          return
        }
        if (filterobj.startdate != '' && filterobj.enddate != '' && new Date(filterobj.startdate) > new Date(filterobj.enddate)) {
          Swal.fire(
            {
              icon: 'error',
              title: 'Vui lòng chọn lại ngày',
              text: 'Ngày kết thúc không được trước ngày bắt đầu'
            }
          )
          filterobj.enddate = ''
        }
      }
      return { isOpenFilter, filterobj,onlyNumber, onSubmit, dateValidate,onCancel }
    }
  }
</script>

<style>

</style>