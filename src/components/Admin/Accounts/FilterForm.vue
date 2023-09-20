<template>
  <div class="d-flex flex-column col ms-lg-3 ">
    <div class="card">
      <div class=" mb-2 mt-2 mx-2">
        <input v-model="filterobj.keywords" @input="Search" class="rounded-2 form-control px-3" type="text"
          @click="isOpenFilter=true" placeholder="Nhập từ khoá" />
        <Transition>
          <div class="" v-show="isOpenFilter">

            <div class="mt-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" value="username"
                  :checked="filterobj.seach_type=='username'" v-model="filterobj.seach_type">
                <label class="form-check-label">
                  Tìm theo tên tài khoản
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" value="fullname" v-model="filterobj.seach_type">
                <label class="form-check-label">
                  Tìm theo họ tên
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" value="email" v-model="filterobj.seach_type">
                <label class="form-check-label">
                  Tìm theo email
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" value="address" v-model="filterobj.seach_type">
                <label class="form-check-label">
                  Tìm theo địa chỉ
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" value="phone" v-model="filterobj.seach_type">
                <label class="form-check-label">
                  Tìm theo số điện thoại
                </label>
              </div>
            </div>


            <div class="form-control border-0">
              <strong class="form-label">Loại tài khoản</strong>
              <select class="form-select" v-model="filterobj.role">
                <option value="" >Tất cả loại tài khoản</option>
                <option :value="0">Tài khoản bị hạn chế</option>
                <option :value="1">Tài khoản thành viên vẫn hoạt động</option>
                <option :value="2">Tài khoản quản trị viên</option>
              </select>
            </div>
            <div class="form-control border-0">
              <strong class="form-label">Giới tính</strong>
              <select class="form-select" v-model="filterobj.gender">
                <option value="" >Nam và Nữ</option>
                <option :value="true">Nam</option>
                <option :value="false">Nữ</option>
              </select>
            </div>
            <div class="form-control border-0">
              <strong class="form-label d-block">Thời gian khởi tạo tài khoản</strong>
              <div class="d-flex justify-content-center align-content-center">

                <input @change="dateValidate" type="date" v-model="filterobj.startDate">
                <span class="mx-2">đến</span>
                <input type="date" v-model="filterobj.endDate" @change="dateValidate">
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
        seach_type: 'username',
        role: '',
        gender: '',
        startDate: '',
        endDate: ''

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