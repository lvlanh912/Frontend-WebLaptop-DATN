<template>
    <section class="w-100 position-relative" style="width: 100vw">
        <div class="row g-4">
            <h3 class="">Xin chào quản trị viên</h3>
            <hr>
            <div class="col-12 col-md-6 col-xl-4">
                <div class=" d-flex">
                    <p class="align-self-center me-3">
                        <span class="fs-2 bi bi-shop text-success"> </span>
                    </p>
                    <div class="d-flex flex-column justify-content-end">
                        <h3 class="fs-4">3 đơn hàng chưa xác nhận</h3>
                        <RouterLink class="text-decoration-none fw-bold inherit" :to="{name:'orders_manager'}">Đi đến
                            quản lý đơn hàng>>></RouterLink>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 col-xl-4">
                <div class=" d-flex">
                    <p class="align-self-center me-3">
                        <span class="fs-2 bi bi-person text-red "> </span>
                    </p>
                    <div class="d-flex flex-column justify-content-end">
                        <h3 class="fs-4">3 tài khoản được tạo</h3>
                        <RouterLink class="text-decoration-none fw-bold inherit" :to="{name:'user_manager'}">Đi đến quản
                            lý tài khoản>></RouterLink>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 col-xl-4">
                <div class=" d-flex">
                    <p class="align-self-center me-3">
                        <span class="fs-2 bi bi-star text-yellow "> </span>
                    </p>
                    <div class="d-flex flex-column justify-content-end">
                        <h3 class="fs-4">3 đánh giá mới</h3>
                        <RouterLink class="text-decoration-none fw-bold inherit" :to="{name:'comments_manager'}">Đi đến
                            quản lý đánh giá>>></RouterLink>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 col-xl-4">
                <div class=" d-flex">
                    <p class="align-self-center me-3">
                        <span class="fs-2 bi bi-dropbox text-yellow "> </span>
                    </p>
                    <div class="d-flex flex-column justify-content-end">
                        <h3 class="fs-4">4 sản phẩm đã hết hàng</h3>
                        <RouterLink class="text-decoration-none fw-bold inherit" :to="{name:'products_manager'}">Đi đến
                            quản lý sản phẩm>>></RouterLink>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 col-xl-4">
                <div class=" d-flex">
                    <p class="align-self-center me-3">
                        <span class="fs-2 bi bi-gift text-red "> </span>
                    </p>
                    <div class="d-flex flex-column justify-content-end">
                        <h3 class="fs-4">4 mã giảm giá đã hết hạn</h3>
                        <RouterLink class="text-decoration-none fw-bold inherit" :to="{name:'vouchers_manager'}">Đi đến
                            quản lý mã giảm giá>>></RouterLink>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 col-xl-4">
                <div class=" d-flex">
                    <p class="align-self-center me-3">
                        <span class="fs-2 bi bi-newspaper text-blue "> </span>
                    </p>
                    <div class="d-flex flex-column justify-content-end">
                        <h3 class="fs-4">Chưa đăng bài viết nào </h3>
                        <RouterLink class="text-decoration-none fw-bold inherit" :to="{name:'news_manager'}">Đi đến quản
                            lý tin tức>>></RouterLink>
                    </div>
                </div>
            </div>
            <hr class="my-2">
            <div class="col-12 mt-2">
                <p class="fs-4 inherit fw-bold m-0 p-0">Top sản phẩm được xem nhiều</p>
                <ul class="p-2 bg-white list-unstyled">
                    <li class="w-100 d-flex justify-content-between">
                        <div class="d-flex">
                            <!-- ảnh -->
                            <div class="align-middle white-space-nowrap py-0 me-3">
                                <a class="d-block rounded-2 border">
                                <img src="https://localhost:7251/images/products/products65647e5395677c8fe8c07a62-0.jpg" alt="" width="53"></a>
                            </div>
                            <!-- tên sản phẩm -->
                            <div class="align-middle white-space-nowrap align-self-center">
                                <span class="fw-bold">iPhone 13 pro max-Pacific Blue-128GB storage</span>
                            </div>
                            
                        </div>
                        <!-- Lượt xem -->
                        <div class="px-2 align-middle white-space-nowrap align-self-center">
                            <span class="fw-bold px-2"><i class="bi bi-eye-fill me-2"></i>1000</span>
                        </div>
                        <div class="text-end align-self-center px-3">
                            <h3 class="fw-bold">1</h3>
                        </div>
                    </li>
                </ul>
            </div>
            
        </div>
    </section>
</template>

<script>
    import { onBeforeMount, onMounted, reactive, ref } from "vue";

    export default {
        components: {},
        setup() {

        }
    }
</script>
<style scoped>
    .center {
        bottom: 50%;
        right: 50%;
        left: 50%;
    }

    .icon {
        position: relative;
        align-items: center;
    }

    .icon::after {
        content: "";
        position: absolute;
        width: 50px;
        height: 50px;
        background-color: currentColor;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        opacity: .2;
    }
</style>