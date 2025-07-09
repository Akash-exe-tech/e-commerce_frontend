<!-- src/views/HomePage.vue -->
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goToRegister() {
  router.push('/register')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-8 text-gray-800">Welcome to Our E-commerce Site</h1>

      <div class="flex justify-center gap-4">
        <button
          @click="goToRegister"
          class="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow"
        >
          Register
        </button>
        <button
          class="cursor-pointer bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded shadow"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>
