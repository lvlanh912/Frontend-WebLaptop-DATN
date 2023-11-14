<template>
  <div :class="'modal-backdrop pt-5 model-show'">
    <div class="modal-dialog" style="min-width: 700px">
      <div class="modal-content rounded-4">
        <div class="modal-header">
          <h5 class="modal-title text-blue">Tạo mới tài khoản</h5>
          <button @click="closeform" type="button" class="btn-close"></button>
        </div>
        <form>
          <div class="modal-body">
            <div class="input-group mb-3 col-12">
              <label class="col-2 align-self-center">Avatar</label>
              <input @change="uploadfile" type="file" class="form-control" accept=".png, .jpg, .jpeg" />
            </div>
            <div class="row mb-2">
              <div class="col-lg-6">
                <div class="form-group">
                  <label>Họ và tên</label>
                  <input v-model="account.fullname" type="text" class="form-control" placeholder="ex: Nguyễn Văn A" />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label>Tên người dùng (username)</label>
                  <input v-model="account.username" type="text" class="form-control" placeholder="ex: lvlanh" />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Mật khẩu</label>
                  <input v-model="account.password" type="password" class="form-control" autocomplete="off" />
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Email</label>
                  <input v-model="account.email" type="email" class="form-control" placeholder="example@gmail.com" />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Số điện thoại</label>
                  <input v-model="account.phone"
                   @keyup="numberinput" type="tel" class="form-control" />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label class="d-block">Giới tính</label>
                  <div class="form-control border-0">
                    <input v-model="account.sex" type="radio" value="true" />
                    <label class="me-3">Nam</label>
                    <input v-model="account.sex" type="radio" value="false" />
                    <label>Nữ</label>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Địa chỉ</label>
                  <input v-model="account.address" type="text" class="form-control" placeholder="số nhà ..." />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Tỉnh, Thành Phố</label>
                  <select class="form-select" v-model="chosen_provices" @change="get_districts">
                    <option v-for="province in provinces" :key="province.code" :value="province.code">
                      {{ province.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Quận, Huyện</label>
                  <select class="form-select" @change="get_wards" v-model="chosen_district">
                    <option v-for="district in districts" :key="district.code" :value="district.code">
                      {{ district.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Xã, Phường</label>
                  <select class="form-select" v-model="account.WardId">
                    <option v-for="ward in wards" :key="ward.id" :value="ward.id">
                      {{ ward.name }}
                    </option>
                  </select>
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
import Account from "../../../model/Account.js";
import {
  Get_List_Province,
  Get_List_districts,
  Get_List_wards,
  add_account,
  validateData_Create,
} from "../../../modules/admin/Account_Manager";
export default {
  setup(_, { emit }) {
    const account = reactive(new Account());
    const chosen_provices = ref();
    const chosen_district = ref();
    const provinces = ref([]);
    const districts = ref([]);
    const wards = ref([]);
    const ProfileImage = ref();
    async function get_districts() {
      wards.value = [];
      districts.value = await Get_List_districts(chosen_provices.value);
    }
    function uploadfile(e) {
      ProfileImage.value = e.target.files[0];
    }
    async function get_wards() {
      wards.value = await Get_List_wards(chosen_district.value);
    }

    function numberinput(e) {
      if (!e.target.value.match(/^\d+$/)) {
        e.target.value = "";
      }
    }

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
    onMounted(async () => {
      provinces.value = await Get_List_Province();
    });
    function closeform() {
      emit("closeModal");
    }
    return {
      closeform,
      account,
      provinces,
      chosen_provices,
      districts,
      get_districts,
      chosen_district,
      wards,
      get_wards,
      uploadfile,
      onsubmit,
      numberinput,
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
