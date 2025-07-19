
<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div class="bg-white p-6 md:p-8 rounded-2xl w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-blue-700 mb-6">Create Your Account</h2>

      <form @submit.prevent="submitForm" class="flex flex-col space-y-4">
        
        <input v-model="name" type="text" placeholder="Full Name" class="input" />
        <input v-model="email" type="email" placeholder="Email" class="input" />

        
        <div class="relative">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password" class="input pr-10" />
          <span @click="showPassword = !showPassword" class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500">
            {{ showPassword ? '🙈' : '👁️' }}
          </span>
        </div>

        
        <div class="relative">
          <input :type="showConfirm ? 'text' : 'password'" v-model="confirmPassword" placeholder="Confirm Password" class="input pr-10" />
          <span @click="showConfirm = !showConfirm" class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500">
            {{ showConfirm ? '🙈' : '👁️' }}
          </span>
        </div>

        <input v-model="phone" type="tel" placeholder="Phone" class="input" />

        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

        <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
          Register
        </button>
      </form>

      <p class="text-center mt-4 text-sm text-gray-600">
        Already have an account?
        <a href="/login" class="text-blue-600 hover:underline">Login</a>
      </p>
    </div>
  </div>
  
</template>

<script setup>
const showConfirm = ref(false);
const showPassword = ref(false);

import { ref } from 'vue';
import api from '../axios'; 


const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const phone = ref('');
const error = ref('');
const success = ref('');

async function submitForm() {
  if (!name.value || !email.value || !password.value || !confirmPassword.value || !phone.value) {
    error.value = 'Please fill in all fields.';
    return;
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.';
    return;
  }

  try {
    const response = await api.post('/register', {

      name: name.value,
      email: email.value,
      password: password.value,
      phone: phone.value
    });

    success.value = 'Registration successful!';
    error.value = '';

    // Clear fields
    name.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    phone.value = '';
  } catch (err) {
    if (err.response && err.response.status === 422) {
      const errors = err.response.data.errors;
      error.value = Object.values(errors).flat().join(' ');
    } else {
      error.value = 'Something went wrong.';
    }
    success.value = '';
  }
}
const url = import.meta.env.VITE_API_BASE_URL;
console.log(url);

</script>
