import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import RegisterForm from '../views/RegisterView.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/register', component: RegisterForm },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
