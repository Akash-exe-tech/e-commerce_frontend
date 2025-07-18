<template>
  <footer class="bg-black shadow-inner mt-10">
    <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center text-center md:text-left text-white">
        <!-- Left: Logo or Site Name -->
        <div class="mb-4 md:mb-0">
          <router-link to="/" class="text-xl font-semibold text-white hover:text-blue-400">
            E-Shop
          </router-link>
        </div>

        <!-- Center: Navigation Links -->
        <div class="space-x-4">
          <router-link to="/" class="hover:text-blue-400">Home</router-link>
          <router-link to="/products" class="hover:text-blue-400">Products</router-link>
          <router-link to="/about" class="hover:text-blue-400">About</router-link>
          <router-link to="/contact" class="hover:text-blue-400">Contact</router-link>
        </div>

        <!-- Right: Copyright -->
        <div class="mt-4 md:mt-0 text-sm">
          © {{ new Date().getFullYear() }} E-Shop. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No logic needed unless you want dynamic date formatting
</script>
