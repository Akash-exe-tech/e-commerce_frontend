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
          <td class="border p-2">{{ order.order_date }}</td>
          <td class="border p-2">{{ order.total_items }}</td>
          <td class="border p-2">₹{{ order.total_amount }}</td>
          <td class="border p-2">
            <select
              v-model="order.status"
              @change="updateStatus(order)"
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
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
import api from "../../axios";

const orders = ref([]);

// Fetch orders
onMounted(async () => {
  try {
    const res = await api.get("/orders");
    orders.value = res.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
});

// Update status
const updateStatus = async (order) => {
  try {
    await api.put(`/orders/${order.id}`, { status: order.status });
    console.log(`Order ${order.id} status updated to ${order.status}`);
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

// Delete order
const deleteOrder = async (id) => {
  if (confirm("Are you sure you want to delete this order?")) {
    try {
      await api.delete(`/orders/${id}`);
      orders.value = orders.value.filter((o) => o.id !== id);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  }
};
</script>
