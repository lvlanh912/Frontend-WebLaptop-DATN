<template>
  <div :class="'modal-backdrop pt-5 model-show'">
    <div class="modal-dialog" style="min-width: 700px">
      <div class="modal-content rounded-4">
        <div class="modal-header">
          <h5 class="modal-title text-blue">Chỉnh sửa mã giảm giá</h5>
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
                  <select class="form-select" v-model="voucher.isValue">
                    <option :value="false">Theo phần trăm</option>
                    <option :value="true">Giảm trực tiếp</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Giá trị</label>
                  <input
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
              <div class="col-lg-6">
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
                    type="datetime"
                    @keydown="changeDate"
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
                    type="datetime"
                    @keydown="changeDate"
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
                  <select class="form-select" v-model="typeApply">
                    <option :value="false">Toàn bộ sản phẩm</option>
                    <option :value="true">Sản phẩm cố định</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="form-floating">
                  <textarea
                  v-model="listproducts"
                    class="form-control"
                    placeholder="Nếu có nhiều sản phẩm thì ngăn cách nhau bởi dấu ;"
                  ></textarea>
                  <label>Sản phẩm áp dụng</label>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div class="modal-footer">
          <button @click="closeThis" type="button" class="btn btn-secondary">
            Huỷ
          </button>
          <button type="button" class="btn btn-primary">Xác nhận</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
export default {
  props: {
    Voucher: {
      require: true,
    },
  },
  setup(props, { emit }) {
    const closeThis = () => emit("CloseEdit");
    const voucher = reactive(props.Voucher);
    const typeApply = ref(voucher.products != null);
    const listproducts=ref(voucher.products!=null?voucher.products.join('\n'):[])
    const changeDate = (e) => {
      if (e.target.value == "") e.target.type = "datetime-local";
    };
    return { closeThis, voucher, typeApply,listproducts, changeDate };
  },
};
</script>

<style></style>
