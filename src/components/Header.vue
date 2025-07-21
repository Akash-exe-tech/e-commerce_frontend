<template>
  <header class="bg-black shadow-md fixed top-0 left-0 right-0 z-50">

    <div class="flex justify-between items-center h-16 px-4 md:px-12">
      
    
      <div class="flex-shrink-0 pl-6 md:pl-12">
        <router-link to="/">
          <img class="h-10 w-auto" src="/logo.png" alt="Logo" />
        </router-link>
      </div>

     
      <nav class="hidden md:flex space-x-8 text-white font-medium pr-6 md:pr-30">
        <router-link to="/" class="hover:text-gray-300">Home</router-link>
        <router-link to="/products" class="hover:text-gray-300">Products</router-link>
        <router-link to="/about" class="hover:text-gray-300">About Us</router-link>
        <router-link to="/contact" class="hover:text-gray-300">Contact</router-link>
      </nav>
      
    </div>
  </header>
</template>

<script setup>

</script>

<style scoped>

</style>
