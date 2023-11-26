<template>
  <section class="w-100 position-relative" style="width: 100vw">
    <Teleport :to="'body'">
      <Create
        v-if="isShowCreate"
        @closeAdd="isShowCreate = false"
        @reloadData="Reload"
      />
      <Edit
        :Order="order_pick"
        v-if="isShowEdit"
        @closeEdit="isShowEdit = false"
        @reloadData="Reload"
      />
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

          <select
            @change="changepagesize"
            v-model="pagesize"
            class="pt-0 ms-2 form-select form-select-sm mt-0 mb-2 pb-0 me-3"
            style="max-width: 100px; height: 25px !important"
          >
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
              <th class="fw-bold bg-light">STT</th>

              <th class="fw-bold bg-light">Người nhận hàng</th>

              <th @click="sortbydate" class="fw-bold bg-light">
                Ngày đặt hàng
                <i
                  :class="{
                    'bi bi-arrow-down': true,
                    'text-black-50': sort == 'date',
                  }"
                ></i>
                <i
                  :class="{
                    'bi bi-arrow-up': true,
                    'text-black-50': sort == 'date_desc',
                  }"
                ></i>
              </th>

              <th class="fw-bold bg-light">Trạng thái đơn hàng</th>
              <th @click="sortbypay" class="fw-bold bg-light">
                Tình trạng thanh toán
                <i
                  :class="{
                    'bi bi-arrow-down': true,
                    'text-black-50': sort == 'ispaid',
                  }"
                ></i>
                <i
                  :class="{
                    'bi bi-arrow-up': true,
                    'text-black-50': sort == 'ispaid_desc',
                  }"
                ></i>
              </th>
              <th @click="sortbytotal" class="fw-bold bg-light">
                Giá trị
                <i
                  :class="{
                    'bi bi-arrow-down': true,
                    'text-black-50': sort == 'total',
                  }"
                ></i>
                <i
                  :class="{
                    'bi bi-arrow-up': true,
                    'text-black-50': sort == 'total_desc',
                  }"
                ></i>
              </th>

              <th class="fw-bold bg-light">Tuỳ chọn</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(Order, index) in data.items" :key="Order.Id">
              <td>{{ ++index }}</td>

              <td>{{ Order.shippingAddress.fullname }}</td>

              <td>{{ convertTime(Order.createAt) }}</td>

              <td>
                <i
                  :class="{
                    'bi bi-circle-fill me-1': true,
                    'text-yellow': Order.status.code == 1,
                    'text-blue': Order.status.code == 2,
                    'text-green': Order.status.code == 3,
                    'text-red': Order.status.code == 0,
                  }"
                ></i>
                {{ Order.status.description }}
              </td>

              <td>
                <i
                  :class="{
                    'bi bi-circle-fill me-1': true,
                    'text-yellow': !Order.isPaid,
                    'text-green': Order.isPaid,
                    'text-red': Order.status.code == 0,
                  }"
                ></i>
                {{Order.isPaid == true
                      ? "Đã thanh toán"
                      : "Chưa thanh toán"
                }}
              </td>
              <td>
                {{ ConvertTotal(Order.total) }}
              </td>
              <td>
                <div class="d-flex">
                  <a class="ms-2" @click="ShowEdit(Order)">
                    <i class="bi bi-pencil-fill text-blue fs-5"></i>
                  </a>

                  <a class="ms-2" @click="OnDelete(Order)">
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
          <li
            v-if="pageindex > 1"
            @click="changepage(--pageindex)"
            class="page-item"
          >
            <a class="page-link" href="#!">
              <span>«</span>
              <span class="sr-only"></span>
            </a>
          </li>

          <li
            v-for="(n, index) in totalpage"
            :key="index"
            :class="{'page-item': true, active: pageindex == n}"
          >
            <a @click="changepage(n)" class="page-link" href="#!">{{ n }}</a>
          </li>

          <li
            v-if="pageindex < totalpage"
            @click="changepage(++pageindex)"
            class="page-item"
          >
            <a class="page-link" href="#!">
              <span>»</span>
              <span class="sr-only"></span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
import {onBeforeMount, onMounted, reactive, ref} from "vue"
import {GetAll, Delete} from "../../modules/admin/Order_Manager.js"
import Order from "../../model/Order.js"
import Create from "../../components/Admin/Orders/Create.vue"
import Edit from "../../components/Admin/Orders/Edit.vue"
import FilterForm from "../../components/Admin/Orders/FilterForm.vue"
export default {
  components: {Create, Edit, FilterForm},
  setup() {
    const data = ref({items: []})
    const loading = ref(true)
    const pageindex = ref(1)
    const pagesize = ref(25)
    const listpagesize = ref([25, 50, 75, 100])
    const totalpage = ref(1)
    const filterObj = ref({})
    const sort = ref()
    const isShowCreate = ref(false)
    const isShowInfor = ref(false)
    const isShowEdit = ref(false)
    const order_pick = ref()
    const Reload = async () => await Getdata()
    const sortbydate = async () => {
      if (sort.value == "date") sort.value = "date_desc"
      else sort.value = "date"
      await Getdata()
    }
    const sortbypay = async () => {
      if (sort.value == "ispaid") sort.value = "ispaid_desc"
      else sort.value = "ispaid"
      await Getdata()
    }
    const sortbytotal = async () => {
      if (sort.value == "total") sort.value = "total_desc"
      else sort.value = "total"
      await Getdata()
    }
    const convertTime = (time) => {
      const date = new Date(time)
      return date.toLocaleDateString()
    }
    const ConvertTotal = (e) => {
      return e.toLocaleString("it-IT", {style: "currency", currency: "VND"})
    }

    onBeforeMount(async () => {
      try {
        await Getdata()
        totalpage.value = data.value.totalPages
        loading.value = false
      } catch (error) {
        loading.value = false
        alert(error)
      }
    })
    //lấy dữ liệu
    const Getdata = async () => {
      data.value = await GetAll(
        pageindex.value,
        pagesize.value,
        filterObj.value,
        sort.value
      )
      totalpage.value = data.value.totalPages
    }
    //lọc dữ liệu
    const getFildata = async (value) => {
      filterObj.value = value
      await Getdata()
    }
    //Huỷ lọc
    const removeFil = async () => {
      filterObj.value = {}
      await Getdata()
    }
    //thay đổi trang
    const changepage = async (e) => {
      loading.value = true
      pageindex.value = e
      await Getdata()
      loading.value = false
    }
    //hiển thị form chỉnh sửa
    const ShowEdit = (e) => {
      isShowEdit.value = true
      order_pick.value = e
    }
    //thay đổi số lượng hiển thị
    const changepagesize = async (e) => {
      pageindex.value = 1
      pagesize.value = e.target.value
      await Getdata()
      totalpage.value = data.value.totalPages
    }
    //Xoá tài khoản khỏi CSDL
    const OnDelete = (order) => {
      Swal.fire({
        title: "Bạn chắc chứ?",
        text: "Sẽ xoá đơn hàng khỏi hệ thống",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xoá!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await Delete(order)
            Swal.fire({
              title: "Thành công!",
              text: "Đã xoá đơn hàng",
              icon: "success"
            })
            //xoá phần tử trong danh sách
            data.value.items.forEach((item, index) => {
              if (item.id == order.id) {
                data.value.items.splice(index, 1)
              }
            })
          } catch (ex) {
            Swal.fire({
              title: "Không thể xoá đơn hàng!",
              text: ex.message,
              icon: "warning"
            })
          }
        }
      })
    }

    return {
      data,
      Reload,
      Order,
      pagesize,
      listpagesize,
      changepage,
      changepagesize,
      pageindex,
      totalpage,
      isShowCreate,
      sort,
      loading,
      convertTime,
      sortbydate,
      sortbypay,
      sortbytotal,
      ConvertTotal,
      isShowInfor,
      isShowEdit,
      ShowEdit,
      order_pick,
      getFildata,
      removeFil,
      OnDelete,
    }
  },
}
</script>
<style scoped>
.center {
  bottom: 50%;
  right: 50%;
  left: 50%;
}
</style>
