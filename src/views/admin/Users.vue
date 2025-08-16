<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6">User Management</h2>

    <button
      @click="openModal()"
      class="bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700 transition-colors"
    >
      Add User
    </button>

    <div class="overflow-x-auto">
      <table class="w-full border border-gray-300">
        <thead>
          <tr class="bg-gray-100 border-b">
            <th class="p-2 border">Name</th>
            <th class="p-2 border">Email</th>
            <th class="p-2 border">Phone</th>
            <th class="p-2 border">Role</th>
            <th class="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="border-b">
            <td class="p-2 border">{{ user.name }}</td>
            <td class="p-2 border">{{ user.email }}</td>
            <td class="p-2 border">{{ user.phone }}</td>
            <td class="p-2 border">
              {{ user.roles && user.roles.length ? user.roles[0].name : 'N/A' }}
            </td>
            <td class="p-2 border text-center">
              <button
                @click="editUser(user)"
                class="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
              <button
                @click="deleteUser(user.id)"
                class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded-lg w-96">
        <h3 class="text-xl font-bold mb-4">
          {{ editForm.id ? "Edit User" : "Add User" }}
        </h3>

        <form @submit.prevent="saveUser">
          <input
            v-model="editForm.name"
            type="text"
            placeholder="Name"
            class="w-full p-2 border rounded mb-2"
            required
          />

          <input
            v-model="editForm.email"
            type="email"
            placeholder="Email"
            class="w-full p-2 border rounded mb-2"
            required
          />

          <input
            v-model="editForm.phone"
            type="text"
            placeholder="Phone"
            class="w-full p-2 border rounded mb-2"
          />

          <select
            v-model="editForm.role"
            class="w-full p-2 border rounded mb-2"
            required
          >
            <option value="" disabled>Select Role</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </option>
          </select>

          <input
            v-model="editForm.password"
            type="password"
            placeholder="Password"
            class="w-full p-2 border rounded mb-2"
            :required="!editForm.id"
          />

          <input
            v-model="editForm.password_confirmation"
            type="password"
            placeholder="Confirm Password"
            class="w-full p-2 border rounded mb-2"
            :required="!editForm.id"
          />

          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="closeModal"
              class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      roles: [], // ✅ roles array added
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
    this.fetchRoles(); // ✅ load roles
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
      }
    },

    async fetchRoles() {
      try {
        const res = await axios.get(`${this.baseURL}/admin/roles`, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.roles = res.data;
      } catch (err) {
        console.error("Error fetching roles", err);
      }
    },

    openModal() {
      this.resetForm();
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    resetForm() {
      this.editForm = {
        id: null,
        name: "",
        email: "",
        phone: "",
        role: "",
        password: "",
        password_confirmation: "",
      };
    },

    editUser(user) {
      this.editForm = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        role: user.roles && user.roles.length ? user.roles[0].id : "",
        password: "",
        password_confirmation: "",
      };
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
        this.fetchUsers();
        this.closeModal();
      } catch (err) {
        console.error("Error saving user", err);
      }
    },

    async deleteUser(id) {
      if (!confirm("Are you sure you want to delete this user?")) return;
      try {
        await axios.delete(`${this.baseURL}/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.fetchUsers();
      } catch (err) {
        console.error("Error deleting user", err);
      }
    },
  },
};
</script>
