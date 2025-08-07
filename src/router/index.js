import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ShopPage from '../views/Shop.vue'
import ProductDetails from '../views/ProductDetails.vue'
import CartPage from '../components/CartPage.vue'
import Profile from '../pages/Profile.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true } 
  },
  { path: '/', name: 'Home', component: HomePage },
  { path: '/shop', name: 'Shop', component: ShopPage },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
 
      console.log('Route requires auth, but no token found. Redirecting to login.')
      next('/login')
    } else {

      console.log('Token found, allowing access to protected route')
      next()
    }
  } else {

    next()
  }
})


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
 
      console.log('Route requires auth, but no token found. Redirecting to login.')
      next('/login')
    } else {

      console.log('Token found, allowing access to protected route')
      next()
    }
  } else {

    next()
  }
})

export default router