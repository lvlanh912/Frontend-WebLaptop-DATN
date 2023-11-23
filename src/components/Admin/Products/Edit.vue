<template>
  <div :class="'modal-backdrop pt-5 model-show'">
    <div class="modal-dialog" style="min-width: 700px">
      <div class="modal-content rounded-4">
        <div class="modal-header">
          <h5 class="modal-title text-blue">Cập nhật thông tin sản phẩm</h5>
          <button @click="closeThis" type="button" class="btn-close"></button>
        </div>
        <form>
          <div class="modal-body">
            <div class="input-group mb-3 col-12">
              <label class="col-2 align-self-center">Ảnh sản phẩm</label>
              <image-uploader :inputImage="images_products" ref="UploadComponent" />
            </div>
            <div class="row mb-2">
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Tên sản phẩm</label>
                  <input v-model="product.productName"  type="tex" class="form-control"  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Giá sản phẩm</label>
                  <input @keyup="onlyNumber" v-model="product.price"  type="tex" class="form-control"  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Giá tối đa</label>
                  <input @keyup="onlyNumber" v-model="product.maxPrice"  type="tex" class="form-control"  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Tên thương hiệu hoặc nhà sản xuất</label>
                  <input v-model="product.brandName"  type="tex" class="form-control"  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Trọng lượng (gam)</label>
                  <input @keyup="onlyNumber" v-model="product.weight"  type="tex" class="form-control"  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Số lượng</label>
                  <input @keyup="onlyNumber" v-model="product.stock"  type="tex" class="form-control"  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label>Đã bán</label>
                  <input @keyup="onlyNumber" v-model="product.sold"  type="tex" class="form-control"  />
                </div>
              </div>
              <!-- Danh mục sản phẩm -->
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label class="mb-2">Danh mục sản phẩm</label>
                  <!-- Danh mục của sản phẩm -->
                  <div v-if="listCategoryChoose.length>0">
                    <div v-for="item,index in listCategoryChoose" :key="index" class="my-1 border d-flex justify-content-between">
                    <span class="text-blue  p-2 ">{{ item.name }}</span>
                    <i @click="onRemoveCategory(index)" class="bi bi-trash3-fill text-red align-self-center me-2 btn"></i>
                  </div>
                  </div>
                  <!--  -->
                  <div class="dropdown mt-2">
                      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" >
                        Chọn danh mục
                      </button>
                      <ul class="dropdown-menu">
                        <input @input="GetListCatagory" v-model="nameCategory" placeholder="Tìm danh mục"  type="text" class="form-control" />
                        <p v-if="loading" class="spinner-border"></p>
                      <li v-if="listCategory.length==0" class=" dropdown-item" >Không tồn tại danh mục</li>
                      <li v-for="category,index in listCategory" :key="index" @click="onChooseCategory(category)"
                      class="dropdown-item">{{ category.name }}</li>
                      </ul>
                    </div>
                </div>
              </div>
              <!-- Thuộc tính tuỳ chỉnh -->
              <div class="col-12">
                <div class="form-group mb-4">
                  <label>Thuộc tính sản phẩm</label>
                  <div class="ms-2 btn-group">
                      <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Loại sản phẩm
                      </button>
                      <span class="text-blue align-self-center ms-2 fw-bold">{{choose_template.name  }}</span>
                      <ul class="dropdown-menu">
                        <li v-for="item,index in Template_Speacial" :key="index">
                          <a @click="onSetTemplate(item)" class="dropdown-item" href="#">{{ item.name }}</a></li>
                      </ul>
                    </div>
                  <table class=" table">
                    <thead>
                      <th class="text-center">Tên thuộc tính</th>
                      <th class="text-center">Giá trị</th>
                    </thead>
                    <tbody>
                      <tr v-for="item,index in listSpecial" :key="index">
                        <td><input v-model="item.k" class="form-control" type="text"></td>
                        <td><input v-model="item.v" class="form-control" type="text"></td>
                        <td @click="onRemoveCategory(index)">
                          <span class="btn btn-danger"> <i class="bi bi-trash2"></i> </span>
                         </td>
                      </tr>
                      <tr>
                        <td><input class="form-control" type="text"></td>
                        <td><input class="form-control" type="text"></td>
                        <td><span  class="btn btn-info" >
                          <i @click="AddSpeacial" class="bi bi-plus text-white"></i>
                        </span></td>
                      </tr>
                    </tbody>
                  </table>
                 
                </div>
              </div>
            </div>
          </div>
        </form>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeThis">
            Close
          </button>
          <button type="button" @click="onSave" class="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
import { TemplateSpeacial,ValidateData,FindCategory,GetListCategoryByListid,Edit } from "../../../modules/admin/Product_Manager";
import ImageUploader from "./ImageUploader.vue";
export default {
  components:{
    ImageUploader
  },
  props: {
    product: {
      required: true,
    },
  },
  setup(props, { emit }) {
    const product = reactive(props.product)
    const images_products=ref(product.images.map(e=>backendHost+'/images/products/'+e))
    const UploadComponent=ref(null)
    const nameCategory=ref('')
    const listCategory=ref([])
    const loading=ref()
    const listCategoryChoose=ref([])
    const listSpecial=ref(product.special)
    const Speacial=ref({
      k:'',
      v:''
    })
    const Template_Speacial=ref(TemplateSpeacial)
    const choose_template=ref('')

    onBeforeMount(async ()=>{
      listCategoryChoose.value=await GetListCategoryByListid(product.categories)
    })
    const onlyNumber=(e)=>{
      if (!e.target.value.match(/^\d+$/))e.target.value = "";
    }
    let timeoutId
    const GetListCatagory= ()=>{
      clearTimeout(timeoutId);
      try{
        timeoutId = setTimeout(async ()=> {
          if(nameCategory.value.trim()!=''){
            loading.value=true
            listCategory.value=await FindCategory(nameCategory.value.trimEnd().trimStart())
            loading.value=false
          }
        }, 1000);
      }
      catch{}
    }
    const onChooseCategory=(category)=>{
      if(!listCategoryChoose.value.some(e=>e.id===category.id))
        listCategoryChoose.value.push(category)
    }
    const onRemoveCategory=(index)=>{
      listCategoryChoose.value.splice(index,1)
    }
    const onSetTemplate=(Template)=>{
      choose_template.value=Template
      listSpecial.value=Template.special
    }
    const AddSpeacial=(e)=>{
      const k= e.target.parentElement.parentElement.parentElement.children[0].children[0];
      const v=e.target.parentElement.parentElement.parentElement.children[1].children[0];
      if(k.value!=''&&v.value!=''){
        listSpecial.value.push({k:k.value,v:v.value})
        k.value='',
        v.value=''
      }
    }

    const closeThis=()=> emit("closeEdit")
    async function onSave() {
      images_products.value=UploadComponent.value.Images
      product.categories=listCategoryChoose.value.map(e=>e.id)
      product.special=listSpecial.value
      const isValid=ValidateData(product,images_products.value)
      if (isValid) 
        Swal.fire({
            icon: "error",
            title: "Thất bại",
            text: isValid,
          });
      else {
        try {
          await Edit(product, images_products.value);
          Swal.fire({
            icon: "success",
            title: "Thành công",
            text: "Thêm sản phẩm mới thành công",
          }).then(() => {
            emit('reload')
            closeform()
          });
        } catch (err) {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Thất bại",
            text: err.response.data.Message,
          });
        }
      }
    }
    return {  closeThis,
       product,
       images_products,
        onSave,
         loading,
      nameCategory,
      listCategory,
      listSpecial,
      Speacial,
      Template_Speacial,
      choose_template,
      onSetTemplate,
      AddSpeacial,
      GetListCatagory,
      onChooseCategory,
      onRemoveCategory,
      listCategoryChoose,
      UploadComponent,
      onlyNumber, };
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