<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6">User Management</h2>

    <button
      @click="openModal()"
      class="bg-green-600 text-white px-4 py-2 rounded mb-4"
    >
      Add User
    </button>

    <table class="min-w-full bg-white border rounded">
      <thead>
        <tr class="bg-gray-200 text-left">
          <th class="py-2 px-4">Name</th>
          <th class="py-2 px-4">Email</th>
          <th class="py-2 px-4">Phone</th>
          <th class="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-t">
          <td class="py-2 px-4">{{ user.name }}</td>
          <td class="py-2 px-4">{{ user.email }}</td>
          <td class="py-2 px-4">{{ user.phone }}</td>
          <td class="py-2 px-4 space-x-2">
            <button @click="openModal(user)" class="bg-blue-500 text-white px-3 py-1 rounded">
              Edit
            </button>
            <button @click="deleteUser(user.id)" class="bg-red-500 text-white px-3 py-1 rounded">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add/Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow w-96">
        <h3 class="text-xl font-bold mb-4">
          {{ editForm.id ? 'Edit User' : 'Add User' }}
        </h3>

        <input
          v-model="editForm.name"
          placeholder="Name"
          class="border p-2 w-full mb-3"
          required
        />
        <input
          v-model="editForm.email"
          placeholder="Email"
          type="email"
          class="border p-2 w-full mb-3"
          required
        />
        <input
          v-model="editForm.phone"
          placeholder="Phone"
          class="border p-2 w-full mb-3"
        />

        <div class="flex justify-end space-x-2">
          <button
            @click="showModal = false"
            class="px-3 py-1 bg-gray-400 rounded"
          >
            Cancel
          </button>
          <button
            @click="saveUser"
            class="px-3 py-1 bg-green-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Users",
  data() {
    return {
      users: [],
      showModal: false,
      editForm: { id: null, name: "", email: "", phone: "" },
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.users = res.data;
      } catch (err) {
        console.error("Error fetching users", err);
      }
    },
    openModal(user = null) {
      if (user) {
        this.editForm = { ...user };
      } else {
        this.editForm = { id: null, name: "", email: "", phone: "" };
      }
      this.showModal = true;
    },
    async saveUser() {
      const token = localStorage.getItem("token");
      try {
        if (this.editForm.id) {
          // Update existing user
          await axios.put(
            `http://localhost:8000/api/admin/users/${this.editForm.id}`,
            this.editForm,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else {
          // Create new user
          await axios.post(
            "http://localhost:8000/api/admin/users",
            this.editForm,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
        this.showModal = false;
        this.fetchUsers();
      } catch (err) {
        console.error("Error saving user", err);
      }
    },
    async deleteUser(id) {
      if (!confirm("Are you sure?")) return;
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8000/api/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.fetchUsers();
      } catch (err) {
        console.error("Error deleting user", err);
      }
    },
  },
};
</script>
