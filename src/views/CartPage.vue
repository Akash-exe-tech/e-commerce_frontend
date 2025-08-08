
<template>
  <div class="max-w-5xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-6">Your Shopping Cart</h2>

 
    <div v-if="loading" class="text-gray-600">Loading cart...</div>


    <div v-else-if="cartItems.length === 0" class="text-gray-500">
      Your cart is empty.
    </div>


    <div v-else class="space-y-4">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex justify-between items-center border-b pb-4"
      >
        <div>
          <h3 class="font-semibold">{{ item.product.name }}</h3>
          <p class="text-gray-500">₹{{ item.product.price }}</p>
        </div>

        <div class="flex items-center gap-3">
          <input
            type="number"
            v-model.number="item.quantity"
            @change="updateQuantity(item.id, item.quantity)"
            class="w-16 border px-2 py-1 rounded"
            min="1"
          />
          <button @click="removeItem(item.id)" class="text-red-500 hover:underline">
            🗑 Remove
          </button>
        </div>
      </div>

     
      <div class="mt-6 text-right">
        <p class="text-lg font-semibold">Subtotal: ₹{{ subtotal }}</p>
        <button
          @click="goToCheckout"
          class="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Proceed to Checkout
        </button>
        <div v-if="showPayment" class="mt-6 border-t pt-4">
  <h3 class="text-lg font-semibold mb-2">Select Payment Method</h3>
  <select v-model="paymentMethod" class="border p-2 rounded w-full md:w-1/2">
    <option disabled value="">Choose a payment method</option>
    <option v-for="method in paymentMethods" :key="method.key" :value="method.key">
      {{ method.label }}
    </option>
  </select>

  <button
    @click="makePayment"
    class="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
  >
    Pay Now
  </button>

  <p v-if="paymentSuccess" class="mt-4 text-green-600 font-medium">
    ✅ Payment successful! Thank you for your purchase.
  </p>
</div>

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
    cartItems.value = res.data;
  } catch (err) {
    console.error('Failed to load cart:', err);
  } finally {
    loading.value = false;
  }
};

const updateQuantity = async (itemId, quantity) => {
  if (quantity < 1) return;
  await api.put(`/cart/${itemId}`, { quantity });

  await fetchCart();
};

const removeItem = async (itemId) => {
  await api.delete(`/cart/${itemId}`);

  await fetchCart();
};

const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.quantity * item.product.price, 0)
);

const goToCheckout = () => {
  router.push('/checkout');
};

onMounted(fetchCart);
</script>
