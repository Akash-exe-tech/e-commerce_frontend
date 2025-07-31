<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-xl w-full max-w-md relative">
    
      <!-- <button  @click="router.push('/')" class="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-800">
        ✖
      </button> -->

      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>

    
      <p v-if="error" class="text-red-500 text-sm mb-2">{{ error }}</p>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" class="w-full border rounded px-3 py-2" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Password</label>
          <input v-model="password" type="password" class="w-full border rounded px-3 py-2" required />
        </div>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-gray-800">
          Login
        </button>
      </form>

      
      <p class="text-center text-sm mt-4">
        Don't have an account?
        <router-link to="/register" class="text-blue-500 hover:underline">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../axios.js'
import { useAuth } from '../composables/useAuth.js'

const emit = defineEmits(['close'])

const email = ref('')
const password = ref('')
const error = ref('')
const { login: authLogin } = useAuth()

const handleLogin = async () => {
  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value,
    })

    localStorage.setItem('token', response.data.token)
    alert('Login successful!')
    emit('close') 
    window.location.href = '/' 
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed'
  }
}
</script>
