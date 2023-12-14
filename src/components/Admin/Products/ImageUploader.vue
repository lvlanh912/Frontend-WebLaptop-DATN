<template>
  <div class="w-100">
    <div class="d-flex justify-content-center position-relative">
      <div class="d-flex flex-wrap">
        <div
          v-for="(image, index) in imagesView"
          :key="index"
          class="position-relative border border-1 align-self-center"
        >
          <img style="width: 193px" class="img-fluid" :src="image" alt="" />
          <button
            type="button"
            @click="RemoveImage(index)"
            class="btn btn-danger position-absolute top-0 start-0 py-1"
            ><i class=" bi bi-trash"></i></button
          >
        </div>
        <label for="file-upload" class="p-2">
          <div
            class="d-flex flex-column justify-content-center bg-blue text-center"
            style="width: 193px; height: 193px"
          >
            <i
              class="bi bi-plus-circle-fill text-white fs-1 align-self-center"
            >
        </i>
        <p class="fw-bold text-white">Thêm mới</p>
          </div>
        </label>
        <input
          id="file-upload"
          class="form-control"
          @change="AddImage"
          type="file"
          accept=".png, .jpg, .jpeg, .webp"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, ref } from "vue";
import {LinkImagetoFile} from '../../../modules/admin/Product_Manager.js'
export default {
  props:{
    //linkimage
    inputImage:{
      require:false
    }
  },
  setup(props, { emits }) {
    const imagesView = ref([]);
    const Images=ref([])
    onMounted(async ()=>{
      if(props.inputImage){
        for(let i=0;i<props.inputImage.length;i++)
        {
          Images.value.push(await LinkImagetoFile(props.inputImage[i]))
          imagesView.value.push(URL.createObjectURL(Images.value[i]))
        }
      }
    })
    const UploadChange = () => {};
    const AddImage = (e) => {
        imagesView.value.push(URL.createObjectURL(e.target.files[0]));
        Images.value.push(e.target.files[0])
      e.target.value = "";
    };
    const RemoveImage = (index) =>{ 
        imagesView.value.splice(index, 1);
        Images.value.splice(index,1)
    }

    return {
      AddImage,
      Images,
      imagesView,
      RemoveImage,
      UploadChange,
    };
  },
};
</script>

<style>
input[type="file"] {
  display: none;
}
</style>
