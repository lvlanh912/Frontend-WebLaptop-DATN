<template>
  <div class="d-flex flex-column col ms-lg-3 ">
    <div class="card">
      <div class=" mb-2 mt-2 mx-2">
        <input v-model="filterobj.keywords" @input="Search" class="rounded-2 form-control px-3" type="text"
          @click="isOpenFilter=true" placeholder="Nhập từ khoá" />
        <Transition>
          <div class="" v-show="isOpenFilter">
            <div class="form-control border-0">
              <strong class="form-label d-block">Tài khoản đánh giá</strong>
              <div class="d-flex justify-content-center align-content-center">
                <input class="form-control" type="text" v-model="filterobj.accountid" placeholder="Nhập Id tài khoản">
              </div>
            </div>
            <div class="form-control border-0">
              <strong class="form-label d-block">Sản phẩm</strong>
              <div class="d-flex justify-content-center align-content-center">
                <input class="form-control" type="text" v-model="filterobj.productId" placeholder="Nhập Id sản phẩm">
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
        keywords: '',
        productId: '',
        accountid: ''
      })
      function onSubmit() {
        emit("filData",filterobj)
      }
      function onCancel() {
        emit("CancelFil")
      }
      function dateValidate() {
        let currentdate = new Date().toISOString().slice(0, 10);
        if (filterobj.startDate != null && filterobj.startDate > currentdate) {
          Swal.fire(
            {
              icon: 'error',
              title: 'Vui lòng chọn lại',
              text: 'Ngày bắt đầu không được lớn hơn ngày bắt đầu'
            }
          )
          filterobj.startDate = ''
          return
        }
        if (filterobj.startDate != '' && filterobj.endDate != '' && new Date(filterobj.startDate) > new Date(filterobj.endDate)) {
          Swal.fire(
            {
              icon: 'error',
              title: 'Vui lòng chọn lại ngày',
              text: 'Ngày kết thúc không được trước ngày bắt đầu'
            }
          )
          filterobj.endDate = ''
        }
      }
      return { isOpenFilter, filterobj, onSubmit, dateValidate,onCancel }
    }
  }
</script>

<style>

</style>