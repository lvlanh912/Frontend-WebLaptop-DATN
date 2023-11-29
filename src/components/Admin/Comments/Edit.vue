<template>
  <div :class="'modal-backdrop pt-3 model-show'">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header justify-content-end border-bottom-0">
          <div class="col-12 text-center">
            <h5 class="text-blue">CHỈNH SỬA THÔNG TIN</h5>
          </div>
          <button @click="closeThis" type="button" class="btn-close m-0"></button>
        </div>
        <div class="modal-body pt-0">
          <div class="row no-gutters">
            <div class="col-md-6">
              <div class="d-flex flex-column justify-content-center align-content-center">
                <p class="text-darker pt-2 mb-0">Chất lượng</p>
                <select class="form-control" v-model="comment_payload.star">
                  <option :value="1">1</option>
                  <option :value="2"> 2</option>
                  <option :value="3"> 3</option>
                  <option :value="4"> 4</option>
                  <option :value="5"> 5</option>
                </select>
                
              </div>
            </div>
            <div class="col col-md-6">
              <div class=" d-flex flex-column justify-content-center align-content-center">
                <p class="text-darker pt-2 mb-0">Nội dung</p>
                <input class="form-control" v-model="comment_payload.conntent" type="text" />
              </div>
            </div>
              <div class=" col-12 pt-4 d-flex justify-content-end">
                <button @click="closeThis" class="btn btn-danger px-2 me-2">
                  <strong>Huỷ</strong>
                </button>
                <button @click="onSave" class="btn btn-success px-4">
                  <strong>Lưu lại</strong>
                </button>
              </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {  reactive } from "vue";
import { Edit } from "../../../modules/admin/Comment_Manager.js";
export default {
  props: {
    comment: {
      required: true
    },
  },
  setup(props, { emit }) {
  const comment_payload = reactive(props.comment);
    const closeThis = () => {
      emit("reload")
      emit("closeEdit");
     
    }
    const onSave = async () => {
      try {
        await Edit(comment_payload);
        Swal.fire({
          icon: "success",
          title: "Thành công",
        });
        closeThis()
      } catch (err) {
        emit("reload")
        Swal.fire({
          icon: "error",
          title: "Thất Bại",
          text: err.response.data.message ?? err.message,
        });
      }
    };
    return {  closeThis, comment_payload, onSave };
  },
};
</script>

<style scoped>
.modal-backdrop {
  background-color: #0000005b;
}

.model-show {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
