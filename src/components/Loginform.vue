<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" class="w-full border px-4 py-2 mb-3 rounded" />
        <input v-model="password" type="password" placeholder="Password" class="w-full border px-4 py-2 mb-4 rounded" />
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
      </form>
      <p class="text-red-500 mt-2 text-center" v-if="error">{{ error }}</p>
      <button @click="$emit('close')" class="mt-4 text-blue-500 hover:underline w-full text-center">Close</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../axios.js'

const emit = defineEmits(['close'])

const email = ref('')
const password = ref('')
const error = ref('')

const login = async () => {
  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value
    })
    localStorage.setItem('token', response.data.token)
    alert('Login successful!')
    emit('close')
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed'
  }
}
</script>

