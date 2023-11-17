<template>
  <div :class="'modal-backdrop pt-5 model-show'">
    <div class="modal-dialog" style="min-width: 700px">
      <div class="modal-content rounded-4">
        <div class="modal-header">
          <h5 class="modal-title text-blue">Tạo mã giảm giá mới</h5>

          <button @click="closeThis" type="button" class="btn-close"></button>
        </div>

        <form>
          <div class="modal-body">
            <div class="row mb-2">
              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Mã giảm giá</label>

                  <input
                    v-model="voucher.code"
                    type="text"
                    class="form-control"
                    placeholder="CODE1229"
                  />
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Loại giảm giá</label>

                  <select
                    @change="ValidatePercent"
                    class="form-select"
                    v-model="voucher.isValue"
                  >
                    <option :value="false">Theo phần trăm</option>

                    <option :value="true">Giảm trực tiếp</option>
                  </select>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Giá trị</label>

                  <input
                    @change="ValidatePercent"
                    v-model="voucher.value"
                    type="number"
                    class="form-control"
                    placeholder="Nhập giá trị"
                  />
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label"
                    >Áp dụng đơn hàng tối thiểu từ (vnđ)</label
                  >
                  <input
                    v-model="voucher.minApply"
                    class="form-control d-inline"
                    type="number"
                  />
                </div>
              </div>

              <div v-if="!voucher.isValue" class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Giảm tối đa (vnđ)</label>

                  <input
                    v-model="voucher.maxReduce"
                    class="form-control d-inline"
                    type="number"
                  />
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Ngày bắt đầu có hiệu lực</label>

                  <input
                    v-model="voucher.startAt"
                    class="form-control"
                    type="datetime-local"
                    step="1"
                  />
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Ngày kết thúc</label>

                  <input
                    v-model="voucher.endAt"
                    class="form-control"
                    type="datetime-local"
                    step="1"
                  />
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Số lượng </label>

                  <input
                    v-model="voucher.quantity"
                    class="form-control"
                    type="number"
                  />
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Hiệu lực với </label>

                  <select class="form-select" v-model="onlyProducts">
                    <option :value="false">Toàn bộ sản phẩm</option>

                    <option :value="true">Sản phẩm cố định</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Trạng thái</label>
                  <select class="form-select" v-model="voucher.active">
                    <option :value="null">Chưa kích hoạt</option>
                    <option :value="true">Kích hoạt</option>
                  </select>
                </div>
              </div>

              <div v-if="onlyProducts" class="col">
                <div class="form-group">
                  <label for="" class="form-label">Sản phẩm áp dụng:</label>
                  <textarea
                    v-model="listproducts"
                    class="form-control"
                    placeholder="Nếu có nhiều sản phẩm thì ngăn cách các id sản phẩm bởi dấu ;"
                  ></textarea>
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
import Voucher from "../../../model/Voucher.js";
import { reactive, ref } from "vue";
import { Add } from "../../../modules/admin/Voucher_Manager.js";

export default {
  setup(props, { emit }) {
    const voucher = reactive(new Voucher());
    const result = ref();
    const onlyProducts=ref(false)
    const listproducts = ref("");
    const closeThis = () => emit("closeAdd");

    const ValidatePercent = () => {
      console.log(voucher.isValue);
      if (!voucher.isValue && voucher.value > 100) voucher.value = 0;
    };
    async function onSubmit() {
      if(listproducts.value.trim().length>23)
        voucher.products = listproducts.value.split("\n");
      result.value = await Add(voucher);
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
      voucher,
      onlyProducts,
      listproducts,
      ValidatePercent,
      onSubmit,
      closeThis,
    };
  },
};
</script>

<style></style>
