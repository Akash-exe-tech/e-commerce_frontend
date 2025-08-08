
<template>
  <div class="min-h-screen pt-24 bg-gray-50 px-6">
    <div class="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      <h2 class="text-2xl font-bold mb-6 text-center">My Profile</h2>
      
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-else-if="user.name" class="space-y-4 text-lg">
        <div><strong>Name:</strong> {{ user.name }}</div>
        <div><strong>Email:</strong> {{ user.email }}</div>
        <div><strong>Phone:</strong> {{ user.phone }}</div>
      </div>
      <div v-else class="text-center text-red-500">
        Failed to load profile data
        <p class="text-sm mt-2">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../axios'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const user = ref({})
const loading = ref(true)
const errorMessage = ref('')
const router = useRouter()
const { checkAuth, isAuthenticated } = useAuth()

onMounted(async () => {
  try {
    const hasToken = checkAuth()
    
    console.log('Profile loading - Token check:', hasToken, isAuthenticated.value)
    
    if (!hasToken || !isAuthenticated.value) {
      console.log('No token found, redirecting to login')
      return router.push('/login')
    }

    console.log('Fetching user profile...')
    
    const response = await api.get('/user')
    console.log('User profile response:', response.data)
    
    user.value = response.data
    console.log('Profile loaded successfully:', user.value)
    
  } catch (error) {
    console.error('Error fetching profile:', error)
    
    errorMessage.value = error.response?.data?.message || error.message
    
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.log('Authentication error, clearing token and redirecting')
      localStorage.removeItem('token')
      router.push('/login')
    }
  } finally {
    loading.value = false
  }
})
</script>