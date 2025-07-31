<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative">

      <h2 class="text-2xl font-bold text-center text-blue-700 mb-6">Create Your Account</h2>

      <form @submit.prevent="submitForm" class="flex flex-col space-y-4">
        <input v-model="name" type="text" placeholder="Full Name" class="w-full border px-4 py-2 rounded" />
        <input v-model="email" type="email" placeholder="Email" class="w-full border px-4 py-2 rounded" />
        
        <div class="relative">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password" class="w-full border px-4 py-2 rounded pr-10" />
          <span @click="showPassword = !showPassword" class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500">
            {{ showPassword ? '🙈' : '👁️' }}
          </span>
        </div>

        <div class="relative">
          <input :type="showConfirm ? 'text' : 'password'" v-model="confirmPassword" placeholder="Confirm Password" class="w-full border px-4 py-2 rounded pr-10" />
          <span @click="showConfirm = !showConfirm" class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500">
            {{ showConfirm ? '🙈' : '👁️' }}
          </span>
        </div>

        <input v-model="phone" type="tel" placeholder="Phone" class="w-full border px-4 py-2 rounded" />

        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
        <p v-if="success" class="text-green-500 text-sm text-center">{{ success }}</p>

        <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Register</button>
      </form>

      <p class="mt-4 text-center text-sm">
        Already have an account?
        <button @click="emit('switch-to-login')" class="text-blue-500 hover:underline">Login</button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../axios'

const emit = defineEmits(['close', 'switch-to-login'])

const showConfirm = ref(false)
const showPassword = ref(false)

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const phone = ref('')
const error = ref('')
const success = ref('')

async function submitForm() {
  error.value = ''
  success.value = ''

  if (!name.value || !email.value || !password.value || !confirmPassword.value || !phone.value) {
    error.value = 'Please fill in all fields.'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  try {
    await api.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      phone: phone.value
    })

    success.value = 'Registration successful!'
    name.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    phone.value = ''

    setTimeout(() => {
      emit('close')
    }, 1500)
  } catch (err) {
    if (err.response && err.response.status === 422) {
      error.value = Object.values(err.response.data.errors).flat().join(' ')
    } else {
      error.value = err.response?.data?.message || 'Something went wrong.'
    }
  }
}
</script>
