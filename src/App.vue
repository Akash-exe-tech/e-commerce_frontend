<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'

const showLoginModal = ref(false)
const showRegisterModal = ref(false)

function openLogin() {
  showRegisterModal.value = false
  showLoginModal.value = true
}

function openRegister() {
  showLoginModal.value = false
  showRegisterModal.value = true
}

function switchToRegister() {
  showLoginModal.value = false
  showRegisterModal.value = true
}

function switchToLogin() {
  showRegisterModal.value = false
  showLoginModal.value = true
}
</script>

<template>
  <div>
    <Header @open-login="openLogin" @open-register="openRegister" />

    <main class="pt-16">
      <router-view />
    </main>

    <LoginForm
      v-if="showLoginModal"
      @close="showLoginModal = false"
      @switch-to-register="switchToRegister"
    />

    <RegisterForm
      v-if="showRegisterModal"
      @close="showRegisterModal = false"
      @switch-to-login="switchToLogin"
    />
  </div>
</template>
