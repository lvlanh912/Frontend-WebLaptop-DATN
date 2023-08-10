<template >
  <div :class="{'col-12 col-sm-6 col-md-4 col-xl-3 p-2':!showfull,'col-12':showfull}">
   <div class="card text-center">
    <router-link :to="{name:'home'}">
      <img :src="item.image[0]" class="card-img-top" alt="...">
    </router-link>
    <div class="card-body">
    <router-link :to="{name:'home'}" class="card-title name--product fs-5">{{ item.name }}</router-link>
    <h6 class="fs-3 fw-bold price--product"> {{ toVND(item.new_price) }}</h6>
    <p class=" d-inline-block card-text fs-4 old-price fw-normal text-decoration-line-through">{{ toVND(item.old_price) }}
    </p>
    <span class="product-discout badge bg-danger text-white ms-3 fs-6">{{discount}}%</span>
    <slot>
    </slot>
    <div class="d-flex justify-content-between">
      <p class="m-0 d-inline-block text-start d-flex align-items-center has fw-bold">
        <i class="bi bi-check-circle fs-3"></i>
        &nbsp;
        Còn hàng
      </p>
      <span @click="showAlert" class="rounded-3 btn add-cart d-block border-0 px-3"><i class="fs-3 bi bi-cart text-white px-2"></i></span>
    </div>
  </div>
   </div>
  </div>
</template>

<script>
import { computed,defineProps } from 'vue'
export default {
  props: {
    showfull:true,
    item: Object
  },
  setup(props){
   function showAlert() {
      // Use sweetalert2
      Swal.fire(
      {
        icon: 'success',
        title: 'Thành công',
        text: 'Sản phẩm đã được thêm vào giỏ hàng của bạn'
      }
      )
    }
     function toVND(n){
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)
    }
    const discount= computed(()=>{return 100-((props.item.new_price/props.item.old_price)*100).toFixed(2)})
    return {showAlert,toVND,discount}
  }

}
</script>

<style scoped>
.card:hover .card-img-top{
  transition: all 0.2s linear;
  transform: translateY(-16px);
}
.name--product{
  text-decoration: none;
  color: black!important;
  font-weight: 555;
  cursor: pointer;
  display: -webkit-box;
  text-align: center;
 text-overflow: ellipsis;
 overflow: hidden;
 -webkit-line-clamp: 2;
 -webkit-box-orient: vertical;
 overflow: hidden;
}
.name--product:hover{
  color: var(--bs-red) !important;
}
.price--product{
  color:var(--product-price)
}
.old-price{
  color: var(--product-old-price);
}
.product-discout{
  color: var(--product-discount);
}
.has{
  color:var(--product-has-quanlity)
}
.add-cart{
  background-image: var(--product-cart-bg);
}
</style>