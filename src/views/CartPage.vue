<template>
  <div class="max-w-6xl mx-auto p-6">
    <h2 class="text-3xl font-extrabold mb-8 text-gray-800 border-b pb-4">
      🛒 Your Shopping Cart
    </h2>

    <div v-if="loading" class="text-gray-500 text-lg animate-pulse">
      Loading your cart...
    </div>

    <div v-else-if="cartItems.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-lg">Your cart is currently empty.</p>
      <router-link
        to="/products"
        class="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        🛍 Shop Now
      </router-link>
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex flex-col sm:flex-row items-center justify-between bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition"
      >
        <div class="flex items-center gap-4 w-full sm:w-auto">
          <img
            :src="item.product.image_url || 'https://via.placeholder.com/80'"
            alt="Product Image"
            class="w-20 h-20 object-cover rounded-md border"
          />
          <div>
            <h3 class="font-semibold text-lg text-gray-800">
              {{ item.product.name }}
            </h3>
            <p class="text-blue-600 font-bold">
              ₹{{ item.product.price }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 mt-4 sm:mt-0">
          <input
            type="number"
            v-model.number="item.quantity"
            @change="updateQuantity(item.id, item.quantity)"
            class="w-16 border border-gray-300 px-2 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
          />
          <button
            @click="removeItem(item.id)"
            class="text-red-500 hover:text-red-700 flex items-center gap-1"
          >
            🗑 Remove
          </button>
        </div>
      </div>

      <div class="mt-8 bg-gray-50 border-t pt-6 rounded-lg shadow-inner p-6">
        <p class="text-xl font-bold text-gray-800">
          Subtotal:
          <span class="text-blue-600">₹{{ subtotal }}</span>
        </p>
        <button
          @click="goToCheckout"
          class="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          :disabled="cartItems.length === 0"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '../axios';

const cartItems = ref([]);
const loading = ref(true);
const router = useRouter();

const fetchCart = async () => {
  loading.value = true;
  try {
    const res = await api.get('/cart');
    console.log('Cart API Response:', res.data); // Debug log
    cartItems.value = res.data;
  } catch (err) {
    console.error('Failed to load cart:', err);
  } finally {
    loading.value = false;
  }
};

const updateQuantity = async (itemId, quantity) => {
  if (quantity < 1) return;
  try {
    await api.put(`/cart/${itemId}`, { quantity });
    await fetchCart();
  } catch (err) {
    console.error('Failed to update quantity:', err);
  }
};

const removeItem = async (itemId) => {
  if (!confirm('Remove this item from your cart?')) return;
  try {
    await api.delete(`/cart/${itemId}`);
    await fetchCart();
  } catch (err) {
    console.error('Failed to remove cart item:', err);
  }
};

const subtotal = computed(() =>
  cartItems.value.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  )
);

const goToCheckout = () => {
  // Store cart data in session storage for the checkout page
  sessionStorage.setItem('cartData', JSON.stringify(cartItems.value));
  sessionStorage.setItem('cartSubtotal', subtotal.value);
  router.push('/razor');
};

onMounted(fetchCart);
</script>