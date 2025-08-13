<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Dashboard</h2>

    <div class="grid grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded shadow">
        <h3 class="font-semibold mb-2">Total Users</h3>
        <p class="text-3xl">{{ stats.users }}</p>
      </div>
      <div class="bg-white p-6 rounded shadow">
        <h3 class="font-semibold mb-2">Total Products</h3>
        <p class="text-3xl">{{ stats.products }}</p>
      </div>
      <div class="bg-white p-6 rounded shadow">
        <h3 class="font-semibold mb-2">Total Orders</h3>
        <p class="text-3xl">{{ stats.orders }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Dashboard",
  data() {
    return {
      stats: {
        users: 0,
        products: 0,
        orders: 0,
      },
    };
  },
  mounted() {
    this.fetchStats();
  },
  methods: {
    async fetchStats() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
  `${import.meta.env.VITE_API_BASE_URL}/admin/stats`,
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);

        this.stats = response.data;
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    },
  },
};
</script>
