<template>
  <div :class="{'bg-white pt-2 pb-2 overflow-hidden text-center col-12 border':true,'col-lg-3 col-md-4 col-sm-6':!showfull}  ">
    <router-link :to="{name:'product-detail',params:{productId:item.id}}"  style="aspect-ratio: 1;
    overflow: hidden; align-self: center;"
    class="position-relative pb-2 mb-2 d-flex text-dark text-decoration-none justify-content-center">
      <img class="img-product img-fluid" :src="backendhost+'/images/products/'+item.images[0]"
        alt="">
    </router-link>
    <!-- Tên sản phẩm -->
    <div class="py-1" style="min-height: 60px;">
      <span href="" class="mb-2 max-line-2 overflow-hidden">
        <h3 class="name--product text-decoration-none">{{item.productName}}</h3>
      </span>
    </div>
    <!-- Giá sản phẩm -->
    <div class="">
      <!-- Giá bán -->
      <h6 class="fs-4 fw-bold price--product">{{ toVND(item.price) }}</h6>
      <p class="d-flex justify-content-center">
        <span class="old-price">
          {{ toVND(item.maxPrice) }}
        </span>
        <span class="product-discout badge bg-danger text-white align-self-center">
          - {{ discount}}%
        </span>
      </p>
    </div>
    <!-- Tuỳ chọn -->
    <div class="d-flex justify-content-end">
      <p v-if="item.stock==0"  class="text-orange fw-bolder pt-2 mb-0 me-2" ><i class="bi bi-exclamation-circle me-2"></i> Hết hàng </p>
      <p v-else class="m-0 ms-2 d-inline-block text-start d-flex align-items-center has fw-bold">
        <i class="bi bi-check-circle fs-6"></i>
        &nbsp; Còn hàng</p>
    </div>
    <button @click="onAddCart" class="rounded-3 btn add-cart d-block d-flex justify-content-between no-wrap align-self-center w-100">
      <label class="align-self-center inherit text-white">Thêm giỏ hàng</label> <i class="fs-5 bi bi-cart text-white px-3"></i>
    </button>
  </div>
</template>

<script>
  import { computed, defineProps, ref } from "vue"
  import {AddtoCart} from '../../modules/home/HomeAPI.js'
import { useStore } from 'vuex'
  export default {
    props: {
      showfull:{
        require:false
      },
      item: Object,
    },
    setup(props) {
      const store = useStore()
      const showfull=props.showfull
      const item = props.item
      const backendhost = ref(backendHost)
      const onAddCart=async()=> {
        try{
          await AddtoCart({
            productId:item.id,
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
      function toVND(n) {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(n)
      }
      const discount = computed(() => {
        return 100 - ((item.price / item.maxPrice) * 100).toFixed()
      })
      return { onAddCart, backendhost, toVND, discount, item,showfull }
    },
  }
</script>

<style scoped>
.img-product {
    width: auto;
    max-height: 200px;
    margin: auto;
    aspect-ratio:  auto;
    display: block;
  }

  .card:hover {
    transition: all 0.2s linear;
    transform: translateY(-16px);
  }

  .name--product {
    text-decoration: none;
    color: black !important;
    font-weight: inherit;
    font-size: inherit;
    cursor: pointer;
    display: -webkit-box;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .name--product:hover {
    color: var(--bs-red) !important;
  }

  .price--product {
    color: var(--product-price);
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 4px;
    width: 100%;
  }

  .old-price {
    color: var(--product-old-price);
    font-size: 12px;
    line-height: 14px;
    color: #A3A3A3;
    -webkit-text-decoration-line: line-through;
    text-decoration-line: line-through;
    margin-right: 4px;
  }
.img-product:hover{
  scale: 105%;
  transition: all .2s ease-in-out;
}
  .product-discout {
    color: var(--product-discount);
  }

  .has {
    color: var(--product-has-quanlity);
  }

  .add-cart {
    background-image: var(--product-cart-bg);
  }
</style>