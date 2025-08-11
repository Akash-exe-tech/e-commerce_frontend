<template>
  <div class="flex min-h-screen bg-gray-100">
    <aside class="w-64 bg-white shadow-md">
      <nav class="p-4 space-y-2">
        <router-link to="/admin/dashboard" class="block py-2 px-3 rounded hover:bg-gray-200" active-class="bg-gray-300 font-bold">Dashboard</router-link>
        <router-link to="/admin/products" class="block py-2 px-3 rounded hover:bg-gray-200">Products</router-link>
        <router-link to="/admin/orders" class="block py-2 px-3 rounded hover:bg-gray-200">Orders</router-link>
        <router-link to="/admin/users" class="block py-2 px-3 rounded hover:bg-gray-200">Users</router-link>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col">
      <header class="bg-white shadow p-4 flex justify-between items-center">
        <h1 class="text-xl font-semibold">Admin Panel</h1>
        <button @click="logout" class="text-red-500 hover:text-red-700">Logout</button>
      </header>

      <main class="flex-1 p-6 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminLayout",
  methods: {
    logout() {

      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>
