<template>
  <div class="container bg-white">
    <h3 class="text-blue">Giỏ hàng của tôi</h3>
    <ol class="list-unstyled">
        <li class="px-2 row">
            <div class="col flex-shrink-0" style="max-width: 88px;">
                <img class="img-fluid" src="https://hoanghapccdn.com/media/product/120_4416_pc_beautiful_montech_premium_black_h4.jpg" alt="">
            </div>
            <!-- infor -->
        <div class="col">
            <strong class="">HHPC BLACK CORE i7 13700K | 32G DDR5 | NVIDIA RTX 4070 12G</strong>
            <p class="text-green fw-bolder pt-2 mb-0">
                <i class=" bi bi-check-circle me-2"></i>
                Còn hàng
            </p>
        </div>
        <div class="col list-cart">
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
        </li>
    </ol>
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
</style>