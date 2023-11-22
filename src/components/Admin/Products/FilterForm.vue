<template>
  <div class="d-flex flex-column col ms-lg-3 ">
    <div class="card">
      <div class=" mb-2 mt-2 mx-2">
        <input v-model="filterobj.keywords" @input="Search" class="rounded-2 form-control px-3" type="text"
          @click="isOpenFilter=true" placeholder="Nhập tên sản phẩm cần tìm" />
        <Transition>
          <div class="" v-show="isOpenFilter">
           
            <div class="form-control border-0">
              <strong class="form-label">Danh mục</strong>
              <label class="ms-2 text-blue">{{ selected_categoryname }} </label>
              <div class="dropdown mt-2">
              <a class="btn btn-primary dropdown-toggle w-100" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-plus-circle"></i>
                Chọn danh mục
              </a>
              <ul class="dropdown-menu w-100">
                <input @input="GetListCatagory" v-model="nameCategory" class="px-2 w-100" type="text" placeholder="Nhập tên danh mục">
                <p v-if="loading" class="spinner-border"></p>
                <li v-if="listCategory.length==0" class=" dropdown-item" >Không tồn tại danh mục</li>
                <li v-for="category,index in listCategory" :key="index" @click="onChooseCategory(category)"
                 class="dropdown-item">{{ category.name }}</li>
              </ul>
            </div>
            </div>
            <div class="form-control border-0">
              <strong class="form-label d-block">Tên thương hiệu</strong>
                <input class=" form-control" type="text" v-model="filterobj.brand">
            </div>
            <div class="form-control border-0">
              <strong class="form-label d-block">Giá sản phẩm</strong>
              <div class="d-flex">
                <input @keyup="onlyNumber" class="form-control" type="text" v-model="filterobj.min">
               <span class="px-2 mx-1 align-self-center" >Đến</span>
                <input @keyup="onlyNumber" class="form-control" type="text" v-model="filterobj.max" >
              </div>
            </div>
            <div class="d-flex justify-content-center gap-3">
              <button @click="onCancel" class="btn btn-primary mt-2 px-4">Huỷ lọc</button>
              <button @click="onSubmit" class="btn btn-success mt-2 px-4">Xác nhận</button>
              <button @click="isOpenFilter=false" class="btn btn-danger mt-2 px-4"> Đóng</button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
  import { reactive, ref, watch } from 'vue'
  import {FindCategory} from '../../../modules/admin/Product_Manager.js'
  export default {
    setup(_,{emit}) {
      const isOpenFilter = ref(false)
      const nameCategory=ref('')
      const listCategory=ref([])
      const loading=ref()
      const filterobj = reactive({
        keywords: '',
        category: '',
        brand: '',
        min: '',
        max: '',
      })
      const selected_categoryname=ref('')
      let timeoutId
      const GetListCatagory= ()=>{
        clearTimeout(timeoutId);
        try{
          timeoutId = setTimeout(async ()=> {
            if(nameCategory.value.trim()!='')
            loading.value=true
            listCategory.value=await FindCategory(nameCategory.value.trimEnd().trimStart())
            loading.value=false
          }, 1000);
        }
        catch{}
      }
      const onChooseCategory=(category)=>{
        filterobj.category=category.id
        selected_categoryname.value=category.name
      }
      const onlyNumber=(e)=>{
        if (!e.target.value.match(/^\d+$/)) {
        e.target.value = "";
      }
      }
      const onSubmit=()=>emit("filData",filterobj)
      const onCancel=() =>{
        filterobj.category=''
        filterobj.brand=''
        filterobj.keywords=''
        filterobj.max=''
        filterobj.min=''
        selected_categoryname.value=''
        emit("CancelFil")
      }
      return {loading,selected_categoryname,
         nameCategory,listCategory,onChooseCategory,
          GetListCatagory,isOpenFilter, filterobj,
          onlyNumber,
           onSubmit,onCancel }
    }
  }
</script>

<style>

</style>