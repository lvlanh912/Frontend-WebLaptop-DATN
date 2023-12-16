import { createRouter, createWebHistory,createMemoryHistory  } from 'vue-router'
import { useStore } from 'vuex'
import {CheckAdmin} from '../modules/admin/home.js'

const router = createRouter({
  // history: createMemoryHistory (),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      children:[
        {
          path: '',
          name:'adminhome',
          meta: { title: 'Trang quản trị',checkAdmin:true },
          component: ()=>import('../views/Admin/DefaultView.vue')
        },
        {
          path: 'quan-ly-don-hang',
          name:'orders_manager',
          meta: { title: 'Quản lý đơn hàng',checkAdmin:true },
          component: ()=>import('../views/Admin/OrdersView.vue')
        },
        {
          path: 'quan-ly-tai-khoan',
          name:'user_manager',
          meta: { title: 'Quản lý tài khoản',checkAdmin:true },
          component: ()=>import('../views/Admin/AccountsView.vue')
        },
        {
          path: 'quan-ly-ma-giam-gia',
          name:'vouchers_manager',
          meta: { title: 'Quản lý Voucher',checkAdmin:true },
          component: ()=>import('../views/Admin/VouchersView.vue')
        },
        {
          path: 'quan-ly-san-pham',
          name:'products_manager',
          meta: { title: 'Quản lý sản phẩm',checkAdmin:true },
          component: ()=>import('../views/Admin/ProductsView.vue')
        },
        {
          path: 'quan-ly-danh-muc-san-pham/:id?',
          name:'categories_manager',
          meta: { title: 'Quản lý danh mục sản phẩm',checkAdmin:true },
          component: ()=>import('../views/Admin/CategoriesView.vue'),
          props:true
        },
        {
          path: 'quan-ly-cong-thanh-toan',
          name:'payments_manager',
          meta: { title: 'Quản lý phương thức thanh toán',checkAdmin:true },
          component: ()=>import('../views/Admin/PaymentsView.vue')
        },
        {
          path: 'cham-soc-khach-hang',
          name:'chats_manager',
          meta: { title: 'Quản lý chat',checkAdmin:true },
          component: ()=>import('../views/Admin/ChatsView.vue')
        },
        {
          path: 'thong-ke',
          name:'statistics_manager',
          meta: { title: 'Thống kê',checkAdmin:true },
          component: ()=>import('../views/Admin/StatisticsView.vue')
        },
        {
          path: 'quan-ly-tin-tuc',
          name:'news_manager',
          meta: { title: 'Quản lý tin tức',checkAdmin:true },
          component: ()=>import('../views/Admin/NewsView.vue')
        },
        {
          path: 'quan-ly-danh-gia/:accountId?',
          name:'comments_manager',
          meta: { title: 'Quản lý đánh giá',checkAdmin:true },
          component: ()=>import('../views/Admin/CommentsView.vue')
        }
      ],
      component: () => import('../views/Admin/HomeView.vue'),
      beforeEnter(to,from,next){
        const store=useStore()
        if(store.state.user.isAdmin==false)
          router.push('/admin/dang-nhap')
        next()
      },
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
          path: 'dang-nhap',name: 'login',meta:{title:'Đăng nhập'},component: () => import('../views/AuthenticationView.vue')
        },
        {
          path: 'ho-tro',name: 'chat',meta:{title:'Liên hệ trực tuyến'},component: () => import('./../views/Home/ChatView.vue'),
           beforeEnter(to,from,next){
            const store=useStore()
            if(store.state.user.jwtToken==null||store.state.user.isAdmin)
              router.push('/')
            next()
          }
        },
        {
          path: 'dang-ky',name: 'signup', meta:{title:'Đăng Ký'},component: () => import('../views/AuthenticationView.vue')
        },
        {
          path: 'quen-mat-khau',name: 'forgetPassword', meta:{title:'Quên mật khẩu'},component: () => import('../views/AuthenticationView.vue')
        },
        {
          path: 'resetpassword',name: 'resetpass', meta:{title:'Đổi mật khẩu'},component: () => import('../views/AuthenticationView.vue'),
          props: (route) => ({
            key: route.query.key
          })
        },
        {
          //Người dùng
          path: 'tai-khoan',name: 'profile', meta:{title:'Tài khoản của tôi'},component: () => import('../views/Home/ProfileView.vue'),
          beforeEnter(to,from,next){
            const store=useStore()
            if(store.state.user.jwtToken==null||store.state.user.isAdmin)
              router.push('/')
            next()
          },
          children:[
            { path: '',name:'profile-home',meta:{title:'Tài khoản của tôi'},component: () => import('../views/Home/Profile/InforAccountView.vue')},
            { path: 'dia-chi-giao-hang',name:'shipping-address',meta:{title:'Địa chỉ giao hàng của tôi'},component: () => import('../views/Home/Profile/ShippingAddressView.vue')},
            { path: 'phien-dang-nhap',name:'session',meta:{title:'Phiên đăng nhập'},component: () => import('../views/Home/Profile/SessionView.vue')},
            { path: 'don-hang',name:'myorder',meta:{title:'Đơn hàng của tôi'},component: () => import('../views/Home/Profile/OrderView.vue')},
            { path: 'doi-mat-khau',name:'password',meta:{title:'Đổi mật khẩu'},component: () => import('../views/Home/Profile/PasswordChange.vue')}
          ]
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
          path:'/gio-hang',name:'cart',meta:{title:'Giỏ hàng của tôi'},component:()=>import('../views/Home/CartView.vue'),
          beforeEnter(to,from,next){
            const store=useStore()
            if(store.state.user.jwtToken==null||store.state.user.isAdmin)
              router.push('/')
            next()
          }
        },
        {
          //kiểm tra đơn hàng
          path:'/check-out',name:'checkout',meta:{title:'Đặt hàng'},component:()=>import('../views/Home/CheckOutView.vue'),
          beforeEnter(to,from,next){
            const store=useStore()
            if(store.state.user.jwtToken==null||store.state.user.isAdmin)
              router.push('/')
            next()
          }
        },
        {
          //kết quả thanh toán
          path:'/ket-qua-thanh-toan',name:'VNPayResult',meta:{title:'Kết quả giao dịch'},component:()=>import('../views/Home/PaymentOnline/VNpayResult.vue'),
          props: route => ({
            vnp_Amount	: route.query.vnp_Amount	,
            vnp_BankCode	: route.query.vnp_BankCode	,
            vnp_BankTranNo	: route.query.vnp_BankTranNo	,
            vnp_CardType	: route.query.vnp_CardType	,
            vnp_OrderInfo	: route.query.vnp_OrderInfo	,
            vnp_PayDate	: route.query.vnp_PayDate	,
            vnp_ResponseCode	: route.query.vnp_ResponseCode	,
            vnp_SecureHash	: route.query.vnp_SecureHash	,
            vnp_TmnCode	: route.query.vnp_TmnCode	,
            vnp_TransactionNo	: route.query.vnp_TransactionNo	,
            vnp_TransactionStatus	: route.query.vnp_TransactionStatus	,
            vnp_TxnRef	: route.query.vnp_TxnRef	
          })
          // beforeEnter(to,from,next){
          //   const store=useStore()
          //   if(store.state.user.jwtToken==null||store.state.user.isAdmin)
          //     router.push('/')
          //   next()
          // }
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
    if(to.meta.checkAdmin)
     CheckAdmin()
    document.title = to.meta.title??"Index";
    next()
  
})

export default router
