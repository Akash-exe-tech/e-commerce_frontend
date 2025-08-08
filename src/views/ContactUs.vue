<template>
  <div class="min-h-screen pt-24 px-6 bg-gray-100">
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h1 class="text-3xl font-bold mb-4">Contact Us</h1>
      <p class="text-lg text-gray-700 mb-6">
        Got questions, feedback, or need help? We're here for you.
      </p>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Name</label>
          <input v-model="form.name" type="text" class="w-full border px-4 py-2 rounded" required />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input v-model="form.email" type="email" class="w-full border px-4 py-2 rounded" required />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Message</label>
          <textarea v-model="form.message" rows="5" class="w-full border px-4 py-2 rounded" required></textarea>
        </div>
        <button type="submit" class="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
          Send Message
        </button>
      </form>

      <div v-if="successMessage" class="text-green-600 mt-4 font-semibold">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const successMessage = ref('')

const submitForm = () => {
  // You can later send this data to your backend via Axios
  console.log('Form submitted:', form.value)
  successMessage.value = 'Thanks for reaching out! We’ll get back to you soon.'
  form.value = { name: '', email: '', message: '' }
}
</script>
