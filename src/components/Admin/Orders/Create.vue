<template>
  <div :class="'modal-backdrop pt-5 model-show'">
    <div class="modal-dialog" style="min-width: 700px">
      <div class="modal-content rounded-4">
        <div class="modal-header">
          <h5 class="modal-title text-blue">Tạo đơn hàng mới</h5>
          <button @click="closeThis" type="button" class="btn-close"></button>
        </div>
        <form>
          <div class="modal-body">
            <div class="row mb-2">
              <product-select></product-select>
              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Mã giảm giá (nếu có)</label>
                  <input
                    v-model="order.voucher.code"
                    type="text"
                    class="form-control"
                    placeholder="CODE1229"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Địa chỉ nhận hàng</label>
                  <input
                    v-model="order.shippingAddress.address"
                    type="text"
                    class="form-control"
                    placeholder="nhập địa chỉ"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Họ tên khách hàng </label>
                  <input
                    v-model="order.shippingAddress.fullname"
                    type="text"
                    class="form-control"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
              </div>
              <div class="col-lg-6 align-self-center">
                <div class="form-check">
                  <label class="form-label ">Đã thanh toán</label>
                  <input
                    v-model="order.isPaid"
                    type="checkbox"
                   :value="true"
                   class="form-check-input"
                  />
                </div>
              </div>
             
            </div>
          </div>
        </form>

        <div class="modal-footer">
          <button @click="closeThis" type="button" class="btn btn-secondary">
            Huỷ
          </button>

          <button @click="onSubmit" type="button" class="btn btn-primary">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Order from "../../../model/Order.js";
import { reactive, ref } from "vue";
import {  } from "../../../modules/admin/Order_Manager.js";
import ProductSelect from "./ProductSelect.vue";

export default {
  components:{
    ProductSelect
  },
  setup(props, { emit }) {
    const order = reactive(new Order());
    const result = ref();
    const closeThis = () => emit("closeAdd");

  
    async function onSubmit() {
     
     // result.value = await Add(voucher);
      //dữ liệu chưa valid hoặc lỗi trả từ bên server hoặc mất mạng :)))
      if (!result.value.success)
        Swal.fire({
          icon: "warning",
          title: result.value.data,
        });
      else {
        Swal.fire({
          icon: "success",
          title: "Thêm thành công",
        });
      }
    }
    return {
      order,
      onSubmit,
      closeThis,
    };
  },
};
</script>

<style></style>
