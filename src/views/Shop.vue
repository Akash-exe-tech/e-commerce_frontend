<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import LoginModal from '../components/Loginform.vue'

const products = ref([])
const categories = ref([])
const searchQuery = ref('')
const showLoginModal = ref(false)
const activeCategory = ref(null)
const router = useRouter()

const token = localStorage.getItem('token')
const baseURL = import.meta.env.VITE_API_BASE_URL

const fetchProducts = () => {
  axios.get(`${baseURL}/products`, {
    params: {
      search: searchQuery.value
    }
  })
    .then(response => {
      products.value = response.data
      activeCategory.value = null
    })
    .catch(error => {
      console.error('Error fetching products:', error)
    })
}

const fetchCategories = () => {
  axios.get(`${baseURL}/categories`)
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
    }
  })
    .then(response => {
      products.value = response.data
      activeCategory.value = categoryId
    })
    .catch(error => {
      console.error('Error filtering products:', error)
    })
}

const handleProductClick = (id) => {
  if (!token) {
    showLoginModal.value = true
  } else {
    router.push(`/product/${id}`)
  }
}

onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <aside class="w-64 bg-white p-4 shadow-lg rounded-r-xl">
      <h2 class="text-xl font-bold mb-4 border-b pb-2 text-gray-800">Categories</h2>
      <ul class="space-y-2">
        <li
          class="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          :class="activeCategory === null 
            ? 'bg-blue-600 text-white shadow-md' 
            : 'text-gray-700 hover:bg-blue-100'"
          @click="() => { searchQuery = ''; fetchProducts() }"
        >
          All Categories
        </li>

        <li
          v-for="category in categories"
          :key="category.id"
          class="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          :class="activeCategory === category.id 
            ? 'bg-blue-600 text-white shadow-md' 
            : 'text-gray-700 hover:bg-blue-100'"
          @click="filterByCategory(category.id)"
        >
          {{ category.name }}
        </li>
      </ul>
    </aside>


    <div class="flex-1 p-6">
      <h1 class="text-2xl font-bold mb-4 text-gray-800">Shop Now</h1>


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

      <div v-if="products.length === 0" class="text-gray-600 text-center py-10">
        No products found.
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="product in products"
          :key="product.id"
          @click="handleProductClick(product.id)"
          class="border rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition bg-white hover:-translate-y-1 transform duration-200"
        >
          <img
            :src="product.image_url"
            alt="Product Image"
            class="w-full h-48 object-contain mb-2 rounded bg-gray-50"
            @error="$event.target.src='https://via.placeholder.com/150'"
          />
          <h2 class="text-lg font-semibold text-gray-800">{{ product.name }}</h2>
          <p class="text-green-600 font-bold mt-1">₹{{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>

  <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />
</template>
