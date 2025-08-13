<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6">Orders</h2>

    <table class="w-full border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2">Order ID</th>
          <th class="border p-2">Customer Name</th>
          <th class="border p-2">Order Date</th>
          <th class="border p-2">Total Items</th>
          <th class="border p-2">Total Amount</th>
          <th class="border p-2">Status</th>
          <th class="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td class="border p-2">{{ order.id }}</td>
          <td class="border p-2">{{ order.customer_name }}</td>
          <td class="border p-2">{{ formatDate(order.order_date) }}</td>
          <td class="border p-2">{{ order.total_items }}</td>
          <td class="border p-2">₹{{ order.total_amount }}</td>
          <td class="border p-2">
            <select
              v-model="order.status"
              @change="updateStatus(order.id, order.status)"
              class="border p-1 rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </td>
          <td class="border p-2 text-center">
            <button
              @click="deleteOrder(order.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const orders = ref([]);
const token = localStorage.getItem("token");

const fetchOrders = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    orders.value = res.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

const updateStatus = async (orderId, newStatus) => {
  try {
    await axios.put(
      `http://localhost:8000/api/orders/${orderId}`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(`Order ${orderId} updated to ${newStatus}`);
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

const deleteOrder = async (orderId) => {
  if (!confirm("Are you sure you want to delete this order?")) return;
  try {
    await axios.delete(`http://localhost:8000/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    orders.value = orders.value.filter((order) => order.id !== orderId);
    console.log(`Order ${orderId} deleted`);
  } catch (error) {
    console.error("Error deleting order:", error);
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

onMounted(fetchOrders);
</script>
