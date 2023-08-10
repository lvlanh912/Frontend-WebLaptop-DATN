import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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

export default router
