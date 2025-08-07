<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const product = ref(null)
const route = useRoute()
const id = route.params.id
const baseURL = import.meta.env.VITE_API_BASE_URL

onMounted(() => {
  axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`)
    .then(res => {
      product.value = res.data
    })
    .catch(err => {
      console.error('Product not found:', err)
    })
})

function addToCart() {
  console.log('Add to cart clicked:', product.value.id)
  // Add your cart API logic here
}

function addToWishlist() {
  axios.post(`${import.meta.env.VITE_API_BASE_URL}/wishlist`, {
    product_id: product.value.id
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(res => {
    console.log(res.data.message)
  })
  .catch(err => {
    console.error('Wishlist error:', err)
  })

}
</script>

<template>
  <div class="p-8 max-w-4xl mx-auto">
    <div v-if="product" class="border p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- Product Image -->
      <div>
        <img :src="product.image_url" alt="Product Image" class="w-full h-auto object-cover rounded-lg" />
      </div>

      <!-- Product Info -->
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ product.name }}</h1>
        <p class="text-gray-600 mb-4">{{ product.description }}</p>
        <p class="text-green-700 font-semibold text-xl mb-4">₹{{ product.price }}</p>
        
        <!-- Buttons -->
        <!-- Buttons -->
<div class="flex space-x-4">
  <button @click="addToCart"
    class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer">
    Add to Cart
  </button>

  <button @click="addToWishlist"
    class="bg-white text-black border border-black px-4 py-2 rounded hover:bg-gray-100 cursor-pointer">
    Add to Wishlist
  </button>
</div>

      </div>

    </div>

    <div v-else>
      Loading...
    </div>
  </div>
</template>
