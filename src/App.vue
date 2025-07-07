<script setup>
import { ref } from 'vue';
import RegisterForm from './components/RegisterForm.vue';

const showRegister = ref(false);

function goToRegister() {
  window.location.href = 'register.html'; // or '/register.html' if needed
}



function goToLogin() {
  alert("Navigate to Login Page");
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div class="text-center">
      

      <div v-if="!showRegister" class="flex justify-center gap-4">
        <button
          @click="goToRegister"
          class="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow"
        >
          Register
        </button>

        <button
          @click="goToLogin"
          class="cursor-pointer bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded shadow"
        >
          Login
        </button>
      </div>

      <RegisterForm v-if="showRegister" @close="showRegister = false" />
    </div>
  </div>
</template>
