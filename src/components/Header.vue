<template>
  <header class="bg-black shadow-md fixed top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/">
            <!-- Use relative path instead of C:/ -->
            <img class="h-10 w-auto" src="C:\Users\annaj\Downloads\ecommerce\frontend\public\download (2).png" alt="Logo" />
          </router-link>
        </div>

        <!-- Navigation Links -->
        <nav class="hidden md:flex space-x-8 text-white font-medium">
          <router-link to="/" class="hover:text-gray-300">Home</router-link>
          <router-link to="/products" class="hover:text-gray-300">Products</router-link>
          <router-link to="/about" class="hover:text-gray-300">About Us</router-link>
          <router-link to="/contact" class="hover:text-gray-300">Contact</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
// No logic needed for now
</script>

<style scoped>
/* Optional: Add padding-top in main layout to prevent content hiding under header */
</style>
