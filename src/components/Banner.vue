<template>
  <div class="flex flex-col md:flex-row items-center justify-between bg-gray-100 min-h-[50vh] px-6 md:px-12 py-6 md:py-8 gap-6">
    
    
    <div class="flex-1 md:w-1/2 px-4 md:pl-12 text-center md:text-left">
      <h2 class="text-3xl md:text-6xl font-bold text-gray-800 mb-3">
        Discover Amazing Products!
      </h2>
      <p class="text-base md:text-2xl text-gray-600 mb-4">
        Great deals and new arrivals just a click away. Start shopping now!
      </p>
      <router-link to="/shop">
        <button class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded shadow transition"
      >
        Shop Now</button>
      </router-link>
    </div>

    
    <div class="flex-1 md:w-1/2 px-4 md:pr-12 flex justify-center">
      <img
        src="/banner3.png"
        alt="Shop Banner"
        class="max-w-[90%] h-auto object-contain bg-transparent pl-6 md:pl-42"
      />
    </div>

  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
