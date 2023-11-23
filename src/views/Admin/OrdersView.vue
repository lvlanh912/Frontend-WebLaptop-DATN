<template>
  <section class="w-100 position-relative" style="width: 100vw">
    <Teleport :to="'body'">
      <Create v-if="isShowCreate" @clodeEdit="isShowCreate = false" />
      <Infor v-if="isShowInfor" :account="account_pick" @closeInfor="isShowInfor = false" @openEdit="
        isShowEdit = true;
      isShowInfor = false;
      " />
      <Edit :account="account_pick" v-if="isShowEdit" @closeEdit="isShowEdit = false" @change="UpdateOne" />
    </Teleport>

    <div class="text-end">
      <button @click="isShowCreate = !isShowCreate" class="btn btn-primary">
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
      <div class="row mb-2">
        <div class="col-12 col-md-5 d-flex">
          Hiển thị

          <select @change="changepagesize" v-model="pagesize"
            class="pt-0 ms-2 form-select form-select-sm mt-0 mb-2 pb-0 me-3"
            style="max-width: 100px; height: 25px !important">
            <option v-for="(option, index) in listpagesize" :key="index">
              {{ option }}
            </option>
          </select>
          Bản ghi
        </div>

        <!-- Tìm kiếm/Lọc -->

        <filter-form @filData="getFildata" @CancelFil="removeFil" />
      </div>

      <div class="table-responsive">
        <table class="table table-inverse" style="width: 100%">
          <thead>
            <tr>
              <th class="fw-bold bg-light">Họ tên</th>

              <th @click="sortbyusername" class="fw-bold bg-light">
                Username

                <i :class="{
                  'bi bi-arrow-down': true,

                  'text-black-50': sort == 'username',
                }"></i>

                <i :class="{
                  'bi bi-arrow-up': true,

                  'text-black-50': sort == 'username_desc',
                }"></i>
              </th>

              <th class="fw-bold bg-light">Email</th>

              <th @click="sortbydate" class="fw-bold bg-light">
                Ngày tham gia

                <i :class="{
                  'bi bi-arrow-down': true,

                  'text-black-50': sort == 'date_desc',
                }"></i>

                <i :class="{
                  'bi bi-arrow-up': true,

                  'text-black-50': sort == 'date',
                }"></i>
              </th>

              <th class="fw-bold bg-light">Giới tính</th>

              <th class="fw-bold bg-light">Tuỳ chọn</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="Account in data.items" :key="Account.Id">
              <td>{{ Account.fullname }}</td>

              <td>{{ Account.username }}</td>

              <td>{{ Account.email }}</td>

              <td>{{ gettime(Account.createAt) }}</td>

              <td>{{ Account.sex === true ? "Nam" : "Nữ" }}</td>

              <td>
                <div class="d-flex">
                  <a class="ms-2" @click="ShowInfor(Account)">
                    <i class="bi bi-info-circle text-success fs-5"></i>
                  </a>

                  <a class="ms-2" @click="ShowEdit(Account)">
                    <i class="bi bi-pencil-fill text-blue fs-5"></i>
                  </a>

                  <a class="ms-2" @click="OnDelete(Account.id)">
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

          <li v-for="(n, index) in totalpage" :key="index" :class="{ 'page-item': true, active: pageindex == n }">
            <a @click="changepage(n)" class="page-link" href="#!">{{ n }}</a>
          </li>

          <li v-if="pageindex < totalpage" @click="changepage(++pageindex)" class="page-item">
            <a class="page-link" href="#!"><span>»</span><span class="sr-only"></span></a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import * as _accounts from "../../modules/admin/Account_Manager.js";
import Account from "../../model/Account.js";
import Create from "../../components/Admin/Accounts/Create.vue";
import Infor from "../../components/Admin/Accounts/Infor.vue";
import Edit from "../../components/Admin/Accounts/Edit.vue";
import FilterForm from "../../components/Admin/Accounts/FilterForm.vue";
export default {
  components: { Create, Infor, Edit, FilterForm },
  setup() {
    const data = ref({ items: [] });
    const loading = ref(true);
    const pageindex = ref(1);
    const pagesize = ref(25);
    const listpagesize = ref([25, 50, 75, 100]);
    const totalpage = ref(1);
    const filterObj = ref({});
    const sort = ref();
    const isShowCreate = ref(false);
    const isShowInfor = ref(false);
    const isShowEdit = ref(false);
    const account_pick = ref();
    const sortbyusername = async () => {
      if (sort.value == "username") sort.value = "username_desc";
      else sort.value = "username";
      data.value = await Getdata();
    };
    const sortbydate = async () => {
      if (sort.value == "date") sort.value = "date_desc";
      else sort.value = "date";
      data.value = await Getdata();
    };
    const gettime = (time) => {
      let datetime = new Date(time);
      return (
        datetime.getDay() +
        "-" +
        datetime.getMonth() +
        "-" +
        datetime.getFullYear()
      );
    };
    onBeforeMount(async () => {
      try {
        data.value = await Getdata();
        totalpage.value = data.value.totalPages;
        loading.value = false;
      } catch (error) {
        loading.value = false;
        alert(error);
      }
    });
    //lấy dữ liệu
    const Getdata = async () => {
      return await _accounts.Get_list_accounts(
        pageindex.value,
        pagesize.value,
        filterObj.value,
        sort.value
      );
    };
    //lọc dữ liệu
    const getFildata = async (value) => {
      filterObj.value = value;
      data.value = await Getdata();
    };
    //Huỷ lọc
    const removeFil = async () => {
      filterObj.value = {};
      data.value = await Getdata();
    };
    //thay đổi trang
    const changepage = async (e) => {
      loading.value = true;
      pageindex.value = e;
      data.value = await Getdata();
      loading.value = false;
    };
    //hiển thị thông tin người dùng
    const ShowInfor = (e) => {
      isShowInfor.value = true;
      account_pick.value = e;
    };
    //hiển thị form chỉnh sửa
    const ShowEdit = (e) => {
      isShowEdit.value = true;
      account_pick.value = e;
    };
    //thay đổi số lượng hiển thị
    const changepagesize = async (e) => {
      pageindex.value = 1;
      pagesize.value = e.target.value;
      data.value = await Getdata();
      totalpage.value = data.value.totalPages;
    };
    //Thay đổi dữ liệu trong danh sách vừa thực hiện sửa đổi ở com child
    const UpdateOne = (e) => {
      data.value.items = data.value.items.map((item) => {
        if (item.id == e.id) {
          console.log(data.value);
          //dừng tìm
          return e;
        }
        return item;
      });
    };

    //Xoá tài khoản khỏi CSDL
    const OnDelete = (id) => {
      Swal.fire({
        title: "Bạn chắc chứ?",
        text: "Thao tác này sẽ xoá hoàn toàn tài khoản!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xoá!",
      }).then(async (result) => {
        console.log(id);
        if (result.isConfirmed) {
          await _accounts.Delete(id);
          //xoá phần tử trong danh sách
          data.value.items.forEach((item, index) => {
            if (item.id == id) {
              data.value.items.splice(index, 1);
              return;
            }
          });
        }
      });
    };

    return {
      data,
      Account,
      pagesize,
      listpagesize,
      changepage,
      changepagesize,
      pageindex,
      totalpage,
      isShowCreate,
      sort,
      loading,
      gettime,
      sortbyusername,
      sortbydate,
      isShowInfor,
      isShowEdit,
      ShowEdit,
      account_pick,
      ShowInfor,
      getFildata,
      removeFil,
      UpdateOne,
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
