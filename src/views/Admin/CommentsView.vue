<template>
  <section class="w-100 position-relative" style="width: 100vw">
    <Teleport :to="'body'">
      <Edit :comment="comment_pick" v-if="isShowEdit" @closeEdit="isShowEdit = false" @reload="onReload" />
    </Teleport>

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
              <th class="fw-bold bg-light">Id sản phẩm</th>

              <th class="fw-bold bg-light">Id Tài khoản</th>

              
              <th @click="sortbyStar" class="fw-bold bg-light">
                Chất lượng (sao)<i :class="{'bi bi-arrow-down': true,'text-black-50': sort == 'star_desc',}"></i>
                <i :class="{'bi bi-arrow-up': true,'text-black-50': sort == 'star',}"></i>
              </th>
              <th @click="sortbyDate" class="fw-bold bg-light">Thời gian
                <i :class="{'bi bi-arrow-down': true,'text-black-50': sort == 'date_desc'}"></i>
                <i :class="{'bi bi-arrow-up': true,'text-black-50': sort == 'date'}"></i>
              </th>

              <th class="fw-bold bg-light">Nội dung</th>

              <th class="fw-bold bg-light">Tuỳ chọn</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in data.items" :key="item.id">
              <td>{{ item.productId }}</td>

              <td>{{ item.accountId }}</td>

              <td>{{ item.star }}</td>

              <td>{{ gettime(item.createAt) }}</td>

              <td :title="item.conntent">{{ maxcontent(item.conntent) }}</td>

              <td>
                <div class="d-flex">

                  <a class="ms-2" @click="ShowEdit(item)">
                    <i class="bi bi-pencil-fill text-blue fs-5"></i>
                  </a>

                  <a class="ms-2" @click="OnDelete(item.id)">
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
import {GetAll,Delete}from "../../modules/admin/Comment_Manager.js";
import Edit from "../../components/Admin/Comments/Edit.vue";
import FilterForm from "../../components/Admin/Comments/FilterForm.vue";
import { useRoute } from 'vue-router';
export default {
  components: {  Edit, FilterForm },
  setup() {
    const route=useRoute()
    const data = ref({ items: [] });
    const loading = ref(true);
    const pageindex = ref(1);
    const pagesize = ref(25);
    const listpagesize = ref([25, 50, 75, 100]);
    const totalpage = ref(1);
    const filterObj = ref({accountid:''});
    const sort = ref();
    const isShowEdit = ref(false);
    const comment_pick = ref();
    const maxcontent=(content)=>{
      if(content.length>40)
      return content.slice(0,40)+'....'
    return content
    }
    const sortbyDate = async () => {
      if (sort.value == "date") sort.value = "date_desc";
      else sort.value = "date";
      await Getdata();
    };
    const sortbyStar = async () => {
      if (sort.value == "date") sort.value = "date_desc";
      else sort.value = "date";
      await Getdata();
    };
    const gettime = (time) => new Date(time).toLocaleString()
     
    onMounted(async () => {
      try {
        if(route.params.accountId)
          filterObj.value.accountid=route.params.accountId
        await Getdata();
        totalpage.value = data.value.totalPages;
        loading.value = false;
      } catch (error) {
        loading.value = false;
        alert(error);
      }
    });
    //lấy dữ liệu
    const Getdata = async () => {
      data.value= await GetAll(
        pageindex.value,
        pagesize.value,
        filterObj.value,
        sort.value
      );
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

    //hiển thị form chỉnh sửa
    const ShowEdit = (e) => {
      isShowEdit.value = true;
      comment_pick.value = e;
    };
    //thay đổi số lượng hiển thị
    const changepagesize = async (e) => {
      pageindex.value = 1;
      pagesize.value = e.target.value;
      await Getdata();
      totalpage.value = data.value.totalPages;
    };
    const onReload=async()=>await Getdata()
    //Xoá đánh giá khỏi CSDL
    const OnDelete = (id) => {
      Swal.fire({
        title: "Bạn chắc chứ?",
        text: "Thao tác này sẽ xoá hoàn toàn bài đánh giá!",
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
      pagesize,
      listpagesize,
      changepage,
      changepagesize,
      pageindex,
      totalpage,
      sort,
      loading,
      gettime,
      sortbyDate,
      sortbyStar,
      isShowEdit,
      ShowEdit,
      comment_pick,
      getFildata,
      removeFil,
      OnDelete,
      onReload,
      maxcontent
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
