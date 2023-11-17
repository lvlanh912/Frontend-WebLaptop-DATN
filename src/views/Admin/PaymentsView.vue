<template>
  <section class="w-100 position-relative" style="width: 100vw">
    <Teleport :to="'body'">
      <Create v-if="isShowForm" @closeCreate="isShowForm = false" @reload="Getdata" />
      <Edit :payment="payment_pick" v-if="isShowEdit" @closeEdit="isShowEdit = false" @reload="Getdata"/>
    </Teleport>

    <div class="text-end">
      <button @click="isShowForm = !isShowForm" class="btn btn-primary">
        Tạo mới
      </button>
    </div>

    <div v-if="loading" class="position-relative center pt-3 start-50">
      <div class="spinner-border text-primary align-self-center">
        <span class="visually-hidden">Loading...</span>
      </div>

      <label class="pb-5 text-black-50" for=" ">loading...</label>
    </div>

    <div v-else class="card mt-4 rounded-3 p-3">
      <div class="table-responsive">
        <table class="table table-inverse" style="width: 100%">
          <thead>
            <tr>
              <th class="fw-bold bg-light">ID</th>

              <th class="fw-bold bg-light">
                Tên
              </th>

              <th class="fw-bold bg-light">Trạng thái</th>    
              <th class="fw-bold bg-light">Tuỳ chọn</th>       
            </tr>
          </thead>

          <tbody>
            <tr v-for="Payment in data" :key="Payment.id">
              <td>{{ Payment.id }}</td>

              <td>{{ Payment.name }}</td>

              <td >
                <i :class="{'bi bi-circle-fill':true,'text-red':!Payment.active,'text-success':Payment.active}"></i>
                <label class="ms-2">{{Payment.active?'Kích hoạt':'Chưa kích hoạt'}}</label>
                </td>
                <td>
                  <div class="d-flex">
                    <a @click="onEdit(Payment)" class="ms-2">
                      <i class="bi bi-pencil-fill text-blue fs-5"></i>
                    </a>
                    <a @click="OnDelete(Payment.id)" class="ms-2">
                      <i class="bi bi-trash2-fill text-red fs-5"></i>
                    </a>
                  </div>
                </td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr class="mb-0" />
    </div>
  </section>
</template>

<script>
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import * as _payments from "../../modules/admin/Payment_Manager.js";
import Payment from "../../model/Payment.js";
import Create from "../../components/Admin/Payments/Create.vue";
import Edit from "../../components/Admin/Payments/Edit.vue";
import Swal from 'sweetalert2';
export default {
  components: { Create, Edit },
  setup() {
    const data = ref({ items: [] });
    const loading = ref(true);
    const isShowForm = ref(false);
    const isShowEdit = ref(false);
    const payment_pick = ref();
   
    onBeforeMount(async () => {
      try {
        await Getdata();
      } catch (error) {
        loading.value = false;
        Swal.fire({
          title: "Lỗi",
          text: error,
          icon: "question"
        });
      }
    });
    //lấy dữ liệu
    const Getdata = async () => {
      loading.value = true;
      data.value = await _payments.Get();
      loading.value = false;
    };
    //hiển thị form chỉnh sửa
    const onEdit = (e) => {
      isShowEdit.value = true;
      payment_pick.value = e;
    };

    //Xoá tài khoản khỏi CSDL
    const OnDelete = (id) => {
      Swal.fire({
        title: "Bạn chắc chứ?",
        text: "Thao tác này sẽ xoá phương thức thanh toán khỏi hệ thống",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xoá!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await _payments.Delete(id);
          //xoá phần tử trong danh sách
          data.value.forEach((item, index) => {
            if (item.id == id) {
              data.value.splice(index, 1);
              return;
            }
          });
        }
      });
    };

    return {
      Getdata,
      data,
      Payment,
      isShowForm,
      loading,
      isShowEdit,
      onEdit,
      payment_pick,
      OnDelete,
    };
  },
};
</script>
<style scoped>
.center {
  bottom: 50%;
  right: 50%;
  left: 50%;
}
</style>
