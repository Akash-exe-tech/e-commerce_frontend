<!-- ShopNow.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const products = ref([])
const categories = ref([]) // Placeholder for categories
const router = useRouter()

const token = localStorage.getItem('token')

const fetchProducts = () => {
  axios.get('http://localhost:8000/api/products', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      products.value = response.data
    })
    .catch(error => {
      console.error('Error fetching products:', error)
    })
}

onMounted(() => {
  fetchProducts()
})

const goToDetails = (id) => {
  router.push(`/product/${id}`)
}
</script>

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
    <div class="flex-1 p-4">
      <h1 class="text-2xl font-bold mb-4">Shop Now</h1>
      <div v-if="products.length === 0" class="text-gray-600">
        No products available. Please add products from Postman.
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="product in products"
          :key="product.id"
          @click="goToDetails(product.id)"
          class="border rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition"
        >
         <img
            :src="product.image_url"
            alt="Product Image"
            class="w-full h-48 object-contain mb-2 rounded bg-white"
            @error="$event.target.src='https://via.placeholder.com/150'"
          />
          <h2 class="text-lg font-semibold">{{ product.name }}</h2>
          
          <p class="text-green-600 font-bold">₹{{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
