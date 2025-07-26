import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/register', component: RegisterView },
  { path: '/login', component: LoginView }, // ✅ fix here
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
