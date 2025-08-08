<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const product = ref(null)
const route = useRoute()
const router = useRouter()
const id = route.params.id
const baseURL = import.meta.env.VITE_API_BASE_URL
const token = localStorage.getItem('token')


onMounted(() => {
  axios.get(`${baseURL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      product.value = res.data
    })
    .catch(err => {
      console.error('Product not found:', err)
    })
})


function addToCart() {
  axios.post(`${baseURL}/cart`, {
    product_id: product.value.id,
    quantity: 1
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      console.log(res.data.message)
      router.push('/cart') 
    })
    .catch(err => {
      console.error('Cart error:', err)
    })
}


function addToWishlist() {
  axios.post(`${baseURL}/wishlist`, {
    product_id: product.value.id
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      console.log(res.data.message)
      router.push('/wishlist') 
    })
    .catch(err => {
      console.error('Wishlist error:', err)
    })
}
</script>

<template>
  <div class="p-8 max-w-4xl mx-auto">
    <div v-if="product" class="border p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-6">
    
      <div>
        <img
          :src="product.image_url || '/placeholder.jpg'"
          alt="Product Image"
          class="w-full h-auto object-cover rounded-lg"
          @error="$event.target.src='https://via.placeholder.com/400'"
        />
      </div>

     
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ product.name }}</h1>
        <p class="text-gray-600 mb-4">{{ product.description }}</p>
        <p class="text-green-700 font-semibold text-xl mb-4">₹{{ product.price }}</p>

      
        <div class="flex space-x-4">
          <button
            @click="addToCart"
            class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer"
          >
            Add to Cart
          </button>
          <button
            @click="addToWishlist"
            class="bg-white text-black border border-black px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Loading product details...</p>
    </div>
  </div>
</template>
