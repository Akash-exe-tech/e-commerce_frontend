<template>
  <header class="bg-black shadow-md fixed top-0 left-0 right-0 z-50">
    <div class="flex justify-between items-center h-16 px-4 md:px-12">
      
      <!-- Logo -->
      <div class="flex-shrink-0 pl-6 md:pl-12">
        <router-link to="/">
          <img class="h-10 w-auto" src="/logo.png" alt="Logo" />
        </router-link>
      </div>

      <!-- Navigation Links -->
      <nav class="hidden md:flex space-x-8 text-white font-medium pr-6 md:pr-30">
        <router-link to="/" class="hover:text-gray-300">Home</router-link>
        <router-link to="/products" class="hover:text-gray-300">Products</router-link>
        <router-link to="/about" class="hover:text-gray-300">About Us</router-link>
        <router-link to="/contact" class="hover:text-gray-300">Contact</router-link>
      </nav>

      <!-- User Icon -->
      <div class="relative pr-6">
        <button @click="toggleDropdown" class="text-white text-xl focus:outline-none">
          👤
        </button>

        <!-- Dropdown menu -->
        <div v-if="showDropdown" class="absolute right-0 mt-2 bg-white rounded shadow-md py-2 w-32">
          <router-link to="/login" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</router-link>
          <router-link to="/register" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Register</router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const showDropdown = ref(false)

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}
</script>

