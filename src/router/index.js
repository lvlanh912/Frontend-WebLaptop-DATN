import { createRouter, createWebHistory } from 'vue-router'
import store, {} from '../Store.js'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      children:[
        {
          path: '',
          name:'adminhome',
          meta: { title: 'Trang quản trị' },
          component: ()=>import('../views/Admin/DefaultView.vue')
        },
        {
          path: 'quan-ly-don-hang',
          name:'orders_manager',
          meta: { title: 'Quản lý đơn hàng' },
          component: ()=>import('../views/Admin/OrdersView.vue')
        },
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
        },
        {
          path: 'quan-ly-san-pham',
          name:'products_manager',
          meta: { title: 'Quản lý sản phẩm' },
          component: ()=>import('../views/Admin/ProductsView.vue')
        },
        {
          path: 'quan-ly-danh-muc-san-pham/:id?',
          name:'categories_manager',
          meta: { title: 'Quản lý danh mục sản phẩm' },
          component: ()=>import('../views/Admin/CategoriesView.vue'),
          props:true
        },
        {
          path: 'quan-ly-cong-thanh-toan',
          name:'payments_manager',
          meta: { title: 'Quản lý phương thức thanh toán' },
          component: ()=>import('../views/Admin/PaymentsView.vue')
        },
        {
          path: 'cham-soc-khach-hang',
          name:'chats_manager',
          meta: { title: 'Quản lý chat' },
          component: ()=>import('../views/Admin/ChatsView.vue')
        },
        {
          path: 'thong-ke',
          name:'statistics_manager',
          meta: { title: 'Thống kê' },
          component: ()=>import('../views/Admin/StatisticsView.vue')
        },
        {
          path: 'quan-ly-tin-tuc',
          name:'news_manager',
          meta: { title: 'Quản lý tin tức' },
          component: ()=>import('../views/Admin/NewsView.vue')
        },
        {
          path: 'quan-ly-danh-gia/:accountId?',
          name:'comments_manager',
          meta: { title: 'Quản lý đánh giá' },
          component: ()=>import('../views/Admin/CommentsView.vue')
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
//Home
    {
      //master-page
      path: '/',
      name: 'index',
      meta: {title:'Trang chủ'},
      component: ()=>import ('../views/Home/HomeView.vue'),
      children:[
        {
          path: '/dang-nhap',name: 'login',meta:{title:'Đăng nhập'},component: () => import('../views/AuthenticationView.vue')
        },
        {
          path: '/dang-ky',name: 'signup', meta:{title:'Đăng Ký'},component: () => import('../views/AuthenticationView.vue')
        },
        {
          path: '/quen-mat-khau',name: 'forgetPassword', meta:{title:'Quên mật khẩu'},component: () => import('../views/AuthenticationView.vue')
        },
        {
          //trang chủ
          path: '',
          name:'home',
          component: () => import('../views/Home/DefaultHome.vue')
        },
        {
          //sản phẩm
          path: '/danh-sach-san-pham/:categoryID?',name:'products',component: () => import('../views/Home/Product/ProductHome.vue'),
          beforeEnter(to,from,next){
           next()
          }
        },
        {
          //chi tiết sản phẩm
          path: '/chi-tiet-san-pham/:productId',name:'product-detail',component: () => import('../views/Home/Product/ProductDetailtView.vue'),
          beforeEnter(to,from,next){
           next()
          }
        },
        {
          //Giỏ hàng
          path:'/gio-hang',name:'cart',meta:{title:'Giỏ hàng của tôi'},component:()=>import('../views/Home/CartView.vue')
        },
        {
          path: '/tin-tuc',name:'post',meta:{title:'Tin tức'},component: () => import('../views/Home/Post/PostsView.vue')
        },
        {
         path: '/tin-tuc/:id',name:'post-detail',component: () => import('../views/Home/Post/DetailPostView.vue'),
       },
      ]
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
      path:'/lap-top',
      namevi:'Laptop',
      name:'laptop',
      component :()=> import('../views/LaptopView.vue')
    },
    
  ]
})



router.beforeEach((to, from, next) => {
    document.title = to.meta.title??"Index";
    next()
  
})

export default router
