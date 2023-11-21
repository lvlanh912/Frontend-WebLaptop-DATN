<template>
  <news-create v-if="showCreateForm" @closeAdd="showCreateForm = !showCreateForm" @reloadData="Reload" />
  <news-edit v-if="showEditForm" @CloseEdit="showEditForm = !showEditForm" :News="news_Selected" @reloadData="Reload" />
  <news-infor v-if="showInforForm" @CloseInfor="showInforForm=!showInforForm" :News="news_Selected" @openEdit="editFromDetail" />
  <div class="text-end">
    <button @click="showCreateForm = !showCreateForm" class="btn btn-primary">
      Tạo mới
    </button>
  </div>
  <!-- Loading -->
  <div v-if="loading" class="position-relative center pt-3 start-50">
    <div class="spinner-border text-primary align-self-center">
      <span class="visually-hidden">Loading...</span>
    </div>
    <label class="pb-5 text-black-50">loading...</label>
  </div>
  <!-- Page -->
  <div v-else class="card mt-4 rounded-3 p-3">
    <div class="row mb-2">
      <div class="col-12 col-md-5 d-flex">
        Hiển thị
        <select @change="changepagesize" class="pt-0 ms-2 form-select form-select-sm mt-0 mb-2 pb-0 me-3"
          style="max-width: 100px; height: 25px !important">
          <option v-for="(option, index) in listpagesize" :key="index">
            {{ option }}
          </option>
        </select>
        Bản ghi
      </div>
      <!-- Tìm kiếm/Lọc -->
      <news-fil-form @CancelFil="removeFil" @filData="getFildata" />
    </div>
    <!-- Data -->
    <div class="table-responsive">
      <table class="table table-inverse" style="width: 100%">
        <thead>
          <tr>
            <th class="fw-bold bg-light">ID</th>
            <th class="fw-bold bg-light" @click="sortByCreateAt">
              Ngày tạo
              <i :class="{
                'bi bi-arrow-down': true,
                'text-black-50': sort == 'date',
              }"></i>
              <i :class="{
                'bi bi-arrow-up': true,
                'text-black-50': sort == 'date_desc',
              }"></i>
            </th>

            <th class="fw-bold bg-light">Tiêu đề</th>
            <th class="fw-bold bg-light">Tuỳ chọn</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in data.items" :key="index">
            <td class="fw-bold">{{ item.id }}</td>
            <td class="no-wrap">{{ item.createAt }}</td>
            <td>{{ SetMaxtitle(item.title) }}</td>
            <td>
              <div class="d-flex">
                <a @click="onInfor(item)" class="ms-2" >
                  <i class="bi bi-info-circle text-success fs-5"></i>
                </a>
                <a @click="onEdit(item)" class="ms-2">
                  <i class="bi bi-pencil-fill text-blue fs-5"></i>
                </a>
                <a @click="OnDelete(item.id)" class="ms-2">
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
        <li v-for="n in totalpage" :key="n" :class="{ 'page-item': true, active: pageindex == n }">
          <a @click="changepage(n)" class="page-link" href="#!">{{ n }}</a>
        </li>
        <li v-if="pageindex < totalpage" @click="changepage(++pageindex)" class="page-item" >
          <a class="page-link" href="#!"><span>»</span><span class="sr-only"></span></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { onMounted,ref } from "vue";
import newsCreate from "../../components/Admin/News/Create.vue";
import newsEdit from "../../components/Admin/News/Edit.vue";
import newsInfor from "../../components/Admin/News/Infor.vue";
import newsFilForm from "../../components/Admin/News/FilterForm.vue";
import {GetAll,Delete} from "../../modules/admin/News_Manager.js"
export default {
  components: {
    newsCreate,
    newsEdit,
    newsInfor,
    newsFilForm
  },
  setup() {
    const showCreateForm = ref(false);
    const showEditForm = ref(false);
    const showInforForm=ref(false)
    const news_Selected = ref({});
    const loading = ref(false);
    const listpagesize = [25, 50, 75, 100];
    const totalpage = ref(1);
    const pageindex = ref(1);
    const pagesize = ref(25);
    const data = ref({ items: "" });
    const sort = ref();
    const filterobj = ref({});

    const SetMaxtitle=(title)=>{
      return title.length>70?title.slice(0,70)+"...":title.slice(0,70)
    }

    const onEdit = (e) => {
      news_Selected.value = e;
      showEditForm.value = true;
    };
    const onInfor=(e)=>{
      news_Selected.value=e
      showInforForm.value=true
    }
    const editFromDetail=()=>{
      showInforForm.value=false
      showEditForm.value=true
    }
    onMounted(async () => {
      await Getdata();
    });
    const Reload=async()=>await Getdata()

    //Sắp xếp
    const sortByCreateAt = async () => {
      sort.value == 'date_desc' ? sort.value = 'date' : sort.value = 'date_desc'
      await Getdata()
    }

    //Lọc
    const getFildata = async (value) => {
      filterobj.value = value;
      await Getdata();      
    };
    //Huỷ lọc
    const removeFil = async () => {
      filterobj.value = {};
      await Getdata();
    };
    //Thay đổi số lượng hiển thị
    const changepagesize= async (e) => {
      pageindex.value = 1;
      pagesize.value = e.target.value;
      await Getdata();
      totalpage.value = data.value.totalPages;
    };
    //thay đổi trang
    const changepage = async (e) => {
      loading.value = true;
      pageindex.value = e;
      await Getdata();
      loading.value = false;
    };
    //lấy dữ liệu
    const Getdata = async () => {
      data.value = await GetAll(
        pageindex.value,
        pagesize.value,
        filterobj.value,
        sort.value
      );
      totalpage.value = data.value.totalPages;
    };

    //Xoá News
      const OnDelete = (id) => {
    Swal.fire({
      title: "Bạn chắc chứ?",
      text: "Thao tác này sẽ xoá hoàn toàn bài viết đã chọn!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xoá!",
    }).then(async (result) => {
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
      showCreateForm,
      showEditForm,
      showInforForm,
      SetMaxtitle,
      onEdit,
      onInfor,
      editFromDetail,
      news_Selected,
      loading,
      listpagesize,
      totalpage,
      pageindex,
      data,
      sort,
      sortByCreateAt,
      getFildata,
      removeFil,
      changepagesize,
      changepage,
      Reload,
      OnDelete
    };
  },
};
</script>

<style></style>
