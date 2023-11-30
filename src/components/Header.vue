<template>
  <header class="fixed-top container-lg px-0 px-lg-3">
    <nav
      class="navbar navbar-expand-md navbar-light bg-white w-100 text-black position-relative"
    >
      <div class="d-flex justify-content-between w-100">
        <router-link :to="{name: 'home'}" class="ms-2 navbar-brand brand position-relative">
          <img class=" position-absolute" style="max-height: 100%;" src="../../public/banner.jpg" alt="">
        </router-link>
        <i
          @click="ishowMenu = !ishowMenu"
          class="navbar-toggler-icon fs-4 me-2 d-lg-none"
        ></i>
        <!-- toggle-menu -->
        <transition name="slide-fade">
          <div
            v-if="ishowMenu"
            class="slow-show position-absolute end-0 bg-white shadow top-0 toggle-menu text-center pt-2 d-lg-none"
          >
            <button
              @click="ishowMenu = false"
              class="btn btn-close end-0 position-absolute me-3 mt-2"
            ></button>
            <ul class="navbar-nav mt-5 flex-column">
              <li>
                <RouterLink
                  :class="{
                    'nav-link px-0 mx-5 fw-bold text-danger nav--item': true,
                    active: $route.name == 'home',
                  }"
                  :to="{name: 'home'}"
                >
                  <i class="bi bi-house-fill text-blue me-2"></i>
                  Trang chủ
                </RouterLink>
              </li>
              <li
                @mouseenter="ishowdropdown = true"
                @mouseleave="ishowdropdown = false"
              >
                <RouterLink
                  :class="{
                    'nav-link px-0 mx-5 fw-bold text-danger nav--item': true,
                    active: $route.name == 'products',
                  }"
                  :to="{name: 'products'}"
                >
                  <i class="bi bi-gift-fill text-danger me-2"></i>
                  Sản phẩm
                  <i v-if="ishowdropdown" class="bi bi-caret-down-fill"></i>
                  <i v-else class="bi bi-caret-right-fill"></i>
                </RouterLink>
                <transition name="slide-fade">
                  <div
                    v-if="ishowdropdown"
                    class="dropdown-menu position-static pe-3 d-block border-0"
                  >
                    <router-link
                      v-for="item in list_category"
                      :key="item.id"
                      :to="{
                        name: 'products',
                        params: {
                          categoryID: item.id,
                        },
                      }"
                      :class="{
                        'nav-link px-0 ms-3 fw-bold text-danger nav--item no-wrap': true,
                        active: $route.params.categoryID == item.id,
                      }"
                    >
                      {{ item.name }}
                    </router-link>
                  </div>
                </transition>
              </li>
              <li>
                <RouterLink
                  :class="{
                    'nav-link px-0 mx-5 fw-bold text-danger nav--item': true,
                    active:
                      $route.name == 'post' || $route.name == 'post-detail',
                  }"
                  :to="{name: 'post'}"
                >
                  <i class="bi bi-newspaper text-info me-2"></i>
                  Tin tức
                </RouterLink>
              </li>
              <li >
                <a @click="goBottom" class="nav-link px-0 mx-5 fw-bold text-danger nav--item">
                  <i class="bi bi-telephone-fill text-green me-2"></i>
                  Liên hệ
                </a>
              </li>
              <li>
                <div class="start-0 bg-white me-2">
                  <div class="input-group mt-2">
                    <button class="btn" type="button">
                      <i class="bi bi-search"></i>
                    </button>
                    <input
                      type="text"
                      class="form-control border-0"
                      placeholder="Nhập từ khoá tìm kiếm"
                    />
                  </div>
                </div>
              </li>
              <hr class="mt-0" />
              <!-- Đã đăng nhập -->
              <li v-if="islogin">
                <RouterLink
                  :class="{
                    'nav-link px-0 mx-5 fw-bold text-danger nav--item': true,
                    active: $route.name == 'post',
                  }"
                  :to="{name: 'post'}"
                >
                  <i class="bi bi-cart-fill text-yellow me-2"></i>
                  Giỏ hàng
                </RouterLink>
              </li>
              <li v-if="islogin">
                <RouterLink
                  :class="{
                    'nav-link px-0 mx-5 fw-bold text-danger nav--item': true,
                    active: $route.name == 'post',
                  }"
                  :to="{name: 'post'}"
                >
                  <i class="bi bi-person-fill text-blue me-2"></i>
                  Thông tin cá nhân
                </RouterLink>
              </li>
              <li v-if="islogin">
                <RouterLink
                  :class="{
                    'nav-link px-0 mx-5 fw-bold text-danger nav--item': true,
                    active: $route.name == 'post',
                  }"
                  :to="{name: 'post'}"
                >
                  <i class="bi bi-box-arrow-left text-blue me-2"></i>
                  Đăng xuất
                </RouterLink>
              </li>
              <!-- Chưa đăng nhập -->
              <li v-else>
                <RouterLink class="nav-link px-0 mx-5 fw-bold text-danger nav--item" :to="{name: 'login'}">
                  Đăng nhập
                </RouterLink>
              </li>
              <li v-if="!islogin">
                <RouterLink class="nav-link px-0 mx-5 fw-bold text-danger nav--item" :to="{name: 'signup'}">
                  Đăng ký
                </RouterLink>
              </li>
            </ul>
          </div>
        </transition>
        <!--end toggle-menu -->
        <!-- Category -->
        <div class="d-none d-lg-flex me-lg-2">
          <RouterLink
            :to="{name: 'home'}"
            :class="{
              'nav-link px-0 ms-4 fw-bold text-danger nav--item no-wrap ': true,
              active: $route.name == 'home',
            }"
          >
            Home
          </RouterLink>
          <RouterLink
            :to="{name: 'products'}"
            :class="{
              'nav-link px-0 ms-4 fw-bold text-danger nav--item no-wrap ': true,
              active: $route.name == 'products',
            }"
            @mouseenter="ishowdropdown = true"
            @mouseleave="ishowdropdown = false"
          >
            Sản phẩm
            <i class="bi bi-caret-down-fill inherit"></i>
            <div v-if="ishowdropdown" class="dropdown-menu mt-3 pe-5 d-block">
              <router-link
                v-for="item in list_category"
                :key="item.id"
                :to="{
                  name: 'products',
                  params: {
                    categoryID: item.id,
                  },
                }"
                :class="{
                  'nav-link px-0 ms-4 fw-bold text-danger nav--item no-wrap': true,
                  active: $route.params.categoryID == item.id,
                }"
              >
                {{ item.name }}
              </router-link>
            </div>
          </RouterLink>
          <router-link
            :to="{name: 'post'}"
            :class="{
              'nav-link px-0 ms-4 fw-bold text-danger nav--item no-wrap': true,
              active: $route.name == 'post' || $route.name == 'post-detail',
            }"
          >
            Tin tức
          </router-link>
          <a
            @click="goBottom"
            class="nav-link px-0 ms-4 fw-bold text-danger nav--item no-wrap"
          >
            Liên hệ
          </a>
        </div>
        <!--end Category -->
        <div class="me-2 d-none d-lg-block no-wrap">
          <!-- <router-link :to="{name:'authenticaton'}"  class="btn btn-info ms-4 text-white">Đăng nhập </router-link> -->
          <!-- giỏ hàng + thông tin ở đây -->
          <!-- Đã đăng nhập -->
          <div v-if="islogin">
            <RouterLink :to="{name: 'cart'}" class="ms-2 btn cart  px-2 item--header">
              <i class="bi bi-cart-dash me-1 ">  <span class=" ms-1 inherit text-select">Giỏ hàng</span></i>
            </RouterLink>
            <router-link class="btn person  px-2 item--header" :to="{name:'cart'}">
              <i class="bi bi-person me-1"> <span class=" ms-1 inherit text-select">Tài khoản</span></i>
            </router-link>
            <router-link class="btn fs-6 logout px-2 item--header " title="Đăng xuất" :to="{name:'home'}">
              <i class="bi bi-box-arrow-right me-1"><span class=" ms-1 inherit text-select">Đăng xuất</span></i>
            </router-link>
          </div>
       <!-- Chưa đăng nhập -->
       <div v-else class="d-flex">
         <RouterLink :to="{name: 'login'}" class="ms-2 btn cart  px-2 item--header">
             <span class=" ms-1 inherit text-select">Đăng nhập</span>
          </RouterLink>
          <span class=" align-self-center">/</span>
          <RouterLink :to="{name: 'signup'}" class=" btn cart  px-2 item--header">
             <span class=" ms-1 inherit text-select">Đăng ký</span>
          </RouterLink>
       </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import {RouterLink, useRoute} from "vue-router"
import {ref, onBeforeMount} from "vue"
import {company_list, type_list} from "../data/filter"
import {getCategory_noParent} from "../modules/home/HomeAPI.js"
import { useStore } from 'vuex'
export default {
  setup() {
    const ishowMenu = ref(false)
    const ishowdropdown = ref(false)
    const route = useRoute()
    const islogin=useStore().state.user.jwtToken!=null
    const list_category = ref([])
    const goBottom = () =>
      document.querySelector("footer").scrollIntoView({behavior: "smooth"})
    onBeforeMount(async () => {
      list_category.value = await getCategory_noParent()
    })

    return {
      islogin,
      ishowMenu,
      ishowdropdown,
      list_category,
      company_list,
      type_list,
      goBottom,
    }
  },
}
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
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  margin-bottom: -10px;
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
  color: var(--bs-blue) !important;
  position: relative;
}
.text-select{
  font-weight: 600;
  font-style: normal;
  color: rgba(0, 0, 0, 0.761);
}

.cart::after,
.person::after,
.logout::after,
.search::after {
  content: "";
  position: absolute;
  width: 0%;
  top: 0;
  bottom: 0;
  left: 0;
  opacity: 0.1;
  z-index: 1;
  height: 40px;
  border-radius: 10%;
  background-color: currentColor;
}
.item--header:hover span{
  color: rgb(0, 132, 255) !important;;
}

.logout {
  color: var(--bs-blue) !important;
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
