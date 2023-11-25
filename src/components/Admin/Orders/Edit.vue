<template>
  <div :class="'modal-backdrop pt-5 model-show'">
    <div class="modal-dialog" style="min-width: 700px">
      <div class="modal-content rounded-4">
        <div class="modal-header">
          <h5 class="modal-title text-blue">Cập nhật mã giảm giá</h5>

          <button @click="closeThis" type="button" class="btn-close"></button>
        </div>

        <form>
          <div class="modal-body">
            <div class="row mb-2">
              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Mã giảm giá</label>

                  <input v-model="voucher.code" type="text" class="form-control" placeholder="CODE1229" />
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Loại giảm giá</label>

                  <select @change="ValidatePercent" v-model="voucher.isValue" class="form-select">
                    <option :value="false">Theo phần trăm</option>

                    <option :value="true">Giảm trực tiếp</option>
                  </select>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Giá trị</label>

                  <input @change="ValidatePercent" v-model="voucher.value" type="number" class="form-control"
                    placeholder="Nhập giá trị" />
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Áp dụng đơn hàng tối thiểu từ (vnđ)</label>

                  <input v-model="voucher.minApply" class="form-control d-inline" type="number" />
                </div>
              </div>

              <div v-if="!voucher.isValue" class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Giảm tối đa (vnđ)</label>

                  <input v-model="voucher.maxReduce" class="form-control d-inline" type="number" />
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Ngày bắt đầu có hiệu lực</label>

                  <input v-model="voucher.startAt" class="form-control" type="datetime-local" step="1" />
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Ngày kết thúc</label>

                  <input v-model="voucher.endAt" class="form-control" type="datetime-local" step="1" />
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-label">Số lượng </label>

                  <input v-model="voucher.quantity" class="form-control" type="number" />
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
                    <option :value="false">Chưa kích hoạt</option>

                    <option :value="true">Kích hoạt</option>
                  </select>
                </div>
              </div>

              <div v-if="onlyProducts" class="col">
                <div class="form-group">
                  <label for="" class="form-label">Sản phẩm áp dụng:</label>

                  <textarea v-model="listproducts" class="form-control"
                    placeholder="Nếu có nhiều sản phẩm thì ngăn cách các id sản phẩm bởi dấu ;"></textarea>
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
import { computed, reactive, ref } from "vue";
import { Edit } from "../../../modules/admin/Voucher_Manager.js";

export default {
  props: {
    Voucher: {
      require: true,
    },
  },
  setup(props, { emit }) {
    console.log(props.Voucher);
    const voucher = reactive(props.Voucher);
    console.log(voucher);
    const result = ref();
    const onlyProducts = ref(false);
    const listproducts = ref("");
    const closeThis = () => emit("CloseEdit");
    //đổi định dạng để hiển thị trên select
    voucher.startAt = new Date(voucher.startAt).toISOString().slice(0, 16);
    voucher.endAt = new Date(voucher.endAt).toISOString().slice(0, 16);
    const ValidatePercent = () => {
      console.log(voucher.isValue);
      if (!voucher.isValue && voucher.value > 100) voucher.value = 0;
    };
    async function onSubmit() {
    //đổi định dạng ngày tháng để gửi request
      voucher.startAt = new Date(voucher.startAt).toISOString();
      voucher.endAt = new Date(voucher.endAt).toISOString();
      voucher.createAt = new Date(voucher.createAt).toISOString();
      if (listproducts.value.trim().length > 23)
        voucher.products = listproducts.value.split("\n");
      result.value = await Edit(voucher);
      //dữ liệu chưa valid hoặc lỗi trả từ bên server hoặc mất mạng :)))
      if (!result.value.success) {
        emit("Reload");
        Swal.fire({
          icon: "warning",
          title: result.value.data,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Thành công",
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
