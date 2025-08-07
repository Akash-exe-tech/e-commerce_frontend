<template>
  <div class="max-w-5xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-6">My Wishlist</h2>

    <div v-if="loading" class="text-gray-500">Loading...</div>
    <div v-else-if="wishlistItems.length === 0" class="text-gray-400">
      No items in your wishlist.
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="item in wishlistItems"
        :key="item.product.id"
        class="border p-4 rounded shadow-sm"
      >
        <h3 class="font-semibold">{{ item.product.name }}</h3>
        <p>₹{{ item.product.price }}</p>
        <button
          class="text-red-500 hover:underline mt-2"
          @click="removeFromWishlist(item.product.id)"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../axios'

const wishlistItems = ref([])
const loading = ref(true)

const fetchWishlist = async () => {
  loading.value = true
  try {
    const res = await api.get('/wishlist') 
    wishlistItems.value = res.data
  } catch (err) {
    console.error('Failed to fetch wishlist', err)
  } finally {
    loading.value = false
  }
}

const removeFromWishlist = async (productId) => {
  await api.delete(`/wishlist/${productId}`)
  await fetchWishlist()
}

onMounted(fetchWishlist)
</script>
