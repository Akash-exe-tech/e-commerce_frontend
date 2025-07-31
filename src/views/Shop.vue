<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white p-4 shadow-md">
      <h2 class="text-xl font-semibold mb-4">Categories</h2>
      <ul class="space-y-2">
        <li v-for="category in categories" :key="category" class="cursor-pointer hover:font-semibold">
          {{ category }}
        </li>
      </ul>
    </aside>

    <!-- Product Grid -->
    
    <main class="flex-1 p-6">
      <h1 class="text-2xl font-bold mb-6">All Products</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <router-link
          v-for="product in products"
          :key="product.id"
          :to="`/product/${product.slug}`"
          class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition block"
        >
          <div class="w-full aspect-[4/3] mb-4 overflow-hidden rounded bg-gray-100">
            <img :src="product.image" alt="product" class="w-full h-full object-cover">
          </div>
          <h2 class="text-lg font-semibold">{{ product.brand }}</h2>
          <p class="text-gray-600">{{ product.name }}</p>
          <p class="text-blue-600 font-bold mt-2">₹{{ product.price }}</p>
        </router-link>


         
      </div>
    </main>
  </div>
  
</template>

<script>
export default {
  name: 'ShopPage',
  data() {
    return {
      categories: ['Electronics', 'Footwear', 'Clothing', 'Home Appliances'],
      products: [
        {
          id: 1,
          name: 'Bluetooth Speaker',
          slug: 'bluetooth-speaker',
          price: 2999,
          
          image: 'images.jpeg'
        },
        {
          id: 2,
          name: 'Running Shoes',
          slug: 'nike-running-shoes',
          price: 4999,
          image: 'download (3).jpeg'
        },
        {
          id: 3,
          name: 'LED TV',
          slug: 'samsung-led-tv',
          price: 24999,
          image: 'download (2).jpeg'
        },
        {
          id: 4,
          name: 'Smartwatch',
          slug: 'boat-smartwatch',
          price: 1599,
          image: 'download (1).jpeg'
        },
      ]
    };
  }
};
</script>

<style scoped>
/* Optional styling */
</style>
