<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const products = ref([])
const categories = ref([])
const searchQuery = ref('') 
const router = useRouter()

const token = localStorage.getItem('token')
const baseURL = import.meta.env.VITE_API_BASE_URL


const fetchProducts = () => {
  axios.get(`${baseURL}/products`, {
    params: {
      search: searchQuery.value
    },
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


const fetchCategories = () => {
  axios.get(`${baseURL}/categories`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      categories.value = response.data
    })
    .catch(error => {
      console.error('Error fetching categories:', error)
    })
}


const filterByCategory = (categoryId) => {
  axios.get(`${baseURL}/products`, {
    params: {
      category_ids: [categoryId],
      search: searchQuery.value
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      products.value = response.data
    })
    .catch(error => {
      console.error('Error filtering products:', error)
    })
}


const goToDetails = (id) => {
  router.push(`/product/${id}`)
}


onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
 
    <aside class="w-64 bg-white p-4 shadow-md">
      <h2 class="text-xl font-semibold mb-4">Categories</h2>
      <ul class="space-y-2">
        <li
          class="cursor-pointer font-semibold text-blue-600"
          @click="() => { searchQuery = ''; fetchProducts() }"
        >
          All Categories
        </li>

        <li
          v-for="category in categories"
          :key="category.id"
          class="cursor-pointer hover:font-semibold"
          @click="filterByCategory(category.id)"
        >
          {{ category.name }}
        </li>
      </ul>
    </aside>

  
    <div class="flex-1 p-6">
      <h1 class="text-2xl font-bold mb-4">Shop Now</h1>

 
      <div class="mb-6 flex items-center gap-2">
        <input
          v-model="searchQuery"
          @keydown.enter="fetchProducts"
          type="text"
          placeholder="Search products..."
          class="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          @click="fetchProducts"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>


      <div v-if="products.length === 0" class="text-gray-600">
        No products found.
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="product in products"
          :key="product.id"
          @click="goToDetails(product.id)"
          class="border rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition bg-white"
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
