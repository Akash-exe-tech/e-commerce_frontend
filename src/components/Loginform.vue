<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-xl w-full max-w-md relative">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
      
      <p v-if="error" class="text-red-500 text-sm mb-2">{{ error }}</p>
      <p v-if="loading" class="text-blue-500 text-sm mb-2">Logging in...</p>
      
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Email</label>
          <input 
            v-model="email" 
            type="email" 
            class="w-full border rounded px-3 py-2" 
            required 
            :disabled="loading"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Password</label>
          <input 
            v-model="password" 
            type="password" 
            class="w-full border rounded px-3 py-2" 
            required 
            :disabled="loading"
          />
        </div>
        <button 
          type="submit" 
          class="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-gray-800 disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
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
import { useRouter } from 'vue-router'
import api from '../axios.js'
import { useAuth } from '../composables/useAuth.js'

const emit = defineEmits(['close'])
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const { login: authLogin } = useAuth()

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''
    
    console.log('Attempting login with:', { email: email.value })
    
    
    const response = await api.post('/login', {
      email: email.value,
      password: password.value,
    })
    
    console.log('Login response:', response.data)
    
    
    if (response.data.response_code === 200 && response.data.token) {
     
      authLogin(response.data.token)
      
      console.log('Login successful, token saved')
      
      
      emit('close')
      
      
      router.push('/profile')
      
    } else {
      
      error.value = response.data.message || 'Login failed'
      console.error('Login failed:', response.data)
    }
    
  } catch (err) {
    console.error('Login error:', err)
    
    
    if (err.response) {
      console.error('Server error:', err.response.data)
      error.value = err.response.data.message || 'Login failed'
    } else if (err.request) {
      error.value = 'No response from server. Please check your connection.'
    } else {
      error.value = 'An unexpected error occurred'
    }
  } finally {
    loading.value = false
  }
}
</script>