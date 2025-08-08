// src/composables/useAuth.js
import { ref, computed } from 'vue'

// Create a global reactive token state
const token = ref(localStorage.getItem('token'))

export function useAuth() {
  const isAuthenticated = computed(() => !!token.value)

  const login = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)  // ✅ Save the actual token string
  }

  const logout = () => {
    token.value = null
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  const checkAuth = () => {
    const storedToken = localStorage.getItem('token')
    if (storedToken && storedToken !== token.value) {
      token.value = storedToken
    }
    return !!storedToken
  }

  return {
    isAuthenticated,
    login,
    logout,
    token,
    checkAuth
  }
}
