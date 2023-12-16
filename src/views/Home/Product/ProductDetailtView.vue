<template>
  <main>
    <crumb :product="product"/>
    <transition name="slide-fade">
    <div v-if="isShow" class="card">
      <!-- product name -->
      <span class="px-2 w-100 fw-bolder fs-3 pt-3">
        {{ product.productName }}
      </span>
      <hr />
      <!-- product infor content -->
      <div class="row">
        <!-- image -->
        <div class="col-12 col-lg-6 position-relative">
          <!-- image big -->
          <transition name="slide-fade" :duration="4000" >
            <div v-show="Ishowimage" style="height: 375px;" class="d-flex justify-content-center position-relative overflow-hidden">
              <img
                :src="show_image ?? list_image[0]"
                alt=""
                class="img-big position-absolute"
              />
            </div>
          </transition>
          <hr>
          <!-- image list -->
          <div class=" mt-3 list-image row m-0 ps-1">
           <div class="col-5 col-md-3 col-lg-3 px-0 ms-0 mt-2"  v-for="(item, index) in list_image" :key="index">
            <img
              @click="onShowImage(item)"
              :src="item"
              alt=""
              class="img-big"
              style=" max-height: 100px"
            />
           </div>
          </div>

        </div>

        <div class="col-12 col-lg-6">
          <!-- review -->
          <div class="d-flex head-infor mt-4 mt-lg-0">
            <p>
              <label class="align-self-center">Số lượng còn:</label>
              <span class="ms-2">
                {{ product.stock }}
              </span>
            </p>
            <p>
              <label class="align-self-center">
                <i class="bi bi-coin text-yellow"></i>
                Đã bán
                <span class="ms-2">{{ product.sold }}</span>
              </label>
            </p>
            <p>
              <label class="align-self-center">
                <i class="bi bi-eye-fill text-blue"></i>
                Lượt xem:
                <span class="ms-2">{{ product.view }}</span>
              </label>
            </p>
          </div>
          <!-- Giá sản phẩm -->
          <div class="price me-2 d-flex justify-content-around">
            <div>
              <p class="text-blue fw-bold fs-3 d-inline">
                {{ toVND(product.price) }}
              </p>
              <p
                class="fw-bolder ms-2 d-inline text-decoration-line-through text-secondary fs-6"
              >
                {{ toVND(product.maxPrice) }}
              </p>
              <span class="product-discout badge ms-1">{{ discount }}%</span>
              <p class="baohanh text-white p-2 fs-5">Bảo hành 6 tháng</p>
            </div>
            <p class="fs-6 text-muted d-inline text-red align-self-center">Tiết kiệm {{ toVND(product.maxPrice-product.price) }}</p>
          </div>
          <!-- ưu đãi -->
          <div class="promote bg-white border border-pink rounded-3 me-2">
            <p class="bg-pink text-red m-0 fw-bolder px-2">
              <i class="bi bi-gift"></i>
              Quà tặng và ưu đãi kèm theo
            </p>
            <ul class="list-unstyled ms-3">
              <li class="py-1 fw-bolder text-danger">
                <i class="bi bi-star-fill text-yellow"></i>
               Bảo hành 1 đổi 1 trong vòng 30 ngày
              </li>
            </ul>
          </div>
          <!-- button -->
          <div class="d-flex gap-2 px-3">
            <router-link :to="{name:'checkout'}" @click="onBuynow"
              class="mt-3 w-100 bg-red text-center text-white btn align-self-center"
            >
              MUA NGAY
              <p class="d-none d-lg-block m-0">Giao hàng tận nơi nhanh chóng</p>
            </router-link >
            <button @click="OnAddtoCart"
              class="mt-3 w-100 bg-blue text-center text-white btn align-self-center"
            >
              THÊM VÀO GIỎ HÀNG
              <p class="d-none d-lg-block m-0">
                Thêm vào giỏ hàng để chọn tiếp
              </p>
            </button>
          </div>
        </div>
        <!-- Thuộc tính sản phẩm -->
        <div class="d-flex flex-column mt-3 col-12 col-md-8 col-lg-6">
          <label for="" class="fs-4 fw-bold text-center">Chi tiết sản phẩm</label>
          <ul class="ps-3 list-unstyled">
            <li v-for="item,index in product.special" :key="index" class="me-2  border row">
              <p class=" m-0 py-2 align-self-center col text-uppercase fw-bold border-end">{{ item.k }}</p>
              <p class=" m-0 py-2 col">{{ item.v }}</p>
            </li>
            
          </ul>
        </div>
        <!-- Bình luận/Đánh giá -->
        <div class="col-12 col-md-4 col-lg-6 px-2">
          <comment :productId="product.id"  />
        </div>
      </div>
    </div>
  </transition>
  <!-- Sản phẩm bán chạy -->
    <section class="row m-0 my-3">
        <h4 class="text-blue fw-bold">Sản phẩm bán chạy</h4>
      <product v-for="item in listProduct" :key="item.id" :item="item" ></product>
    </section>
  </main>
</template>

<script>
import Comment from "../../../components/home/Products/Comments.vue"
import Crumb from "../../../components/home/Products/Crumb.vue"
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router"
import {GetProductbyId,InsertView,GettopProductSold,AddtoCart} from "../../../modules/home/HomeAPI.js"
import {ref, computed, onMounted} from "vue"
import product from "../../../components/home/Product.vue"
import Sanphamtuongtu from "../../../components/sanphamtuongtu.vue"
import { useStore } from 'vuex'
export default {
  components: {
    Comment,
    Sanphamtuongtu,
    Crumb,
    product
  },
  setup() {
    
    const route = useRoute()
    const store=useStore()
    const Ishowimage=ref(false)
    const productId = ref("")
    const product = ref({images: []})
    const listProduct=ref([])
    const show_image = ref()
    const isShow=ref(false)
    function toVND(n) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(n)
    }
    const list_image = computed(() =>
      product.value.images.map(
        (item) => backendHost + "/images/products/" + item
      )
    )
    const getData = async () => {
      await InsertView(  productId.value)
      product.value = await GetProductbyId(  productId.value)
      document.title=product.value.productName
    }
  const OnAddtoCart=async()=> {
        try{
          await AddtoCart({
            productId:productId.value,
            quantity:1
          })
          Swal.fire({
            icon: "success",
            title: "Thành công",
            text: "Sản phẩm đã được thêm vào giỏ hàng của bạn",
          })

          store.dispatch("UpdateTotalCart")
        }
        catch(err){
          if(err.response){
            if(err.response.status==403){
              Swal.fire({
                icon: "warning",
                title: "Lỗi",
                text: "Vui lòng đăng nhập để thực hiện chức năng này",
          })}

          }
          else
          Swal.fire({
            icon: "warning",
            title: "Lỗi",
            text: err.message,
          })
        }
        
      }
  const onBuynow=async()=>{
    store.dispatch("SetItemCheckout",[{
      product:product.value,
      quantity:1
    }])

  }
    onMounted(async () => {
      window.scrollTo(0,0)
      productId.value = route.params.productId
      await getData()
      Ishowimage.value=true
      isShow.value=true
      const data=await GettopProductSold(12)
      listProduct.value=data.items
    })
    onBeforeRouteUpdate( async(to,from,next)=>{
      isShow.value=false
      productId.value = to.params.productId
      await getData()
      show_image.value=null
      window.scrollTo(0,0)
      isShow.value=true
      next()
     
    })
    const onShowImage=(item)=>{
      Ishowimage.value=false
      show_image.value=item
      Ishowimage.value=true
    }

    const discount = computed(() => {
      return 100 - ((product.value.price / product.value.maxPrice) * 100).toFixed(0)
    })

    return {
      route,
      product,
      toVND,
      discount,
      list_image,
      show_image,
      Ishowimage,
      onShowImage,
      isShow,
      listProduct,
      OnAddtoCart,
      onBuynow
      
    }
  },
}
</script>

<style scoped>
.list-image {
  transition: transform 0.7s linear;
  text-align: center;
}
.img-big {
  width: auto;
  height: 375px;
}
.active {
  transform: translateY(-7px);
}
.head-infor label {
  font-weight: 600;
}
.head-infor p {
  margin: 0 8px 0 0;
  padding: 0 8px 0 0;
  position: relative;
}
.head-infor p:not(:last-child)::after {
  content: "";
  width: 1px;
  height: 16px;
  background: #a3a3a3;
  position: absolute;
  right: 0;
  bottom: 0;
  margin-bottom: 3px;
}
.head-infor span {
  color: var(--product-price);
  font-weight: 500;
  font-size: medium;
}
.product-discout {
  animation: blink 0.8s ease-in-out infinite alternate;
}
@keyframes blink {
  from {
    color: #a3a3a3;
    background-color: white;
  }
  to {
    background-color: red;
    color: white;
  }
}
.price {
  border: 1px dashed #ff8125;
  border-radius: 10px;
  margin: 12px 0;
  padding: 10px;
}
.baohanh {
  margin: 8px 0 0;
  font-size: 14px;
  background: #ff2525;
  border-radius: 4px;
  line-height: 18px;
  display: block;
  width: fit-content;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}
</style>
../../../modules/home/ClientAction.js../../../modules/home/HomeAPI.js