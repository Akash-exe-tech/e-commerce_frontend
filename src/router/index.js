import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import RegisterForm from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import ShopPage from '../views/Shop.vue'
import ProductDetails from '../views/ProductDetails.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/register', component: RegisterForm },
   {
    path: '/',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/shop',
    name: 'Shop',
    component: ShopPage
  },
  {
    path: '/',
    name: 'Home',
    component: ShopPage
  },
  {
    path: '/product/:slug',
    name: 'ProductDetails',
    component: ProductDetails
  },
]

 

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router