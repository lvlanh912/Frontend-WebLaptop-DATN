<template>
  <div :class="'modal-backdrop pt-5 model-show'">
    <div class="modal-dialog" style="min-width: 700px">
      <div class="modal-content rounded-4">
        <div class="modal-header">
          <h5 class="modal-title text-blue">Chỉnh sửa bài viết</h5>

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
                 <rich-text :data="news.content" v-if="displayQuill" ref="richtext"></rich-text>
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
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
import RichText from "./RichText.vue";
import { Edit,getContentWithImage,DataConvert } from "../../../modules/admin/News_Manager.js";

export default {
  components:{
    RichText
  },
  props: {
    News: {
      require: true,
    },
  },
setup  (props, { emit }) {
    const news = reactive(props.News);
    const result = ref(true);
    const richtext=ref(null)
    const displayQuill=ref(false)
    const QuillData=ref('')
     
    const closeThis = () => emit("CloseEdit");
    onBeforeMount(async ()=>{
      news.content=await getContentWithImage(news)
      displayQuill.value=true
    })
    //đổi định dạng để hiển thị trên select
    async function onSubmit() {
    //Lấy data từ quilljs
      QuillData.value=richtext.value.GetContent()
      const dataConvert =  DataConvert(QuillData.value)
      news.content=dataConvert.data;
      result.value= await Edit(news,dataConvert.imageFile)
      //dữ liệu chưa valid hoặc lỗi trả từ bên server hoặc mất mạng :)))
      if (!result.value.success) {
        emit("reloadData");
        Swal.fire({
          icon: "warning",
          title: result.value.data,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Thành công",
        });
        emit("reloadData");
        closeThis()
      }
    }
    return {
      displayQuill,
      news,
      onSubmit,
      closeThis,
      richtext
    };
  },
};
</script>

<style></style>
