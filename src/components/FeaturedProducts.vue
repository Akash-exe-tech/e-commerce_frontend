<template>
  <section class="my-10 px-4 md:px-10">
    <h2 class="text-2xl font-bold mb-4 text-gray-800 pl-6 md:pl-12">Featured Products</h2>

    <div ref="sliderRef" class="overflow-x-auto scroll-smooth pl-6 md:pl-12">
      <div class="flex gap-4 w-max">
        <div
          v-for="product in featuredProducts"
          :key="product.id"
          class="min-w-[250px] bg-white shadow rounded-lg p-4"
        >
          <img :src="product.image" alt="product" class="w-full h-40 object-cover rounded mb-3" />
          <h3 class="text-lg font-semibold text-gray-700">{{ product.name }}</h3>
          <p class="text-sm text-gray-500">{{ product.price }}</p>
          <button class="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Buy Now</button>
        </div>
      </div>
    </div>

   
    <div class="flex justify-end gap-2 mt-4">
      <button @click="scrollLeft" class="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">◀</button>
      <button @click="scrollRight" class="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">▶</button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const featuredProducts = [
  { id: 1, name: "Product 1", price: "$29.99", image: "/images/product1.jpg" },
  { id: 2, name: "Product 2", price: "$39.99", image: "/images/product2.jpg" },
  { id: 3, name: "Product 3", price: "$49.99", image: "/images/product3.jpg" },
  { id: 4, name: "Product 4", price: "$59.99", image: "/images/product4.jpg" },
  { id: 5, name: "Product 5", price: "$69.99", image: "/images/product5.jpg" },
  { id: 6, name: "Product 6", price: "$69.99", image: "/images/product5.jpg" },
  
];

const sliderRef = ref(null);

const scrollLeft = () => {
  sliderRef.value.scrollLeft -= 300;
};

const scrollRight = () => {
  sliderRef.value.scrollLeft += 300;
};
</script>
