<template>
  <div :class="'modal-backdrop pt-3 model-show'">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header justify-content-end border-bottom-0">
          <div class="col-12 text-center">
            <h5 class="text-blue">CHỈNH SỬA THÔNG TIN</h5>
          </div>
          <button
            @click="closeThis"
            type="button"
            class="btn-close m-0"
          ></button>
        </div>
        <div class="modal-body pt-0">
          <div class="row no-gutters">
            <div class="col-12">
              <div class="px-4 d-flex flex-column justify-content-center align-content-center">
                <div class="form-group">
                  <p class="mb-0 pt-2 text-darker">Tên danh mục</p>
                  <input
                    class="form-control"
                    v-model="category_payload.name"
                    type="text"
                  />
                </div>
                <div class="form-group">
                  <p class="mb-0 pt-2 text-darker">Danh mục cha: {{ Parent_category!=null?Parent_category.name:'' }}</p>
                  <input
                    @change="ValidID"
                    class="form-control"
                    v-model="category_payload.parentCategoryId"
                    type="text"
                  />
                  <span  class="form-text text-red">{{ error }}</span>
                  
                </div>
              </div>
              <div class="d-flex justify-content-center justify-content-md-end">
                <button @click="closeThis" class="btn btn-danger px-2 me-2">
                  <strong>Huỷ</strong>
                </button>
                <button @click="onSave" class="btn btn-success px-4">
                  <strong>Lưu lại</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, reactive, ref } from "vue";
import { Edit,GetbyId,validateId } from "../../../modules/admin/Category_Manager";
export default {
  props: {
    category: {
      required: true,
    },
  },
  setup(props, { emit }) {
    const category_payload = props.category
    const Parent_category=ref(null)
    const error=ref()
    onBeforeMount(async()=>{
      if(category_payload.parentCategoryId!=null&&validateId(category_payload.parentCategoryId)==undefined)
        Parent_category.value=await GetbyId(category_payload.parentCategoryId)
    })
    const closeThis=()=> emit("CloseEdit")
    const ValidID=async ()=>{
     error.value= validateId(category_payload.parentCategoryId)
     if(error.value==undefined)
      Parent_category.value=await GetbyId(category_payload.parentCategoryId)
    }
    const onSave = async () => {
      try {
        await Edit(category_payload);
        emit("reload")
        Swal.fire({
          icon: "success",
          title: "Thành công",
        });
        closeThis()

      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Thất Bại",
          text: err.response.data.message??err.message,
        });
      }
    };
    return { closeThis, category_payload, onSave,Parent_category,ValidID,error };
  },
};
</script>

<style scoped>
.modal-backdrop {
  background-color: #0000005b;
}

.model-show {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>