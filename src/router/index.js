import { createRouter, createWebHistory } from 'vue-router'
import store, {} from '../Store.js'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      children:[
        {
          path: 'quan-ly-tai-khoan',
          name:'user_manager',
          meta: { title: 'Quản lý tài khoản' },
          component: ()=>import('../views/Admin/AccountsView.vue')
        },
        {
          path: 'quan-ly-ma-giam-gia',
          name:'vouchers_manager',
          meta: { title: 'Quản lý Voucher' },
          component: ()=>import('../views/Admin/VouchersView.vue')
        }
      ],
      component: () => import('../views/Admin/HomeView.vue')
    },
    {
      path: '/admin/dang-nhap',
      name: 'admin_login',
      meta: { title: 'Đăng nhập quản trị viên' },
      component: () => import('../views/Admin/LoginView.vue')
    },
    {
      path: '/',
      name: 'home',
      namevi: 'Trang chủ',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
      
    },
    {
      path: '/dang-nhap',
      name: 'authenticaton',
      
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AuthenticationView.vue')
    },
    {
      path:'/lap-top',
      namevi:'Laptop',
      name:'laptop',
      component :()=> import('../views/LaptopView.vue')
    },
    {
      path:'/lap-top/:id',
      name:'laptop_detail',
      component:()=>import('../views/Detail-Laptop.vue')
    },
    {
      path:'/cart',
      name:'card',
      component:()=>import('../views/Cart.vue')
    }
  ]
})



router.beforeEach((to, from, next) => {
    document.title = to.meta.title??"Index";
    next()
  
});

export default router
