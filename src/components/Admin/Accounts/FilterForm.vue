<template>
    <div class="d-flex flex-column col ms-lg-3 ">
      <div class="card">

        <div class=" mb-2 mt-2 mx-2" 
        @click="isOpenFilter=!isOpenFilter">
                  <input
                    v-model="filterobj.keywords"
                    @input="Search"
                    class="rounded-2 form-control px-3"
                    type="text"
                    placeholder="Nhập từ khoá"
                  />
            </div>

            <div class="form-control border-0">
              <strong class="form-label">Loại tài khoản</strong>
                    <select class="form-select" >
                        <option selected>Chọn loại tài khoản</option>
                        <option value="0">Tài khoản bị hạn chế</option>
                        <option value="1">Tài khoản thành viên vẫn hoạt động</option>
                        <option value="2">Tài khoản quản trị viên</option>
                      </select>
                    </div>
                <div class="form-control border-0">
                    <strong class="form-label">Giới tính</strong>
                    <select class="form-select" >
                        <option selected>Chọn giới tính</option>
                    </select>
                </div>
                <div class="form-control border-0">
                  <strong class="form-label d-block">Thời gian khởi tạo tài khoản</strong>
                  <div class="d-flex justify-content-center align-content-center">

                    <input type="date" >
                    <span class="mx-2">đến</span>
                    <input type="date" >
                  </div>
              </div>
                
           
            <div class="d-flex justify-content-center gap-3">
              <button class="btn btn-success mt-2 px-4">Xác nhận</button>
              <button class="btn btn-danger mt-2 px-4"> Đóng</button>
            </div>
      </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
setup(){
    const isOpenFilter=ref(true)
        const filterobj = reactive({
            keywords: ''

        })
    return {isOpenFilter,filterobj}
}
}
</script>

<style>

</style>