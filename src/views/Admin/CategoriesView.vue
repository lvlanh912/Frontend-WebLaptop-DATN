<template>
  <section class="w-100 position-relative" style="width: 100vw">
    <Teleport :to="'body'">
      <Create v-if="isShowCreate" @CloseEdit="isShowCreate = false" @reloadData="Getdata" :ParentCategory="Current_Category"  />
      <Edit :category="category_pick" v-if="isShowEdit" @closeEdit="isShowEdit = false" @reload="Getdata" />
    </Teleport>

    <div class="d-flex justify-content-between text-end">
      <div class=" align-self-center">
        <strong class="form-label text-blue fw-bolder fs-4">{{ Current_Category==null?'Danh sách danh mục gốc':"Danh sách danh mục con của: "+Current_Category.name }}</strong></div>
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
              <th class="fw-bold bg-light">ID</th>
              <th @click="sortbyName" class="fw-bold bg-light">
                Tên danh mục
                <i :class="{
                  'bi bi-arrow-down': true,

                  'text-black-50': sort == 'name',
                }"></i>

                <i :class="{
                  'bi bi-arrow-up': true,

                  'text-black-50': sort == 'name_desc',
                }"></i>
              </th>

              <th class="fw-bold bg-light">Tuỳ chọn</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="Category in data.items" :key="Category.Id">
              <td>
                <router-link class=" link-opacity-10 text-decoration-none" :to="{name:'categories_manager',params:{id:Category.id}}">
                {{ Category.id }}
              </router-link>
               </td>

              <td>{{ Category.name }}</td>

              <td>
                <div class="d-flex">
                  <a class="ms-2" @click="ShowEdit(Category)">
                    <i class="bi bi-pencil-fill text-blue fs-5"></i>
                  </a>
                  <a class="ms-2" @click="OnDelete(Category.id)">
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
import { onBeforeMount, onMounted, onUpdated, reactive, ref } from "vue";
import { GetAll,GetbyId,Delete } from "../../modules/admin/Category_Manager.js";
import Category from "../../model/Category.js";
import Create from "../../components/Admin/Categories/Create.vue";
import Edit from "../../components/Admin/Categories/Edit.vue";
import FilterForm from "../../components/Admin/Categories/FilterForm.vue";
import {  onBeforeRouteUpdate } from 'vue-router';
export default {
  components: { Create, Edit, FilterForm },
  props:{
    id:{
      require:false,
      default:null
    }
  },
  setup(props) {
    const data = ref({ items: [] });
    const ParentCategoryId=ref(props.id)
    const loading = ref(true);
    const pageindex = ref(1);
    const pagesize = ref(25);
    const listpagesize = ref([25, 50, 75, 100]);
    const totalpage = ref(1);
    const filterObj = ref({});
    const sort = ref();
    const isShowCreate = ref(false);
    const isShowEdit = ref(false);
    const category_pick = ref();
    const Current_Category=ref(null)
    onBeforeMount(async () => {
      try {
        if(ParentCategoryId.value==''||ParentCategoryId.value==null)
          ParentCategoryId.value=null
        else
        Current_Category.value=await GetbyId(ParentCategoryId.value).then(e=>e)
        await Getdata();
        totalpage.value = data.value.totalPages;
        loading.value = false;
      } catch (error) {
        loading.value = false;
        alert(error);
      }
    });
    onBeforeRouteUpdate(async(to,from,next)=>{
      if(to.params.id!=''){
        ParentCategoryId.value=to.params.id
        Current_Category.value= await GetbyId(ParentCategoryId.value)
      }
      else{
        ParentCategoryId.value=null
        Current_Category.value=null
      }
       
      await Getdata()
      next()
    })
    //lấy dữ liệu
    const Getdata = async () => {
      data.value = await GetAll(
        ParentCategoryId.value,
        pageindex.value,
        pagesize.value,
        filterObj.value,
        sort.value
      );
    };
    //sắp xếp
    const sortbyName = async () => {
      sort.value == "name_desc"
        ? (sort.value = "name")
        : (sort.value = "name_desc");
      await Getdata();
    };
    //lọc dữ liệu
    const getFildata = async (value) => {
      filterObj.value = value;
      await Getdata();
    };
    //Huỷ lọc
    const removeFil = async () => {
      filterObj.value = {};
      await Getdata();
    };
    //thay đổi trang
    const changepage = async (e) => {
      loading.value = true;
      pageindex.value = e;
      await Getdata();
      loading.value = false;
    };
    //hiển thị thông tin người dùng
    const ShowInfor = (e) => {
      isShowInfor.value = true;
      category_pick.value = e;
    };
    //hiển thị form chỉnh sửa
    const ShowEdit = (e) => {
      isShowEdit.value = true;
      category_pick.value = e;
    };
    //thay đổi số lượng hiển thị
    const changepagesize = async (e) => {
      pageindex.value = 1;
      pagesize.value = e.target.value;
      await Getdata();
      totalpage.value = data.value.totalPages;
    };
    //Xoá danh mục khỏi CSDL
    const OnDelete = (id) => {
      Swal.fire({
        title: "Bạn chắc chứ?",
        text: "Thao tác này sẽ xoá hoàn toàn danh mục!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xoá!",
      }).then(async (result) => {
        console.log(id);
        if (result.isConfirmed) {
          await Delete(id);
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
      Category,
      sortbyName,
      pagesize,
      listpagesize,
      Getdata,
      changepage,
      changepagesize,
      pageindex,
      totalpage,
      isShowCreate,
      sort,
      loading,
      isShowEdit,
      ShowEdit,
      category_pick,
      ShowInfor,
      getFildata,
      removeFil,
      OnDelete,
      Current_Category,
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
