<template>
    <header class=" fixed-top bg-danger ">
        <nav class="navbar navbar-expand-md navbar-light bg-white w-100 text-black position-relative">
            <div class=" d-flex justify-content-between w-100">
              <a class="ms-2 navbar-brand brand" href="#">LaptopHDA.com</a>
              <div class="d-none d-lg-flex">
                <a href="#" :class="{'nav-link px-0 ms-4 fw-bold text-danger nav--item ':true,'active':$route.name=='home'}">Home </a>
                <a @mouseenter="ishow=1" @mouseleave="ishow=0" href="#" class=" nav-link px-0 ms-4 fw-bold text-danger nav--item show-child">Laptop <i class="bi bi-caret-down-fill"></i> </a>
                <!-- drop-down laptop -->
                <div @mouseenter="ishow=1" @mouseleave="ishow=0" :class="{'d-block':ishow==1,'d-none':ishow!=1,'px-4 ms-5 shadow position-absolute bg-white d-block top-100 start-0 menu-drop ease':true}">
                   <div  class="row">
                    <div class="col">
                        <strong class="p-0 fs-5 text-dark">Theo hãng</strong>
                        <hr class="my-2">
                        <a class="row px-3 nav-link py-1 text-dark">Dell</a>
                        <a class="row px-3 nav-link py-1 text-dark">Asus</a>
                        <a class="row px-3 nav-link py-1 text-dark">Lenovo</a>
                        <a class="row px-3 nav-link py-1 text-dark">Thinkpad</a>
                        <a class="row px-3 nav-link py-1 text-dark">HP</a>
                        <a class="row px-3 nav-link py-1 text-dark">MSI</a>
                        <a class="row px-3 nav-link py-1 text-dark">Acer</a>
                        <a class="row px-3 nav-link py-1 text-dark">Hãng khác</a>
                    </div>
                    <div class="col">
                        <strong class="p-0 fs-5 text-dark">Theo nhu cầu</strong>
                        <hr class="my-2">
                        <a class="row px-3 nav-link py-1 text-dark">Laptop Gaming</a>
                        <a class="row px-3 nav-link py-1 text-dark">Laptop văn phòng</a>
                        <a class="row px-3 nav-link py-1 text-dark">Laptop Đồ hoạ</a>
                        <a class="row px-3 nav-link py-1 text-dark">Laptop doanh nhân</a>
                    </div>
                   </div>
                </div>
                <!--  -->
                <router-link @mouseenter="ishow=2" @mouseleave="ishow=0"  :to="{name:''}" class=" nav-link px-0 ms-4 fw-bold text-danger nav--item">Phụ kiện <i class="bi bi-caret-down-fill"></i> </router-link>
                <!-- dropdown phụ kiện -->
                <div @mouseenter="ishow=2" @mouseleave="ishow=0" :class="{'d-block':ishow==2,'d-none':ishow!=2,'px-4 ms-5 shadow position-absolute bg-white d-block top-100 start-0 menu-drop ease':true}">
                   <div class="row">
                    <div class="col">
                        <strong class="p-0 fs-5 text-dark">Chuột máy tính</strong>
                        <hr class="my-2">
                        <a class="row px-3 nav-link py-1 text-dark">Chuột có dây</a>
                        <a class="row px-3 nav-link py-1 text-dark">Chuột không dây</a>
                        <a class="row px-3 nav-link py-1 text-dark">Chuột Bluetooth</a>
                    </div>
                    <div class="col">
                        <strong class="p-0 fs-5 text-dark">Bàn phím</strong>
                        <hr class="my-2">
                        <a class="row px-3 nav-link py-1 text-dark">Bàn phím có dây</a>
                        <a class="row px-3 nav-link py-1 text-dark">Bàn phím Bluetooth</a>
                        <a class="row px-3 nav-link py-1 text-dark">Bàn phím cơ</a>
                        <a class="row px-3 nav-link py-1 text-dark">Bàn phím Logitech</a>
                    </div>
                    <div class="col">
                        <strong class="p-0 fs-5 text-dark">Tai nghe</strong>
                        <hr class="my-2">
                        <a class="row px-3 nav-link py-1 text-dark">Tai nghe có dây</a>
                        <a class="row px-3 nav-link py-1 text-dark">Tai nghe Bluetooth</a>
                        <a class="row px-3 nav-link py-1 text-dark">Tai nghe gaming</a>
                    </div>
                   </div>
                   <div class="row">
                    <strong class="p-0 fs-5 text-dark">Khác</strong>
                    <hr class="my-2">
                    <div class="col">
                        <a class="row px-3 nav-link py-1 text-dark">Ba lô</a>
                        <a class="row px-3 nav-link py-1 text-dark">Ổ cứng</a>
                        <a class="row px-3 nav-link py-1 text-dark">USB</a>
                    </div>
                    <div class="col-8">
                        <a class="row px-3 nav-link py-1 text-dark">Bàn di chuột</a>
                        <a class="row px-3 nav-link py-1 text-dark">Cổng chuyển đổi</a>
                    </div>
                   </div>
                </div>
                <!--  -->
                <router-link :to="{name:'authenticaton'}"  class=" nav-link px-0 ms-4 fw-bold text-danger nav--item">Tin tức </router-link>
                <a href="#" class=" nav-link px-0 ms-4 fw-bold text-danger nav--item">Liên hệ </a>
            </div>
                <div class="me-2 d-none d-lg-block">
                    <!-- <router-link :to="{name:'authenticaton'}"  class="btn btn-info ms-4 text-white">Đăng nhập </router-link> -->
                    <!-- giỏ hàng + thông tin ở đây -->
                    <button class="btn search">
                        <i class="bi bi-search"></i>
                    </button>
                    <button class="btn person">
                        <i class="bi bi-person"></i>
                    </button>
                    <button class=" ms-2 btn cart">
                        <i class="bi bi-cart-dash"></i>
                    </button>
                    <button class="btn fs-6 logout" title="Đăng xuất">
                        <i class="bi bi-box-arrow-down-right"></i>
                    </button>
                    <!-- tìm kiếm dropdown -->
                    <div class="d-none position-absolute start-0 bg-white pb-5 ease" style="width: 100vw;">
                            <div class="input-group mt-2">
                                <button class="btn" type="button" ><i class="bi bi-search"></i></button>
                                <input type="text" class="form-control border-0" placeholder="Nhập từ khoá tìm kiếm" > 
                            </div>
                              <button class="btn btn-close position-absolute bottom-0 pe-4 mb-2 end-0 me-2"></button>
                       
                    </div>
                </div>
            
        </div>
    </nav>
</header>
</template>

<script>
    import { RouterLink, useRoute } from 'vue-router'
    import {ref} from 'vue'
    export default {
  setup(){
    const ishow=ref(0)
    const route=useRoute()
    console.log(route.name)
    return {ishow}
  }

}
</script>

<style scoped>
.brand{
    font-size: large;
    font-weight: bold;
    color: var(--bs-indigo);
}
.nav--item{
    color: rgb(3, 3, 50)!important;
    position: relative;
}
.nav--item:hover{
    color:var(--bs-red)!important;
}
.nav--item:after{
    content: "";
    position: absolute;
    background-color: var(--bs-red)!important;
    height: 3px;
    width: 0;
    bottom: 0;
    left: 0;
    margin-bottom: 5px;
    transition: width 0.5s ease-in-out;

}
.nav--item::before{
    content: "";
    position: absolute;
    
    height: 100%;
    width: 100%x;
    bottom: 0;
    left: 0;
    right: 0;
    margin-bottom: -40px;
}
.nav--item:hover:after{
    width: 100%;
}
.active:after{
    content: "";
    position: absolute;
    background-color: blue;
    height: 3px;
    width: 100%;
    bottom: 0;
    left: 0;
    margin-bottom: 5px;
    transition: width 0.5s ease-in-out;

}
.menu-drop{
    width: 100vw;
    max-width: 900px;
    border-radius: 12px;
    padding: 20px;
}

.col a{
    padding-top: 2px;
    word-spacing: 3px;
    font-family:sans-serif;
    font-weight: 450;
    font-size: 18px;
}
.col a:hover{
   color: var(--bs-red)!important;
}
.cart,.person,.search{
    color: var(--bs-green)!important;
    position: relative;
}
.cart::after,.person::after,.logout::after,.search::after{
    content: "";
    position: absolute;
    width: 40px;
    top:0;
    bottom: 0;
    left: 0;
    opacity: 0.1;
    z-index: 1;
    height: 40px;
    border-radius: 50%;
    background-color:currentColor;
}
.logout{
    color: var(--bs-red)!important;
    position: relative;
}
.ease{
    animation: animation 0.7s linear ;
    animation-direction: alternate;
}

@keyframes animation {
    from{
        opacity: 0.2;
    }
    to{ 
        opacity: 1;
    }
}
</style>