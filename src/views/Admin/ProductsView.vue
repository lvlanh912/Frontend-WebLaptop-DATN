<template>
  <section class="w-100 position-relative" style="width: 100vw">
    <Teleport :to="'body'">
      <Create v-if="isShowCreate" @closeCreate="isShowCreate = false" @reload="onReload" />
      <Edit :product="product_pick" v-if="isShowEdit" @closeEdit="isShowEdit = false" />
    </Teleport>

    <div class="text-end">
      <button @click="isShowCreate = true" class="btn btn-primary">
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
              <th class="fw-bold bg-light">Tên sản phẩm</th>
              <th @click="sortbyStock" class="fw-bold bg-light">
                Trong kho
                <i :class="{
                  'bi bi-arrow-down': true,
                  'text-black-50': sort == 'stock',
                }"></i>
                <i :class="{
                  'bi bi-arrow-up': true,
                  'text-black-50': sort == 'stock_desc',
                }"></i>
              </th>
              <th @click="sortbySold" class="fw-bold bg-light">
                Đã bán
                <i :class="{
                  'bi bi-arrow-down': true,
                  'text-black-50': sort == 'sold',
                }"></i>
                <i :class="{
                  'bi bi-arrow-up': true,
                  'text-black-50': sort == 'sold_desc',
                }"></i>
              </th>

              <th @click="sortbydate" class="fw-bold bg-light">
                Ngày tạo
                <i :class="{
                  'bi bi-arrow-down': true,
                  'text-black-50': sort == 'date_desc',
                }"></i>
                <i :class="{
                  'bi bi-arrow-up': true,
                  'text-black-50': sort == 'date',
                }"></i>
              </th>

              <th @click="sortbyPrice" class="fw-bold bg-light">
                Giá
                <i :class="{
                  'bi bi-arrow-down': true,
                  'text-black-50': sort == 'price_desc',
                }"></i>
                <i :class="{
                  'bi bi-arrow-up': true,
                  'text-black-50': sort == 'price',
                }"></i>
              </th>

              <th class="fw-bold bg-light">Tuỳ chọn</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="Product in data.items" :key="Product.Id">
              <td :title="Product.productName">
                {{ SetmaxLength(Product.productName) }}
              </td>

              <td>{{ Product.stock }}</td>

              <td>{{ Product.sold }}</td>

              <td>{{ gettime(Product.createAt) }}</td>

              <td>{{ Product.price }}</td>

              <td>
                <div class="d-flex">
                  <a class="ms-2" @click="ShowEdit(Product)">
                    <i class="bi bi-pencil-fill text-blue fs-5"></i>
                  </a>

                  <a class="ms-2" @click="OnDelete(Product.id)">
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
            <a class="page-link" href="#!">
              <span>«</span>
              <span class="sr-only"></span>
            </a>
          </li>

          <li v-for="(n, index) in totalpage" :key="index" :class="{ 'page-item': true, active: pageindex == n }">
            <a @click="changepage(n)" class="page-link" href="#!">{{ n }}</a>
          </li>

          <li v-if="pageindex < totalpage" @click="changepage(++pageindex)" class="page-item">
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
import { onBeforeMount, onMounted, reactive, ref } from "vue"
import { GetAll, Delete } from "../../modules/admin/Product_Manager.js"
import Product from "../../model/Product.js"
import Create from "../../components/Admin/Products/Create.vue"
import Infor from "../../components/Admin/Products/Infor.vue"
import Edit from "../../components/Admin/Products/Edit.vue"
import FilterForm from "../../components/Admin/Products/FilterForm.vue"
export default {
  components: { Create, Infor, Edit, FilterForm },
  setup() {
    const data = ref({ items: [] })
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
    const product_pick = ref()

    const SetmaxLength = (e) => {
      if (e.length > 40) return e.slice(0, 40) + "...."
      return e
    }
    const sortbyStock = async () => {
      if (sort.value == "stock") sort.value = "stock_desc"
      else sort.value = "stock"
      await Getdata()
    }
    const sortbySold = async () => {
      if (sort.value == "sold") sort.value = "sold_desc"
      else sort.value = "sold"
      await Getdata()
    }
    const sortbydate = async () => {
      if (sort.value == "date") sort.value = "date_desc"
      else sort.value = "date"
      await Getdata()
    }
    const sortbyPrice = async () => {
      if (sort.value == "price") sort.value = "price_desc"
      else sort.value = "price"
      await Getdata()
    }
    const gettime = (time) => {
      let datetime = new Date(time)
      return datetime.toLocaleString()
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
      product_pick.value = e
    }
    //thay đổi số lượng hiển thị
    const changepagesize = async (e) => {
      pageindex.value = 1
      pagesize.value = e.target.value
      await Getdata()
      totalpage.value = data.value.totalPages
    }
    //load danh sách sản phẩm
    const onReload = async () => await Getdata()
    //Xoá sản phẩm
    const OnDelete = (id) => {
      Swal.fire({
        title: "Bạn chắc chứ?",
        text: "Thao tác này sẽ xoá hoàn toàn sản phẩm!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xoá!",
      }).then(async (result) => {
        console.log(id)
        if (result.isConfirmed) {
          await Delete(id)
          //xoá phần tử trong danh sách
          data.value.items.forEach((item, index) => {
            if (item.id == id) {
              data.value.items.splice(index, 1)
              return
            }
          })
        }
      })
    }

    return {
      pagesize,
      SetmaxLength,
      data,
      Product,
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
      sortbyStock,
      sortbySold,
      sortbydate,
      sortbyPrice,
      isShowInfor,
      isShowEdit,
      ShowEdit,
      product_pick,
      getFildata,
      removeFil,
      OnDelete,
      onReload,
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
