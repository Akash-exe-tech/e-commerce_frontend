// import { createRouter, createWebHistory } from 'vue-router'
// import HomePage from '../views/HomePage.vue'

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: HomePage,
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: HomePage,
//     meta: { modal: 'login' }
//   },
//   {
//     path: '/register',
//     name: 'Register',
//     component: HomePage,
//     meta: { modal: 'register' }
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

// export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
