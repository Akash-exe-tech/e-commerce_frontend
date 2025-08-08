<template>
  <div class="max-w-5xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-6">My Wishlist</h2>

    <div v-if="loading" class="text-gray-500">Loading...</div>

    <div v-else-if="wishlistItems.length === 0" class="text-gray-400">
      No items in your wishlist.
      <router-link to="/products" class="text-blue-600 underline ml-2">
        Shop Now
      </router-link>
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="item in wishlistItems"
        :key="item.id"
        class="border p-4 rounded shadow-sm"
      >
        <img
          :src="item.product.image_url || 'https://via.placeholder.com/150'"
          alt="Product"
          class="w-full h-40 object-contain mb-2"
        />
        <h3 class="font-semibold">{{ item.product.name }}</h3>
        <p>₹{{ item.product.price }}</p>

        <div class="mt-3 flex flex-col gap-2">
          <button
            class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            @click="moveToCart(item.product.id)"
          >
            Move to Cart
          </button>
          <button
            class="text-red-500 hover:underline"
            @click="removeFromWishlist(item.id)"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../axios';

const wishlistItems = ref([]);
const loading = ref(true);

const fetchWishlist = async () => {
  loading.value = true;
  try {
    const res = await api.get('/wishlist');
    wishlistItems.value = res.data;
  } catch (err) {
    console.error('Failed to fetch wishlist', err);
  } finally {
    loading.value = false;
  }
};

const removeFromWishlist = async (wishlistId) => {
  if (!confirm('Remove this item from your wishlist?')) return;
  try {
    await api.delete(`/wishlist/${wishlistId}`);
    await fetchWishlist();
  } catch (err) {
    console.error('Failed to remove from wishlist:', err);
  }
};

const moveToCart = async (productId) => {
  try {
    await api.post('/cart', { product_id: productId, quantity: 1 });
    await fetchWishlist();
  } catch (err) {
    console.error('Failed to move item to cart:', err);
  }
};

onMounted(fetchWishlist);
</script>
