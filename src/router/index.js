import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import RegisterForm from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  { path: '/home', component: HomePage },
  { path: '/register', component: RegisterForm },
   {
    path: '/',
    name: 'Login',
    component: LoginView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router