<template>
  <header class="fixed-top container-lg">
   <nav class="navbar navbar-expand-md navbar-light bg-white w-100 text-black position-relative">
    <div class="d-flex justify-content-between w-100">
     <router-link :to="{ name: 'home' }" class="ms-2 navbar-brand brand" >DIENTUME.com</router-link>
     <i @click="ishowMenu =!ishowMenu" class="navbar-toggler-icon fs-4 me-2 d-lg-none"></i>
     <!-- toggle-menu -->
     <div v-if="ishowMenu" class="slow-show position-absolute end-0 bg-white shadow top-0 toggle-menu text-center pt-2 d-lg-none">
      <button @click="ishowMenu =false" class="btn btn-close end-0 position-absolute me-3 mt-2"></button>
      <ul class="navbar-nav mt-5 flex-column">
        <li class="nav-item">
          <RouterLink class="nav-link text-dark fw-bolder flex-column" :to="{name:'home'}" >Trang chủ</RouterLink>
        </li>
        <li class="nav-item ">
          <RouterLink  class="nav-link text-dark fw-bolder" :to="{name:'products'}">
            Sản phẩm
            <i class="bi bi-caret-right-fill"></i>
          </RouterLink>      
    </li>
    <li class="nav-item">
      <RouterLink  class="nav-link text-dark fw-bolder flex-column" :to="{name:'post'}" >Tin tức</RouterLink>
    </li>
    <li class="nav-item">
      <a class="nav-link text-dark fw-bolder flex-column" >Liên hệ</a>
    </li>
      </ul>
      <div class="start-0 bg-white me-2 mt-4">
       <div class="input-group mt-2">
        <button class="btn" type="button">
         <i class="bi bi-search"></i>
        </button>
        <input type="text" class="form-control border-0" placeholder="Nhập từ khoá tìm kiếm" />
       </div>
      </div>
      <hr />
      <!-- search -->
      <a href="" class="nav-link text-dark fw-bolder">
       <i class="bi bi-cart"></i> Giỏ hàng </a>
      <a href="" class="nav-link text-dark fw-bolder">Đăng xuất</a>
     </div>
     <!--  -->
     <div class="d-none d-lg-flex">
      <RouterLink :to="{name:'home'}" :class="{'nav-link px-0 ms-4 fw-bold text-danger nav--item ': true,
              active: $route.name == 'home',}"> Home </RouterLink>
      <RouterLink :to="{name:'products'}" :class="{'nav-link px-0 ms-4 fw-bold text-danger nav--item ': true,
              active: $route.name == 'products',}" @mouseenter="ishowdropdown=true" @mouseleave="ishowdropdown=false"> Sản phẩm <i class="bi bi-caret-down-fill inherit"></i>
       <div v-if="ishowdropdown" class="dropdown-menu mt-3 pe-5 d-block">
        <router-link v-for="item in list_category" :key="item.id" :to="{ name:'products',params: {
                  categoryID:item.id
                  }}" :class="{'nav-link px-0 ms-4 fw-bold text-danger nav--item no-wrap':true,
              'active':$route.params.categoryID==item.id
              }">{{item.name}}
        </router-link>
       </div>
      </RouterLink>
      <router-link :to="{ name: 'post' }" :class="{'nav-link px-0 ms-4 fw-bold text-danger nav--item':true, 'active':$route.name=='post'||$route.name=='post-detail'}">
        Tin tức 
      </router-link>
      <a href="#" class="nav-link px-0 ms-4 fw-bold text-danger nav--item">Liên hệ </a>
     </div>
     <div class="me-2 d-none d-lg-block">
      <!-- <router-link :to="{name:'authenticaton'}"  class="btn btn-info ms-4 text-white">Đăng nhập </router-link> -->
      <!-- giỏ hàng + thông tin ở đây -->
      <button @click="show_seachbar = !show_seachbar" class="btn search">
       <i class="bi bi-search"></i>
      </button>
      <button class="btn person">
       <i class="bi bi-person"></i>
      </button>
      <button class="ms-2 btn cart">
       <i class="bi bi-cart-dash"></i>
      </button>
      <button class="btn fs-6 logout" title="Đăng xuất">
       <i class="bi bi-box-arrow-down-right"></i>
      </button>
      <!-- tìm kiếm dropdown -->
      <div v-if="show_seachbar" @mouseleave="show_seachbar = false" class="position-absolute start-0 bg-white pb-5 ease" style="width: 100vw">
       <div class="input-group mt-2">
        <button class="btn" type="button">
         <i class="bi bi-search"></i>
        </button>
        <input type="text" class="form-control border-0" placeholder="Nhập từ khoá tìm kiếm" />
       </div>
      </div>
     </div>
    </div>
   </nav>
  </header>
</template>

<script>
  import { RouterLink, useRoute } from "vue-router";
  import { ref, onBeforeMount } from "vue";
  import { company_list, type_list } from "../data/filter";
  import { getCategory_noParent } from '../modules/home/HomeAPI.js'
  export default {
    setup() {
      const show_seachbar = ref(false);
      const ishowMenu = ref(false)
      const ishowdropdown=ref(false)
      const route = useRoute();
      const list_category = ref([])
      onBeforeMount(async () => {
        list_category.value = await getCategory_noParent()
      })
      const convertToPath = (str) => {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        str = str.replace(/  +/g, ' ');
        str = str.replaceAll(' ', '-').toLowerCase()
        return str;
      }
      return { ishowMenu,ishowdropdown, show_seachbar, list_category, company_list, type_list, convertToPath };
    },
  };
</script>

<style scoped>
  .brand {
    font-size: large;
    font-weight: bold;
    color: var(--bs-indigo);
  }

  .toggle-menu {
    min-width: 250px;
    height: 500px;
  }

  .slow-show {
    animation: ani-menu 0.5s linear alternate;
  }

  @keyframes ani-menu {
    from {
      opacity: 0.6;
    }
  }

  .nav--item {
    color: rgb(3, 3, 50) !important;
    position: relative;
  }

  .nav--item:hover {
    color: var(--bs-red) !important;
  }

  .nav--item:after {
    content: "";
    position: absolute;
    background-color: var(--bs-red) !important;
    height: 3px;
    width: 0;
    bottom: 0;
    left: 0;
    margin-bottom: 5px;
    transition: width 0.5s ease-in-out;
  }

  .nav--item::before {
    content: "";
    position: absolute;

    height: 100%;
    width: 100%x;
    bottom: 0;
    left: 0;
    right: 0;
    margin-bottom: -40px;
  }

  .nav--item:hover:after {
    width: 100%;
  }

  .active:after {
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

  .menu-drop {
    width: 100vw;
    max-width: 900px;
    border-radius: 12px;
    padding: 20px;
  }

  .col a {
    padding-top: 2px;
    word-spacing: 3px;
    font-family: sans-serif;
    font-weight: 450;
    font-size: 18px;
    cursor: pointer;
  }

  .col a:hover {
    color: var(--bs-red) !important;
  }

  .cart,
  .person,
  .search {
    color: var(--bs-green) !important;
    position: relative;
  }

  .cart::after,
  .person::after,
  .logout::after,
  .search::after {
    content: "";
    position: absolute;
    width: 40px;
    top: 0;
    bottom: 0;
    left: 0;
    opacity: 0.1;
    z-index: 1;
    height: 40px;
    border-radius: 50%;
    background-color: currentColor;
  }

  .logout {
    color: var(--bs-red) !important;
    position: relative;
  }

  .ease {
    animation: animation 0.7s linear;
    animation-direction: alternate;
  }

  @keyframes animation {
    from {
      opacity: 0.2;
    }

    to {
      opacity: 1;
    }
  }
</style>