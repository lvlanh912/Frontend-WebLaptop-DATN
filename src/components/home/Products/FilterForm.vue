<template>
    <div class="d-flex flex-column col col-lg-8 ms-lg-3 shadow me-5  ">
     <div class="card bg-light">
      <div class=" mb-2 mt-2 mx-2 row">
       <input v-model="filterobj.keywords" class="rounded-2 form-control px-3" type="text" placeholder="Nhập tên sản phẩm cần tìm" />
       <Transition>
        <div class="row">
         <div v-if="filterobj.category==''" class="d-none form-control border-0">
          <strong class="form-label">Danh mục</strong>
          <label class="ms-2 text-blue">{{ selected_categoryname }} </label>
          <div class="dropdown mt-2 ">
           <a class="btn btn-primary dropdown-toggle w-100" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-plus-circle"></i> Chọn danh mục </a>
           <ul class="dropdown-menu w-100">
            <input @input="GetListCatagory" v-model="nameCategory" class="px-2 w-100" type="text" placeholder="Nhập tên danh mục">
            <p v-if="loading" class="spinner-border"></p>
            <li v-for="category,index in listCategory" :key="index" @click="onChooseCategory(category)" class="dropdown-item">{{ category.name }}</li>
           </ul>
          </div>
         </div>
        
          <div class="col-lg-6 mt-2">
              <label  class="form-label fw-bold">Tình trạng hàng</label>
              <select v-model="filterobj.stock"  class="form-select" >
                <option :value="''">Tất cả</option>
                <option :value="true">Còn hàng</option>
                <option :value="false">Hết hàng</option>
              </select>
          </div>
          <div class="col-lg-6 mt-2">
          <strong class="form-label d-block">Tên thương hiệu</strong>
          <input class=" form-control" type="text" v-model="filterobj.brand">
         </div>
         <div class="col mt-2">
          <strong class="form-label d-block">Giá sản phẩm</strong>
          <div class="d-flex justify-content-between">
            <div class="">
                <input @keyup="onlyNumber" class="form-control" type="text" v-model="filterobj.min">
                <span class="inherit text-center text-muted">{{toVND(filterobj.min)}}</span>
            </div>
           <span class="px-2 mx-1 align-self-center pb-4">Đến</span>
           <div class="d-flex flex-column">
               <input @keyup="onlyNumber" class="form-control" type="text" v-model="filterobj.max">
               <span class="inherit text-center text-muted">{{toVND(filterobj.max)}}</span>
           </div>
          </div>
         </div>
         <div class="d-flex justify-content-center gap-3">
          <button @click="onCancel" class="btn btn-primary mt-2 no-wrap">Huỷ lọc</button>
          <button @click="onSubmit" class="btn btn-success mt-2 no-wrap">Xác nhận</button>
          <button @click="onClose" class="btn btn-danger mt-2 no-wrap"> Đóng</button>
         </div>
        </div>
       </Transition>
      </div>
     </div>
    </div>
   </template>
   <script>
    import {computed,onMounted,reactive,ref,watch} from 'vue'
   import {onBeforeRouteUpdate} from 'vue-router'
    import {
     FindCategory,GetnameCategory
    } from '../../../modules/home/HomeAPI.js'
import { useRoute } from 'vue-router'
    export default {
     props: {
      categoryId: {
       require: false
      }
     },
     setup(props, {emit}) {
      const router=useRoute()
      const nameCategory = ref('')
      const listCategory = ref([])
      const loading = ref()
      const filterobj = reactive({
       keywords: '',
       category: '',
       category:'',
       brand: '',
       min: '',
       max: '',
       stock:'',
      })
      const selected_categoryname =ref('')
      //load đầu
      onMounted(()=>{
        filterobj.category=router.params.categoryID??''
      })
      onBeforeRouteUpdate(async (to, from, next) => {
            onCancel()
            next()
        })
      let timeoutId
      const GetListCatagory = () => {
       clearTimeout(timeoutId);
       try {
        timeoutId = setTimeout(async () => {
         if (nameCategory.value != '') loading.value = true
            listCategory.value = await FindCategory(nameCategory.value.trimEnd().trimStart())
         loading.value = false
        }, 1000);
       } catch {}
      }
      const onChooseCategory = (category) => {
       filterobj.category = category.id
       selected_categoryname.value = category.name
      }
      const onlyNumber = (e) => {
       if (!e.target.value.match(/^\d+$/)) {
        e.target.value = "";
       }
      }
      const toVND=(n)=>new Intl.NumberFormat("vi-VN", {style: "currency",currency: "VND",}).format(n)
      
      const onSubmit = () => emit("filData", filterobj)
      const onCancel = () => {
       emit("CancelFil")
       onClose()
      }
      const onClose=()=>emit("closeFilter")
      return {
       loading,
       selected_categoryname,
       nameCategory,
       toVND,
       listCategory,
       onChooseCategory,
       GetListCatagory,
       filterobj,
       onlyNumber,
       onSubmit,
       onCancel,
       onClose
      }
     }
    }
   </script>
   <style></style>../../../modules/home/ClientAction.js../../../modules/home/HomeAPI.js