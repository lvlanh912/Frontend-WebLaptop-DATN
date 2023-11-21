<template>
  <div :class="'modal-backdrop pt-5 model-show'">
    <div class="modal-dialog" style="min-width: 700px">
      <div class="modal-content rounded-4">
        <div class="modal-header">
          <h5 class="modal-title text-blue">Tạo bài viết mới</h5>

          <button @click="closeThis" type="button" class="btn-close"></button>
        </div>

        <form>
          <div class="modal-body">
            <div class="row mb-2">
              <div class="col-12">
                <div class="form-group">
                  <label class="form-label">Tiêu đề tin</label>

                  <input
                    v-model="news.title"
                    type="text"
                    class="form-control"
                    placeholder="Nhập tiêu đề tin"
                  />
                </div>
              </div>

              <div class="col-12">
                <div class="form-group">
                  <label for="" class="form-label">Nội dung tin</label>
                 <rich-text ref="richtext"></rich-text>
              </div>
            </div>
            </div>
          </div>
        </form>
        <div class="modal-footer">
          <button @click="closeThis" type="button" class="btn btn-secondary">
            Huỷ
          </button>

          <button @click="onSubmit" type="button" class="btn btn-primary">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch } from "vue";
import { Add,DataConvert } from "../../../modules/admin/News_Manager.js";
import News from "../../../model/News.js";
import RichText from "./RichText.vue"


export default {
  components:{
    RichText
  },
  setup(props, {emit}) {
    const news = reactive(new News());
    const closeThis = () => emit("closeAdd");
    const richtext=ref(null)
    const result=ref()
    const QuillData=ref('')
    //add upload images
    async function onSubmit() {
      //lấy dữ liệu trong quill
      QuillData.value= richtext.value.GetContent()
      //xử lý ảnh upload trong quill
      const dataConvert=ref(null)
      try{
        dataConvert.value = DataConvert(QuillData.value)
      }
      catch(Error){
        Swal.fire({
          icon: "warning",
          title: Error,
        });
        return
      }
     news.content=dataConvert.value.data;
     result.value = await Add(news,dataConvert.value.imageFile)
      //dữ liệu chưa valid hoặc lỗi trả từ bên server hoặc mất mạng :)))
      if (!result.value.success)
        Swal.fire({
          icon: "warning",
          title: result.value.data,
        });
      else {
        Swal.fire({
          icon: "success",
          title: "Thêm thành công",
        });
        closeThis()
        emit("reloadData")
      }
    }
  
    return {
      richtext,
      news,
      onSubmit,
      closeThis,
    };
  },
};
</script>

<style></style>
