<template>
  <div :class="'modal-backdrop pt-3 model-show'">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header justify-content-end border-bottom-0">
          <div class="col-12 text-center">
            <h5 class="text-blue">CHỈNH SỬA THÔNG TIN</h5>
          </div>
          <button
            @click="closeThis"
            type="button"
            class="btn-close m-0"
          ></button>
        </div>
        <div class="modal-body pt-0">
          <div class="row no-gutters">
            <div class="col-md-6">
              <div class="px-4">
                <div class="text-center px-0 border-0">
                  <div class="card-img mx-auto rounded-circle">
                    <img
                      class="img-fluid"
                      :src="image_profile"
                      style="width: 200px"
                      alt="user image"
                    />
                  </div>
                  <div class="card-body">
                    <label class="me-2 text-darker">Họ và tên</label>
                    <input class="" v-model="account_payload.fullname" />
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div
                class="px-4 d-flex flex-column justify-content-center align-content-center"
              >
                <p class="text-darker pt-2 mb-0">Quyền truy cập</p>
                <select v-model="account_payload.roles">
                  <option value="0" :selected="account_payload.roles == 0">
                    0 (vô hiệu hoá)
                  </option>
                  <option value="1" :selected="account_payload.roles == 1">
                    1 (người dùng bình thường)
                  </option>
                  <option value="2" :selected="account_payload.roles == 2">
                    2 (quản trị viên)
                  </option>
                </select>
                <div class="form-group">
                  <p class="mb-0 pt-2 text-darker">Tên người dùng</p>
                  <input
                    class="form-control"
                    v-model="account_payload.username"
                    type="text"
                  />
                </div>
                <p class="text-darker pt-2 mb-0">Địa chỉ email</p>
                <input
                  class="form-control"
                  v-model="account_payload.email"
                  type="text"
                />
                <p class="text-darker pt-2 mb-0">Số điện thoại</p>
                <input
                  class="form-control"
                  v-model="account_payload.phone"
                  type="text"
                />
                <p class="text-darker pt-2 mb-0">Giới tính</p>
                <div class="d-flex">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      id="male"
                      :value="true"
                      v-model="account_payload.sex"
                    />
                    <label for="male" class="me-2 form-check-label">Nam</label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      id="female"
                      :value="false"
                      v-model="account_payload.sex"
                    />
                    <label for="female" class="me-2 form-check-label">Nữ</label>
                  </div>
                </div>
                <p class="text-darker mb-0">Địa chỉ</p>
                <p class="ms-1">{{ account_payload.address }}</p>
              </div>
              <div class="d-flex justify-content-center justify-content-md-end">
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
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { Edit } from "../../../modules/admin/Account_Manager";
import Swal from "sweetalert2";
export default {
  props: {
    account: {
      required: true,
    },
  },
  setup(props, { emit }) {
    const account_payload = props.account
    const image_profile = computed(() => {
      return backendHost + "/images/avatar/" + props.account.profile_image;
    });
    const gender = computed(() => {
      return props.account.Sex ? "Nam" : "Nữ";
    });
    const closeThis=()=> emit("closeEdit")
    const onSave = async () => {
      try {
        account_payload.address = "";
        console.log(account_payload);
        await Edit(account_payload, image_profile.value);
    //cập nhật lại giá trị đã sửa đổi lên danh sách hiển thị
        emit("change",account_payload)
        Swal.fire({
          icon: "success",
          title: "Thành công",
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Thất Bại",
          text: err.message,
        });
      }
    };
    return { image_profile, closeThis, gender, account_payload, onSave };
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