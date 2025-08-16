<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6">Order Management</h2>

    <table class="w-full border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border px-4 py-2">Order ID</th>
          <th class="border px-4 py-2">User</th>
          <th class="border px-4 py-2">Total Items</th>
          <th class="border px-4 py-2">Status</th>
          <th class="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td class="border px-4 py-2">{{ order.id }}</td>
          <td class="border px-4 py-2">{{ order.user.name }}</td>
          <td class="border px-4 py-2">{{ order.items.length }}</td>
          <td class="border px-4 py-2">
            <select v-model="order.status" @change="updateStatus(order)">
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </td>
          <td class="border px-4 py-2 space-x-2">
            <button @click="viewOrder(order)" class="bg-blue-500 text-white px-3 py-1 rounded">
              View
            </button>
            <button @click="deleteOrder(order.id)" class="bg-red-500 text-white px-3 py-1 rounded">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="selectedOrder" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow w-96">
        <h3 class="text-xl font-bold mb-4">Order Details</h3>
        <ul>
          <li v-for="item in selectedOrder.items" :key="item.id">
            {{ item.product.name }} - Quantity: {{ item.quantity }} - ₹{{ item.price }}
          </li>
        </ul>
        <button @click="selectedOrder = null" class="mt-4 bg-gray-400 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");

const orders = ref([]);
const selectedOrder = ref(null);

const fetchOrders = async () => {
  try {
    const res = await axios.get(`${baseURL}/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    orders.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const viewOrder = (order) => {
  selectedOrder.value = order;
};

const updateStatus = async (order) => {
  try {
    await axios.put(`${baseURL}/admin/orders/${order.id}`, { status: order.status }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Order status updated");
  } catch (err) {
    console.error(err);
    alert("Failed to update order status");
  }
};

const deleteOrder = async (id) => {
  if (!confirm("Are you sure?")) return;
  try {
    await axios.delete(`${baseURL}/admin/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchOrders();
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  fetchOrders();
});
</script>
