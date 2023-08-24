<template>
    <aside class="bg-white flex-shrink-0 p-3 shadow position-fixed" 
    style="width: 250px; height: 100vh;">
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <p class="w-100 text-start btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
          <i class="bi bi-house-fill text-blue me-2"></i>Trang chủ
        </p>
      </li>
      <li class="mb-1">
        <p class="w-100 text-start btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
         <i class="bi bi-speedometer2 text-red me-2"></i> Bảng điều khiển
        </p>
        <div class="collapse" id="dashboard-collapse" >
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Quản lý tài khoản</a></li>
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Quản lý </a></li>
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Monthly</a></li>
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Annually</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <p class="w-100 text-start btn btn-toggle align-items-center rounded" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="true">
         <i class="bi bi-shop-window text-blue me-2"></i> Đơn đặt hàng
        </p>
        <div class="collapse" id="orders-collapse" >
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="py-2 mt-2 ms-4 link-dark text-decoration-none rounded">Thêm đơn hàng thủ công</a></li>
            <li><a href="#" class="py-2 mt-2 ms-4 link-dark text-decoration-none rounded">Đơn đặt hàng gần đây</a></li>
            <li><a href="#" class="py-2 mt-2 ms-4 link-dark text-decoration-none rounded">Lịch sử đơn hàng đã giao</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <p class="w-100 text-start btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
         <i class="bi bi-person-fill text-blue me-2"></i> Account
        </p>
        <div class="collapse" id="account-collapse" >
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">New...</a></li>
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Profile</a></li>
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Settings</a></li>
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Sign out</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <p class="w-100 text-start btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#voucher-collapse" aria-expanded="false">
         <i class="bi bi-gift-fill text-pink me-2"></i> Voucher
        </p>
        <div class="collapse" id="voucher-collapse" >
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Tạo mới</a></li>
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Danh sách Vourcher</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <p class="w-100 text-start btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#product-collapse" aria-expanded="false">
         <i class="bi bi-laptop-fill text-blue me-2"></i> Sản phẩm
        </p>
        <div class="collapse" id="product-collapse" >
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Tạo mới</a></li>
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Danh sách sản phẩm</a></li>
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Sản phẩm đã hết hàng</a></li>
          </ul>
        </div>
      </li>
     
      <li class="mb-1">
        <p class="w-100 text-start btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#category-collapse" aria-expanded="false">
         <i class="bi bi-list-ul text-blue me-2"></i>Danh mục </p>
        <div class="collapse" id="category-collapse" >
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Tạo danh mục hàng mới</a></li>
            <li><a href="#" class=" ms-3 link-dark text-decoration-none rounded">Các danh mục hàng</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <p class="w-100 text-start btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" >
         <i class="bi bi-currency-bitcoin text-blue me-2"></i>Thanh toán </p>
      </li>
      <li class="mb-1">
        <p class="w-100 text-start btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" >
         <i class="bi bi-messenger text-blue me-2"></i>Chăm sóc khách hàng </p>
      </li>
    </ul>
    </aside>
</template>

<script>
export default {

}
</script>

<style scoped>
p{
    margin: 0;
}
ul li p:hover{
    color: blue!important;
}
ul li div li:hover a{
    color: blue;
}

</style>