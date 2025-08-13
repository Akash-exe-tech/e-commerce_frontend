import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ShopPage from '../views/Shop.vue'
import ProductDetails from '../views/ProductDetails.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CartPage from '../views/CartPage.vue'
import WishlistPage from '../views/wishlist.vue'
import CheckoutPage from '../views/CheckoutPage.vue'
import Orders from '../views/orders.vue'
import Profile from '../views/Profile.vue'
import AboutUs from '../views/AboutUs.vue'
import ContactUs from '../views/ContactUs.vue'
import AdminLayout from '../components/AdminLayout.vue'
import AdminDashboard from '../views/admin/Dashboard.vue'
import Users from "../views/admin/Users.vue";
import ProductManagement from "../views/admin/ProductMangement.vue";
import PaymentPage from '../views/Razorpay.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/cart', name: 'Cart', component: CartPage },
  { path: '/wishlist', name: 'Wishlist', component: WishlistPage },
  { path: '/checkout', name: 'Checkout', component: CheckoutPage },
  { path: '/orders', name: 'Orders', component: Orders, meta: { requiresAuth: true } },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/shop', name: 'Shop', component: ShopPage },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
  { path: '/about', component: AboutUs },
  { path: '/contact', component: ContactUs },
  { path: '/razor', name: 'Razor', component: PaymentPage },


  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    redirect: '/admin/dashboard', 
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
      path: "/admin/users",
      component: Users,
      meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
      path: 'products',
      name: 'product-management',
      component: ProductManagement,
      meta: { requiresAuth: true, requiresAdmin: true }
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      console.log('Auth required but no token found. Redirecting to login.')
      return next('/login')
    }

    if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (!user || !user.roles || !user.roles.includes('admin')) {
        console.log('Admin access required but user is not admin. Redirecting to home.')
        return next('/') 
      }
    }

    return next()
  }

  next()
})

export default router