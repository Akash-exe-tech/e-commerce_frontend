<template>
  <div class="max-w-6xl mx-auto p-6 mt-20">
    <h2 class="text-3xl font-extrabold mb-6 border-b pb-4">My Orders</h2>

    <div v-if="loading" class="text-gray-600 animate-pulse">
      Loading your orders...
    </div>

    <div v-else-if="orders.length === 0" class="text-center text-gray-600 py-12">
      <p>You have not placed any orders yet.</p>
      <router-link to="/products" class="text-blue-600 hover:underline mt-4 inline-block">
        Shop Products
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="order in orders" :key="order.id">
        <div v-for="item in order.items" :key="item.id" 
             @click="goToProduct(item.product_id)"
             class="border rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition bg-white hover:-translate-y-1 transform duration-200">
          
          <div class="mb-1 text-sm font-semibold" :class="{'text-green-600': order.status === 'completed', 'text-red-600': order.status !== 'completed'}">
            Payment: {{ order.status }}
          </div>

          <div v-if="order.payment_date" class="mb-2 text-xs text-gray-500">
            Paid on: {{ formatDate(order.payment_date) }}
          </div>

          <img :src="item.product_image" alt="Product Image" class="w-full h-48 object-contain mb-2 rounded bg-gray-50" />

          <h2 class="text-lg font-semibold text-gray-800">{{ item.product_name }}</h2>
          <p class="text-green-600 font-bold mt-1">₹{{ item.total_price }}</p>
          <p class="text-gray-500 text-sm mt-1">Qty: {{ item.quantity }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../axios";
import { useRouter } from "vue-router";

const orders = ref([]);
const loading = ref(true);
const router = useRouter();

onMounted(async () => {
  try {
    const res = await api.get("/orders");
    orders.value = res.data;
  } catch (err) {
    console.error("Error fetching orders:", err);
  } finally {
    loading.value = false;
  }
});

const goToProduct = (productId) => {
  router.push(`/product/${productId}`);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
