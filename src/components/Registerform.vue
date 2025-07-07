<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">

    <div class="bg-white p-6 md:p-8 rounded-2xl w-full max-w-sm">

      <h2 class="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-6">Create Your Account</h2>

      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Full Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 text-left">Full Name</label>
          <input
            v-model="name"
            type="text"
            placeholder="John Doe"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="showError && !name" class="text-red-500 text-xs mt-1">Full Name is required.</p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 text-left">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="you@example.com"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="showError && !email" class="text-red-500 text-xs mt-1">Email is required.</p>
          <p v-else-if="showError && !isEmailValid(email)" class="text-red-500 text-xs mt-1">Invalid email format.</p>
        </div>

        <!-- Password -->
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-1 text-left">Password</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="******"
            class="w-full p-3 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            @click="togglePassword"
            class="absolute right-3 top-[42px] text-gray-500 hover:text-blue-600 cursor-pointer"
          >
            {{ showPassword ? '🙈' : '👁️' }}
          </span>
          <p v-if="showError && !password" class="text-red-500 text-xs mt-1">Password is required.</p>
          <p v-else-if="showError && password.length < 6" class="text-red-500 text-xs mt-1">At least 6 characters required.</p>
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 text-left">Confirm Password</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="confirmPassword"
            placeholder="******"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="showError && !confirmPassword" class="text-red-500 text-xs mt-1">Confirm your password.</p>
          <p v-else-if="showError && confirmPassword !== password" class="text-red-500 text-xs mt-1">Passwords do not match.</p>
        </div>

        <!-- Phone -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 text-left">Phone</label>
          <input
            v-model="phone"
            type="tel"
            placeholder="1234567890"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="showError && !phone" class="text-red-500 text-xs mt-1">Phone is required.</p>
          <p v-else-if="showError && phone.length !== 10" class="text-red-500 text-xs mt-1">Phone must be 10 digits.</p>
        </div>

        <!-- Global Success Alert -->
        <div v-if="success" class="text-sm text-green-600 bg-green-100 p-2 rounded-md">{{ success }}</div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Register
        </button>

        <!-- Login Redirect -->
        <p class="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <span @click="goToLogin" class="text-blue-600 hover:underline font-medium cursor-pointer">
            Login here
          </span>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);

const success = ref('');
const showError = ref(false);

function togglePassword() {
  showPassword.value = !showPassword.value;
}

function isEmailValid(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function submitForm() {
  showError.value = true;
  success.value = '';

  if (!name.value || !email.value || !phone.value || !password.value || !confirmPassword.value) return;
  if (!isEmailValid(email.value)) return;
  if (password.value.length < 6) return;
  if (password.value !== confirmPassword.value) return;
  if (phone.value.length !== 10) return;

  success.value = 'Registration successful!';
  window.location.href = 'register.html'; // Or any target page

  showError.value = false;

  name.value = '';
  email.value = '';
  phone.value = '';
  password.value = '';
  confirmPassword.value = '';
}

function goToLogin() {
  alert('Redirecting to login...');
}
</script>
