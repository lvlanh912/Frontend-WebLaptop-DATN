<template>
  <div :class="'modal-backdrop pt-5 model-show'">
    <div class="modal-dialog" style="min-width: 700px">
      <div class="modal-content rounded-4">
        <div class="modal-header">
          <h5 class="modal-title text-blue">Thêm sản phẩm mới</h5>
          <button @click="closeform" type="button" class="btn-close"></button>
        </div>
        <form>
          <div class="modal-body">
            <div class="input-group mb-3 col-12">
              <label class="col-2 align-self-center">Ảnh sản phẩm</label>
              <image-uploader/>
            </div>
            <div class="row mb-2">
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Tên sản phẩm</label>
                  <input v-model="product.productName"  type="tex" class="form-control"  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Giá sản phẩm</label>
                  <input v-model="product.price"  type="tex" class="form-control"  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Giá tối đa</label>
                  <input v-model="product.maxPrice"  type="tex" class="form-control"  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Tên thương hiệu hoặc nhà sản xuất</label>
                  <input v-model="product.brandName"  type="tex" class="form-control"  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Trọng lượng</label>
                  <input v-model="product.weight"  type="tex" class="form-control"  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Số điện thoại</label>
                  <input  type="tel" class="form-control" />
                </div>
              </div>
             
            </div>
          </div>
        </form>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeform">
            Close
          </button>
          <button type="button" @click="onsubmit" class="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, reactive, onBeforeMount, computed } from "vue";
import Product from "../../../model/Product.js";
import {} from "../../../modules/admin/Product_Manager";
import ImageUploader  from './ImageUploader.vue'
export default {
  components:{
    ImageUploader
  },
  setup(_, { emit }) {
    const product = reactive(new Product());

    async function onsubmit() {
      if (!validateData_Create(account)) {
        alert("data invalid");
      } else {
        try {
          await add_account(account, ProfileImage.value);
          Swal.fire({
            icon: "success",
            title: "Thành công",
            text: "Đã tạo thành công tài khoản mới",
          }).then(() => closeform());
        } catch (err) {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Thất bại",
            text: err.response.data.Message,
          });
        }
      }
    }
    function closeform() {
      emit("closeCreate");
    }
    return {
      closeform,
      onsubmit,
      product,
    };
  },
};
</script>

<style scoped>
.modal-backdrop {
  background-color: #0000005b;
}

.rounded-4 {
  border-radius: 2rem !important;
}
.model-show{
  overflow-x:hidden;
  overflow-y: auto;
}
</style>
