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
                <p class="text-darker pt-2 mb-0">Tên phương thức thanh toán</p>
                <input class="form-control" v-model="payment_payload.name" type="text" />
              </div>
            </div>
            <div class="col col-md-6">
              <div class=" d-flex flex-column justify-content-center align-content-center">
                <p class="text-darker pt-2 mb-0">trạng thái</p>
                <select class="form-control" v-model="payment_payload.active">
                  <option :value="true">Kích hoạt</option>
                  <option :value="false"> không Kích hoạt</option>
                </select>
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
import { Edit } from "../../../modules/admin/Payment_Manager";
export default {
  props: {
    payment: {
      required: true
    },
  },
  setup(props, { emit }) {
  const payment_payload = reactive((props.payment));
    const closeThis = () => {
      emit("closeEdit");
      emit("reload")
    }
    const onSave = async () => {
      try {
        await Edit(payment_payload);
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
    return {  closeThis, payment_payload, onSave };
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
