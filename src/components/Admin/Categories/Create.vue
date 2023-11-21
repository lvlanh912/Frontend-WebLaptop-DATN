<template>
  <div :class="'modal-backdrop pt-5 model-show'">
    <div class="modal-dialog" style="min-width: 700px">
      <div class="modal-content rounded-4">
        <div class="modal-header">
          <h5 class="modal-title text-blue">Tạo mới danh mục</h5>
          <button @click="closeform" type="button" class="btn-close"></button>
        </div>
        <form>
          <div class="modal-body">
            <div class="row mb-2">
              <div class="col-lg-6">
                <div class="form-group">
                  <label>Tên danh mục</label>
                  <input v-model="category.name" type="text" class="form-control" placeholder="ex: lvlanh" />
                </div>
              </div>

              <div class="col-lg-6" v-if="ParentCategory">
                <div class="form-group mb-4">
                  <label>Danh mục cha</label>
                  <input v-model="ParentCategory.name" type="email" class="form-control" readonly />
                </div>
              </div>
            </div>
          </div>
        </form>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeform">
            Close
          </button>
          <button type="button" @click="onsubmit" class="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, reactive, onBeforeMount, computed } from "vue";
import Category from "../../../model/Category.js";
import {  Add,validateData} from "../../../modules/admin/Category_Manager";
export default {
  props:{
    ParentCategory:{
      require:false
    }
  },
  setup(props, { emit }) {
    const category = reactive(new Category());
    const ParentCategory=reactive(props.ParentCategory)
    if(ParentCategory){
      category.ParentCategoryId=ParentCategory.id
    }
    async function onsubmit() {
      //kiểm tra tính hợp lệ
      if (validateData(category)!=undefined) {
       return  Swal.fire({
            icon: "error",
            title: "Thất bại",
            text: validateData(category),
          }); 
      }
        try {
          await Add(category);
          emit('reloadData')
          Swal.fire({
            icon: "success",
            title: "Thành công",
            text: "Đã tạo thành công danh mục mới",
          }).then(() => closeform());
        } catch (err) {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Thất bại",
            text: err.response.data.Message,
          });
        }
      
    }
    const closeform=()=> {
      emit("CloseEdit");
    }
    return {
      ParentCategory,
      closeform,
      category,
      onsubmit,
    };
  },
};
</script>

<style scoped>
.modal-backdrop {
  background-color: #0000005b;
}

.rounded-4 {
  border-radius: 2rem !important;
}
.model-show{
  overflow-x:hidden;
  overflow-y: auto;
}
</style>
