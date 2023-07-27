<template>
    <header class=" position-fixed w-100 card flex-row pb-1 top-0" style="height: 55px;">
        <img class="img-fluid h-auto" src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg" alt="logo"
        style="min-width: 60px;"    >
        <div class=" border d-flex col-9 col-sm-10 col-md-4 px-1 me-1">
            <input class=" border-0  flex-shrink-0 flex-grow-1 " placeholder="Bạn cần tìm gì ?" type="text">
            <button class="btn fs-4 align-self-center " > <i class=" bi-search"></i></button>
        </div>
        <span class=" d-md-none ms-auto me-1 d-flex flex-column justify-content-around">
            <span class="bg-dark bg-gradient mb-1" style="width: 40px;height: 6px;"></span>
            <span class="bg-dark bg-gradient mb-1" style="width: 40px;height: 6px;"></span>
            <span class="bg-dark bg-gradient mb-1" style="width: 40px;height: 6px;"></span>
        </span>
        <!-- menu toggle -->
        <div class="d-none end-0 shadow card position-absolute d-flex justify-content-between d-md-none flex-column bg-white w-100 px-3"
        style="max-width: 400px;min-width: 270px;min-height: 400px;height: 100vh;">
        <div class="text-end">
            <span class="end-0 btn btn-close"></span>
        <div class="nav-item text-center">
            <router-link :to="{name:'authenticaton'}" class="nav-link">Đăng nhập</router-link>
            <router-link :to="{name:'authenticaton'}" class="nav-link">Đăng ký</router-link>
            <router-link :to="{name:'authenticaton'}" class="nav-link">Giỏ hàng</router-link>
            <router-link :to="{name:'authenticaton'}" class="nav-link">Tin tức</router-link>
            <router-link :to="{name:'authenticaton'}" class="nav-link">Liên hệ</router-link>
            <router-link :to="{name:'authenticaton'}" class="nav-link">Đăng xuất</router-link>
        </div>
        </div>
        </div> 
        <!--  -->
        <div class="nav d-none d-md-block flex-shrink-0 ms-2">
            <ul class="navbar-nav flex-row flex-md-row align-content-lg-stretch">
                <!-- <li class="nav-item">
                    <a href="#" class="btn btn-success text-white">Đăng nhập</a>
                </li>
                <li class="ms-1 nav-item flex-shrink-0">
                    <a href="#" class="btn btn-danger text-white">Đăng ký</a>
                </li> -->
                <li class="nav-item">
                    <a href="#" class="btn">
                        <span class="bi bi-person"></span>
                        Thông tin tài khoản</a>
                </li>
                <li class="nav-item ">
                    <a href="#" class="btn">
                        <span class="bi bi-cart"></span>
                        Giỏ hàng</a>
                </li>
                <li class="nav-item">
                   <a href="" class="btn text-danger">
                    Đăng xuất
                    <span class="bi bi-arrow-right-short"></span>
                   </a>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  data () {
    return {
        isshow:false
    }
  },

}
</script>

<style scoped>
header{
    z-index: 100;
}
</style>