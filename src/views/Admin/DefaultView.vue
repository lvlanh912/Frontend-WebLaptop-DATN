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
                        <h3 v-if="order_pending!=0" class="fs-5">{{order_pending}} đơn hàng chưa xác nhận</h3>
                        <h3 v-else class="fs-5">Không có đơn hàng chưa xác nhận</h3>
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
                        <h3 v-if="create_account_today==0" class="fs-5">Hôm nay không có khách hàng mới</h3>
                        <h3 v-else class="fs-5">{{create_account_today}} tài khoản được tạo</h3>
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
                        <h3 v-if="create_comment_today==0" class="fs-5">Hôm nay không có đánh giá nào</h3>
                        <h3 v-else class="fs-5">{{create_comment_today}} đánh giá mới</h3>
                        <RouterLink class="text-decoration-none fw-bold inherit" :to="{name:'comments_manager'}">
                            Đi đến quản lý đánh giá>>></RouterLink>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 col-xl-4">
                <div class=" d-flex">
                    <p class="align-self-center me-3">
                        <span class="fs-2 bi bi-dropbox text-yellow "> </span>
                    </p>
                    <div class="d-flex flex-column justify-content-end">
                        <h3 v-if="product_out_stock==0" class="fs-5">Không có sản phẩm nào hết hàng</h3>
                        <h3 v-else class="fs-5">{{product_out_stock}} sản phẩm đã hết hàng</h3>
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
                        <h3 v-if="voucher_expired==0" class="fs-5">Không có mã giảm giá hết hạn</h3>
                        <h3 v-else class="fs-5">{{voucher_expired}} mã giảm giá hết hạn sử dụng</h3>
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
                        <h3 v-if="create_post_today==0" class="fs-5">Hôm nay chưa tạo bài viết nào</h3>
                        <h3 v-else class="fs-5">{{create_post_today}} bài viết được tạo hôm nay</h3>
                        <RouterLink class="text-decoration-none fw-bold inherit" :to="{name:'news_manager'}">Đi đến quản
                            lý tin tức>>></RouterLink>
                    </div>
                </div>
            </div>
            <hr class="my-2">
            <div class="col-12 mt-2">
                <p class="fs-5 inherit fw-bold m-0 p-0">Top sản phẩm được xem nhiều</p>
                <ul class="p-2 bg-white list-unstyled pe-5">
                    <li v-for="item,index in list_top6" :key="item.id" class="w-100 d-flex">
                        <div class="d-flex col">
                            <!-- ảnh -->
                            <div class="align-middle white-space-nowrap py-0 me-3">
                                <a class="d-block rounded-2 border">
                                <img :src="host+'/images/products/'+item.images[0]" alt="" width="53"></a>
                            </div>
                            <!-- tên sản phẩm -->
                            <div class="align-middle white-space-nowrap align-self-center ms-2">
                                <span class="fw-bold">{{item.productName}}</span>
                            </div>
                            
                        </div>
                        <!-- Lượt xem -->
                        <div class="px-2 ms-2 align-middle white-space-nowrap align-self-center col justify-content-start">
                            <span class="fw-bold px-2"><i class="bi bi-eye-fill me-2"></i>{{item.view}}</span>
                        </div>
                        <!-- Số lượng còn -->
                        <div class="align-middle white-space-nowrap align-self-center col justify-content-start">
                            <span class="inherit fw-bolder px-2">còn lại {{item.stock}}</span>
                        </div>
                        <div class="align-self-center px-3">
                            <h3 class="fw-bold">{{++index}}</h3>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
    import { onBeforeMount, onMounted, reactive, ref } from "vue";
import {
    Gettop6, getpendingOrder, Get_Sum_create_Account, Get_Sum_create_Comment
    , Get_Sum_create_News, Get_Sum_Product_Out_Stock, Get_Sum_Voucher_Expired
} from '../../modules/admin/home.js'
    export default {
        components: {},
    setup() {
        const order_pending = ref(0)
        const create_account_today = ref(0)
        const create_comment_today = ref(0)
        const create_post_today = ref(0)
        const voucher_expired = ref(0)
        const product_out_stock=ref(0)
            const list_top6 = ref([])
            const host=backendHost
            onMounted(async () => {
                list_top6.value = await Gettop6();
                order_pending.value = await getpendingOrder()
                create_account_today.value = await Get_Sum_create_Account()
                create_comment_today.value = await Get_Sum_create_Comment()
                create_post_today.value = await Get_Sum_create_News()
                voucher_expired.value = await Get_Sum_Voucher_Expired()
                product_out_stock.value= await Get_Sum_Product_Out_Stock()
            })
        return {
            list_top6, host, order_pending, create_account_today,
            create_comment_today, create_post_today,
            product_out_stock, voucher_expired
            
        }
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