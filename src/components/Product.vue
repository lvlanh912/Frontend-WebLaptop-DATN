<template >
  <div class="col-12 col-sm-6 col-md-4 col-xl-3 p-2">
   <div class="card text-center">
    <router-link :to="{name:'home'}">
      <img src="https://laptop88.vn/media/product/pro_poster_7318.jpg" class="card-img-top" alt="...">
    </router-link>
    <div class="card-body">
    <router-link :to="{name:'home'}" class="card-title name--product fs-5">HHPC BLACK CORE i7 13700K | 32G DDR5 | NVIDIA RTX 4070Ti 12G HHPC BLACK CORE i7 13700K | 32G DDR5 | NVIDIA RTX 4070Ti 12G</router-link>
    <h6 class="fs-3 fw-bold price--product"> 34.000.000 đ</h6>
    <p class="card-text fs-4 old-price fw-normal">12.000.000 đ &nbsp;<span class="product-discout badge bg-danger text-white">12%</span></p>
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
export default {
  setup(){
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
    return {showAlert}
  }

}
</script>

<style>
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
 text-overflow: ellipsis;
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