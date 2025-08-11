<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const featuredProducts = ref([])
const sliderRef = ref(null)
const router = useRouter()

const isAuthenticated = computed(() => {
  return localStorage.getItem('token') !== null
})

const scrollLeft = () => {
  sliderRef.value.scrollLeft -= 300
}

const scrollRight = () => {
  sliderRef.value.scrollLeft += 300
}

const goToProductDetails = (productId) => {
  router.push(`/product/${productId}`)
}

const handleBuyNow = (productId) => {
  if (!isAuthenticated.value) {

    localStorage.setItem('intendedProduct', productId)
    router.push('/login')
  } else {
    goToProductDetails(productId)
  }
}

const handleImageError = (event) => {
  event.target.src = '/images/fallback-product.png'
  event.target.onerror = null
}

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/latest-products`
    )
    featuredProducts.value = data
  } catch (error) {
    console.error('Error fetching latest products:', error)
  }
})
</script>

<template>
  <section class="my-10 px-4 md:px-10">
    <h2 class="text-2xl font-bold mb-4 text-gray-800 pl-6 md:pl-12">
      New Products
    </h2>

    <div ref="sliderRef" class="overflow-x-auto scroll-smooth pl-6 md:pl-12 scrollbar-hide">
      <div class="flex gap-4 w-max">
        <div
          v-for="product in featuredProducts"
          :key="product.id"
          class="min-w-[250px] bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        >
          <div class="w-full h-40 bg-gray-50 rounded mb-3 overflow-hidden flex items-center justify-center">
            <img
              :src="product.image_url || '/images/fallback-product.png'"
              alt="Product Image"
              class="max-w-full max-h-full object-contain"
              @error="handleImageError"
            />
          </div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">
            {{ product.name }}
          </h3>
          <p class="text-sm text-gray-500 mb-1">{{ product.description }}</p>
          <p class="text-xl font-bold text-green-600 mb-3">₹{{ product.price }}</p>
          <button
            @click="handleBuyNow(product.id)"
            class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
          >
            {{ isAuthenticated ? 'Buy Now' : 'Login to Buy' }}
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-2 mt-4 pr-6 md:pr-12">
      <button
        @click="scrollLeft"
        class="px-3 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors duration-200"
        aria-label="Scroll left"
      >
        ◀
      </button>
      <button
        @click="scrollRight"
        class="px-3 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors duration-200"
        aria-label="Scroll right"
      >
        ▶
      </button>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none; 
  scrollbar-width: none;  
}
.scrollbar-hide::-webkit-scrollbar { 
  display: none;  
}
</style>