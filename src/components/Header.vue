<template>
  <header class="bg-black shadow-md fixed top-0 left-0 right-0 z-50">
    <div class="flex justify-between items-center h-16 px-4 md:px-12">

      <!-- Logo -->
      <div class="flex-shrink-0 pl-6 md:pl-12">
        <router-link to="/">
          <img class="h-10 w-auto" src="/logo.png" alt="Logo" />
        </router-link>
      </div>

      <!-- Navigation -->
      <nav class="hidden md:flex space-x-8 text-white font-medium pr-6">
        <router-link to="/" class="hover:text-gray-300">Home</router-link>
        <router-link to="/products" class="hover:text-gray-300">Products</router-link>
        <router-link to="/about" class="hover:text-gray-300">About Us</router-link>
        <router-link to="/contact" class="hover:text-gray-300">Contact</router-link>
      </nav>

      <!-- Icon Buttons -->
      <div class="flex items-center gap-4 pr-6">
        <router-link to="/wishlist" title="Wishlist">
          <button class="bg-white p-2 rounded-full hover:bg-gray-200 transition cursor-pointer" title="Wishlist">

            <img src="C:\Users\annaj\Downloads\ecommerce\frontend\public\download.png" alt="Wishlist" class="h-5 w-5" />
          </button>
        </router-link>
        <router-link to="/cart" title="Cart">
          <button class="bg-white p-2 rounded-full hover:bg-gray-200 transition cursor-pointer" title="Cart">
            <img src="C:\Users\annaj\Downloads\ecommerce\frontend\public\images (2).png" alt="Cart" class="h-5 w-5" />
          </button>
        </router-link>
      </div>

    </div>
  </header>
</template>
