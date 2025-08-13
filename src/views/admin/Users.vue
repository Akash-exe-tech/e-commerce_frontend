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
          <th class="py-2 px-4">Role</th>
          <th class="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-t">
          <td class="py-2 px-4">{{ user.name }}</td>
          <td class="py-2 px-4">{{ user.email }}</td>
          <td class="py-2 px-4">{{ user.phone }}</td>
          <td class="py-2 px-4 capitalize">{{ user.role }}</td>
          <td class="py-2 px-4 space-x-2">
            <button
              @click="openModal(user)"
              class="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              @click="deleteUser(user.id)"
              class="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow w-96">
        <h3 class="text-xl font-bold mb-4">
          {{ editForm.id ? "Edit User" : "Add User" }}
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

        <select
          v-model="editForm.role"
          class="border p-2 w-full mb-3"
          required
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <div v-if="!editForm.id">
          <input
            v-model="editForm.password"
            type="password"
            placeholder="Password"
            class="border p-2 w-full mb-3"
            required
          />
          <input
            v-model="editForm.password_confirmation"
            type="password"
            placeholder="Confirm Password"
            class="border p-2 w-full mb-3"
            required
          />
        </div>

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
      editForm: {
        id: null,
        name: "",
        email: "",
        phone: "",
        role: "",
        password: "",
        password_confirmation: "",
      },
      baseURL: import.meta.env.VITE_API_BASE_URL,
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    getToken() {
      return localStorage.getItem("token");
    },
    async fetchUsers() {
      try {
        const res = await axios.get(`${this.baseURL}/admin/users`, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.users = res.data;
      } catch (err) {
        console.error("Error fetching users", err);
        alert(err.response?.data?.message || "Failed to load users");
      }
    },
    openModal(user = null) {
      if (user) {
        this.editForm = { ...user, password: "", password_confirmation: "" };
      } else {
        this.editForm = {
          id: null,
          name: "",
          email: "",
          phone: "",
          role: "",
          password: "",
          password_confirmation: "",
        };
      }
      this.showModal = true;
    },
    async saveUser() {
      try {
        if (this.editForm.id) {
          await axios.put(
            `${this.baseURL}/admin/users/${this.editForm.id}`,
            this.editForm,
            { headers: { Authorization: `Bearer ${this.getToken()}` } }
          );
        } else {
          await axios.post(`${this.baseURL}/admin/users`, this.editForm, {
            headers: { Authorization: `Bearer ${this.getToken()}` },
          });
        }
        this.showModal = false;
        this.fetchUsers();
      } catch (err) {
        console.error("Error saving user", err);
        alert(err.response?.data?.message || "Failed to save user");
      }
    },
    async deleteUser(id) {
      if (!confirm("Are you sure?")) return;
      try {
        await axios.delete(`${this.baseURL}/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.fetchUsers();
      } catch (err) {
        console.error("Error deleting user", err);
        alert(err.response?.data?.message || "Failed to delete user");
      }
    },
  },
};
</script>
