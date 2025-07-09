<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="login">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full border px-4 py-2 mb-4 rounded"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full border px-4 py-2 mb-4 rounded"
        />
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p class="text-red-500 mt-4 text-center" v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const password = ref('')
const error = ref('')

const login = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
      email: email.value,
      password: password.value
    })

    const token = response.data.token
    localStorage.setItem('token', token)

    alert('Login successful!')

  } catch (err) {
    if (err.response && err.response.data) {
      error.value = err.response.data.message || 'Login failed'
    } else {
      error.value = 'Server error'
    }
  }
}
</script>
