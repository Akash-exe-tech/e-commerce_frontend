<template>
  <header class="bg-black shadow-md fixed top-0 left-0 right-0 z-50">
    <div class="flex justify-between items-center h-16 px-4 md:px-12">
      
      
      <div class="flex-shrink-0 pl-6 md:pl-12">
        <router-link to="/">
          <img class="h-10 w-auto" src="/logo.png" alt="Logo" />
        </router-link>
      </div>

      
      <nav class="hidden md:flex space-x-8 text-white font-medium pr-14 ml-auto">
        <router-link to="/" class="hover:text-gray-300">Home</router-link>
        <router-link to="/products" class="hover:text-gray-300">Products</router-link>
        <router-link to="/about" class="hover:text-gray-300">About Us</router-link>
        <router-link to="/contact" class="hover:text-gray-300">Contact</router-link>
      </nav>

      
      <div class="pr-6 relative text-white text-xl">
        
        <div v-if="isAuthenticated" class="cursor-pointer" @click="toggleDropdown">
          👤
          <div v-if="showDropdown" class="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-50">
            <router-link to="/profile" class="block px-4 py-2 hover:bg-gray-100">Profile</router-link>
            <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="doLogout">Logout</div>
          </div>
        </div>

        
        <div v-else class="space-x-4">
          <router-link to="/login" class="bg-white text-black font-semibold py-1.5 px-4 rounded hover:bg-gray-200 transition duration-200">Login</router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'

const showDropdown = ref(false)
const { isAuthenticated, logout } = useAuth()

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const doLogout = () => {
  logout()
  showDropdown.value = false
}
</script>
