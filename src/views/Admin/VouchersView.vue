<template>
  <voucher-create v-if="showCreateForm" @closeAdd="showCreateForm = !showCreateForm" />
  <div class="text-end">
    <button @click="showCreateForm = !showCreateForm" class="btn btn-primary">
      Tạo mới
    </button>
  </div>
  <div v-if="loading" class="position-relative center pt-3 start-50">
    <div class="spinner-border text-primary align-self-center">
      <span class="visually-hidden">Loading...</span>
    </div>
    <label class="pb-5 text-black-50">loading...</label>
  </div>
  <div v-else class="card mt-4 rounded-3 p-3">
    <div class="row mb-2">
      <div class="col-12 col-md-5 d-flex">
        Hiển thị
        <select class="pt-0 ms-2 form-select form-select-sm mt-0 mb-2 pb-0 me-3"
          style="max-width: 100px; height: 25px !important">
          <option v-for="option in listpagesize">{{ option }}</option>
        </select>
        Bản ghi
      </div>
      <!-- Tìm kiếm/Lọc -->
    </div>
    <div class="table-responsive">
      <table class="table table-inverse" style="width: 100%">
        <thead>
          <tr>
            <th class="fw-bold bg-light">Mã code</th>
            <th class="fw-bold bg-light">
              Ngày bắt đầu
              <i :class="{
                'bi bi-arrow-down': true,
              }"></i>
              <i :class="{
                'bi bi-arrow-up': true,
              }"></i>
            </th>
            <th class="fw-bold bg-light">
              Ngày kết thúc
              <i :class="{
                'bi bi-arrow-down': true,
              }"></i>
              <i :class="{
                'bi bi-arrow-up': true,
              }"></i>
            </th>
            <th class="fw-bold bg-light">Trạng thái</th>
            <th class="fw-bold bg-light">Tuỳ chọn</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in data.items">
            <td>{{ item.code }}</td>
            <td>{{ item.createAt }}</td>
            <td></td>
            <td></td>
            <td>
              <div class="d-flex">
                <a class="ms-2">
                  <i class="bi bi-info-circle text-success fs-5"></i>
                </a>
                <a class="ms-2">
                  <i class="bi bi-pencil-fill text-blue fs-5"></i>
                </a>
                <a class="ms-2">
                  <i class="bi bi-trash2-fill text-red fs-5"></i>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr class="mb-0" />
    <nav class="d-flex justify-content-end pt-2">
      <ul class="pagination">
        <li v-if="pageindex > 1" @click="changepage(--pageindex)" class="page-item">
          <a class="page-link" href="#!"><span>«</span><span class="sr-only"></span></a>
        </li>
        <li v-for="n in totalpage" :class="{ 'page-item': true, active: pageindex == n }">
          <a @click="changepage(n)" class="page-link" href="#!">{{ n }}</a>
        </li>
        <li v-if="pageindex < totalpage" class="page-item">
          <a class="page-link" href="#!"><span>»</span><span class="sr-only"></span></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import voucherCreate from "../../components/Admin/Vouchers/Create.vue";
import { GetAll } from "../../modules/admin/Voucher_Manager.js";
export default {
  components: {
    voucherCreate,
  },
  setup() {
    const showCreateForm = ref(false);
    const loading = ref(false);
    const listpagesize = [25, 50, 75, 100];
    const totalpage = ref(0);
    const pageindex = ref(1);
    const pagesize = ref(25);
    const data = ref({ items: "" });
    const filterobj = reactive({
      keywords: null,
      createTimeStart: null,
      createTimeEnd: null,
    });
    const sort = ref();
    onMounted(async () => {
      await Getdata();
      console.log(data.value);
    });

    //lấy dữ liệu
    async function Getdata() {
      data.value = await GetAll(
        pageindex.value,
        pagesize.value,
        filterobj,
        sort.value
      );
      totalpage.value = data.value.pagesize;
    }
    return {
      showCreateForm,
      loading,
      listpagesize,
      totalpage,
      pageindex,
      data
    };
  },
};
</script>

<style></style>
