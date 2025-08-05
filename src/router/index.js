import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ShopPage from '../views/Shop.vue'
import ProductDetails from '../views/ProductDetails.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/shop', name: 'Shop', component: ShopPage },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
