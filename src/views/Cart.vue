<template>
  <div class="container">
      <h3 class="text-blue">Giỏ hàng của tôi</h3>
    <div class="cart row bg-white">
        <p class="text-end mt-2 col-12 col-lg-7">
            <button class="btn bg-red text-white"><i class="bi bi-trash me-2"> </i>Xoá tất cả</button>
        </p>
        <ol class="list-unstyled mt-3 col-12 col-lg-7">
            <li class="px-2 row">
                <div class="col flex-shrink-0" style="max-width: 88px;">
                    <img class="img-fluid" src="https://hoanghapccdn.com/media/product/120_4416_pc_beautiful_montech_premium_black_h4.jpg" alt="">
                </div>
                <!-- infor -->
            <div class="col ">
                <strong class="">HHPC BLACK CORE i7 13700K | 32G DDR5 | NVIDIA RTX 4070 12G</strong>
                <p class="text-orange fw-bolder pt-2 mb-0">
                    <i class="bi bi-exclamation-circle me-2"></i>
                    Hết hàng
                </p>
            </div>
            <!-- control -->
            <div class="col-12 mt-3 mt-lg-0 col-lg-3 list-cart">
                <div class="d-flex align-items-center justify-content-between my-0">
                    <div class="d-flex">
                        <i class="bi bi-dash-lg  px-2 bg-red text-white"></i>
                        <input type="number"
                            class="bg-light text-center border-0 my-0 py-0" style="max-width: 40px;">
                        <i class="bi bi-plus-lg px-2 bg-blue text-white"></i>
                    </div>
                    <button class=" btn btn-outline-danger bi-trash3 px-1 py-0 text-red bg-white"></button>
                </div>
                <p class="fst-normal mt-2">
                    <span class="fs-6">43.000.00 đ</span>
                    <strong class="d-block text-blue">57.000.000 đ</strong>
                </p>
            </div>
           <div class="text-center px-5 py-1">
            <span class="border d-block"></span>
           </div>
            </li>
<!-- item hết hàng -->
<li class="px-2 row">
    <div class="col flex-shrink-0" style="max-width: 88px;">
        <img class="img-fluid" src="https://hoanghapccdn.com/media/product/120_4416_pc_beautiful_montech_premium_black_h4.jpg" alt="">
    </div>
    <!-- infor -->
<div class="col ">
    <strong class="">HHPC BLACK CORE i7 13700K | 32G DDR5 | NVIDIA RTX 4070 12G</strong>
    <p class="text-green fw-bolder pt-2 mb-0">
        <i class=" bi bi-check-circle me-2"></i>
        Còn hàng
    </p>
</div>
<!-- control -->
<div class="col-12 mt-3 mt-lg-0 col-lg-3 list-cart">
    <div class="d-flex align-items-center justify-content-between my-0">
        <div class="d-flex">
            <i class="bi bi-dash-lg  px-2 bg-red text-white"></i>
            <input type="number"
                class="bg-light text-center border-0 my-0 py-0" style="max-width: 40px;">
            <i class="bi bi-plus-lg px-2 bg-blue text-white"></i>
        </div>
        <button class=" btn btn-outline-danger bi-trash3 px-1 py-0 text-red bg-white"></button>
    </div>
    <p class="fst-normal mt-2">
        <span class="fs-6">43.000.00 đ</span>
        <strong class="d-block text-blue">57.000.000 đ</strong>
    </p>
</div>
<div class="text-center px-5 py-1">
<span class="border d-block"></span>
</div>
</li>
<!--  -->
            <p class="text-end mt-3 border-bottom py-2">
                <i class=" fs-4 text-red bi bi-gift m-auto d-inline-block me-2 py-1"></i>
                <input type="text" class="border border-danger p-2" placeholder="Mã giảm giá (nếu có)">
            </p>
           <p class="text-end me-2 fs-5">Tổng cộng: 
            <strong class="text-red">60.000.000</strong>
        </p>
        </ol>
        <!-- infor customer -->
        <section class="infor-customer border-start col-12 col-lg-5 mb-3 p-3">
            <div class="cart border border-info p-2 shadow rounded-2 px-3 px-lg-4">
                <h5 class="fw-bold text-blue mb-3 text-center">Thông tin thanh toán</h5>
                <input type="text" class="form-control mb-3 input-custom" placeholder="Họ tên người nhận hàng">
                <input type="tel" class="form-control mb-3 input-custom" placeholder="Số điện thoại người nhận">
                <input type="email" class="form-control mb-3 input-custom" placeholder="Email">
                <input type="text" class="form-control mb-3 input-custom" placeholder="Địa chỉ nhận hàng">
                <input type="text" class="form-control mb-3 input-custom" placeholder="Ghi chú">
            <button class="btn bg-blue text-white d-block m-auto">Xác nhận đặt hàng</button>
            </div>
        </section>
    </div>
  </div>

</template>

<script>
export default {

}
</script>

<style scoped>
.list-cart input{
    -webkit-appearance: none;
    appearance: none;
}
.list-cart input:focus{
    border: none;
    background-color: #fff;
    outline: none;
}
.input-custom{
    background: #F5F8FD;
    color: #929EAD;
    border: 0;
    font-size: 14px!important;
    font-weight: 455;
    line-height: normal;
}
</style>