<script setup>
import { ref } from 'vue'
import Banner from '../components/Banner.vue'
import FeaturedProducts from '../components/FeaturedProducts.vue'
import LoginForm from '../components/Loginform.vue'
import RegisterForm from '../components/Registerform.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const showLogin = ref(false)
const showRegister = ref(false)

const openLogin = () => {
  showLogin.value = true
  showRegister.value = false
}

const openRegister = () => {
  showLogin.value = false
  showRegister.value = true
}

const closeModals = () => {
  showLogin.value = false
  showRegister.value = false
}
</script>

<template>
  <div>
    <Header @open-login="openLogin" />

    <Banner />
    <FeaturedProducts />
    <Footer />

   
    <LoginForm
      v-if="showLogin"
      @close="closeModals"
      @switch-to-register="openRegister"
    />

 
    <RegisterForm
      v-if="showRegister"
      @close="closeModals"
      @switch-to-login="openLogin"
    />
  </div>
</template>
