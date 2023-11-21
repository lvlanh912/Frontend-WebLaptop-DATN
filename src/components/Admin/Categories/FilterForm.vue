<template>
  <div class="d-flex flex-column col ms-lg-3 ">
    <div class="card">
      <div class=" mb-2 mt-2 mx-2">
        <input v-model="filterobj.keywords" @input="Search" class="rounded-2 form-control px-3" type="text"
          @click="isOpenFilter=true" placeholder="Nhập từ khoá" />
        <Transition>
          <div class="" v-show="isOpenFilter">
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
        keywords: ''
      })
      function onSubmit() {
        emit("filData",filterobj)
      }
      function onCancel() {
        emit("CancelFil")
      }
    
      return { isOpenFilter, filterobj, onSubmit,onCancel }
    }
  }
</script>

<style>

</style>