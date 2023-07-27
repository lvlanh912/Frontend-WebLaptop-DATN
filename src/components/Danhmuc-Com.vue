<template>
<aside class="d d-none d-md-block card border-top-0 ms-0 start-0 me-0 p-0 position-absolute ">
<ul class="nav navbar-brand  m-0">
    <strong class="px-1 mt-2">Danh mục sản phẩm</strong>
    <li class="w-100 d-flex align-items-center justify-content-start p-1 active">
       <div class="icon-item laptop">
       </div>
        <a href="#" class="nav-link text-dark d-inline-block">Laptop mới</a>
    </li>
    <li class="w-100 d-flex align-items-center justify-content-start p-1 mt-1">
        <div class="icon-item laptop laptop--old">
        </div>
         <a href="#" class="nav-link text-dark d-inline-block">Laptop cũ</a>
     </li>
     <li @mouseenter="ishow=true" @mouseleave="ishow=false"  class="dropdown d-flex flex-column w-100">
       <div class="d-flex">
        <i class="icon-item laptop phu-kien">
        </i>
         <span href="#" class="nav-link text-dark d-block">Phụ kiện</span>
       </div>
         <ul :class="{'dropdown-menu position-relative border-0 ps-3 py-1 w-100 d-block':true,' showchild':ishow}">
            <li class="ps-4 d-flex">
                <div class="rounded phukien-item mt-1"></div>
                <a class="nav-item nav-link text-dark" href="#">Bàn phím</a></li>
            <li class="ps-4 d-flex justify-content-start">
                <div class="rounded phukien-item chuot mt-1"></div>
                <a class="nav-item nav-link text-dark" href="#">Chuột</a></li>
            <li class="ps-4 d-flex">
                <div class="rounded phukien-item balo mt-1"></div>
                <a class="nav-item nav-link text-dark" href="#">Ba lô</a></li>
          </ul>
    </li>
    <li :class="{'w-100 d-flex align-items-center justify-content-start p-1 mt-1':true,'child-showed':ishow}">
        <div class="icon-item laptop khac">
        </div>
         <a href="#" class="nav-link text-dark d-inline-block">Khác</a>
     </li>
</ul>
</aside>
</template>

<script>
import {ref,reactive} from 'vue'
export default{
    setup(){
        const ishow=ref(false)
        return {ishow}
    }
}
</script>

<style scoped>
aside{
    width: 200px;
    height: auto;
}
.icon-item{
    width: 45px;
    height: 100%;
}
.laptop{
    background-color: none;
    background-position: center center;
    background-image: url("../assets/icons/laptop.png");
    background-size: cover;
    background-repeat: no-repeat;
}
li{
    transition: all 0.5s linear !important;
}
li span{
    font-weight: 450;
}
li:hover, .active{
    padding: 0;
    background-color: #00000033;
   
}
.laptop--old{
    background-image: url("../assets/icons/laptop-old.png");
}
.phu-kien{
    background-image: url("../assets/icons/phu-kien.png");
}
.phukien-item{
    display: block;
    height: 25px;
    width: 25px;
    background-color: none;
    background-position: center center;
    background-image: url("../assets/icons/ban-phim.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-size: cover;
}
.chuot{
    background-image: url("../assets/icons/chuot.png");
}
.balo{
    background-image: url("../assets/icons/balo.png");
}
.khac{
    background-image: url("../assets/icons/khac.png");
}

.dropdown-menu{
    margin-left: -200px;
    height: 0vh;
    opacity: 0;
    transition: all 0.5s ease-in;
}
 .showchild{
    margin-left: 0;
    opacity: 1;
    transition-delay: 0s;
}
.child-showed{
    margin-top: 120px!important;
}
</style>