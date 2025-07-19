<template>
  <footer class="bg-black shadow-inner mt-10">
  
    <div class="px-4 md:px-12 py-6">
      <div class="flex flex-col md:flex-row justify-between items-center text-center md:text-left text-white">
        
        
        <div class="mb-4 md:mb-0">
          <router-link to="/" class="text-xl font-semibold text-white hover:text-blue-400 pl-6 md:pl-12">
            E-Shop
          </router-link>
        </div>

       
        <div class="space-x-4 ">
          <router-link to="/" class="hover:text-blue-400">Home</router-link>
          <router-link to="/products" class="hover:text-blue-400">Products</router-link>
          <router-link to="/about" class="hover:text-blue-400">About</router-link>
          <router-link to="/contact" class="hover:text-blue-400">Contact</router-link>
        </div>

       
        <div class="mt-4 md:mt-0 text-sm pr-6 md:pr-30">
          © {{ new Date().getFullYear() }} E-Shop. All rights reserved.
        </div>
        
      </div>
    </div>
  </footer>
</template>

<script setup>

</script>
