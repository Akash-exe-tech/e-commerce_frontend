<template>
  <div class="max-w-3xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6">Checkout</h2>

    <!-- Total Amount -->
    <div class="text-lg font-semibold mb-4">
      Total Amount to Pay: ₹{{ subtotal }}
    </div>

    <!-- Payment Methods -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Select Payment Method</h3>
      <select v-model="paymentMethod" class="w-full border p-2 rounded">
        <option disabled value="">Choose a payment method</option>
        <option v-for="method in paymentMethods" :key="method.key" :value="method.key">
          {{ method.label }}
        </option>
      </select>
    </div>

    <!-- Conditional Inputs for Address / UPI / Card Details -->
    <div v-if="paymentMethod === 'cod'" class="mb-4">
      <input
        v-model="address"
        type="text"
        placeholder="Enter delivery address"
        class="w-full border rounded px-3 py-2"
      />
    </div>
    <div v-if="paymentMethod === 'upi'" class="mb-4">
      <input
        v-model="upiId"
        type="text"
        placeholder="Enter UPI ID"
        class="w-full border rounded px-3 py-2"
      />
    </div>
    <div v-if="paymentMethod === 'card'" class="mb-4">
      <input
        v-model="cardNumber"
        type="text"
        placeholder="Card Number"
        class="w-full border rounded px-3 py-2 mb-2"
      />
      <input
        v-model="expiry"
        type="text"
        placeholder="Expiry Date (MM/YY)"
        class="w-full border rounded px-3 py-2 mb-2"
      />
      <input
        v-model="cvv"
        type="text"
        placeholder="CVV"
        class="w-full border rounded px-3 py-2"
      />
    </div>

    <!-- Pay Button -->
    <button
      @click="placeOrder"
      :disabled="!paymentMethod || loading"
      class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
    >
      {{ loading ? 'Processing...' : 'Place Order' }}
    </button>

    <!-- Success/Error Message -->
    <p v-if="paymentSuccess" class="mt-4 text-green-600 font-medium">
      ✅ Payment successful! Thank you for your purchase.
    </p>
    <p v-if="error" class="mt-4 text-red-500 font-medium">
      ❌ {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../axios'

const paymentMethod = ref('')
const address = ref('')
const upiId = ref('')
const cardNumber = ref('')
const expiry = ref('')
const cvv = ref('')

const paymentMethods = ref([])
const loading = ref(false)
const paymentSuccess = ref(false)
const error = ref('')
const cartItems = ref([])

const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.quantity * item.product.price, 0)
)

const fetchCart = async () => {
  try {
    const res = await api.get('/cart')
    cartItems.value = res.data
  } catch (err) {
    console.error('Failed to fetch cart:', err)
  }
}

const fetchPaymentMethods = async () => {
  try {
    const res = await api.get('/payment-methods')
    paymentMethods.value = res.data.methods
  } catch {
    paymentMethods.value = [
      { key: 'cod', label: 'Cash on Delivery' },
      { key: 'upi', label: 'UPI' },
      { key: 'card', label: 'Credit/Debit Card' }
    ]
  }
}

const placeOrder = async () => {
  if (!paymentMethod.value) return
  loading.value = true
  error.value = ''
  paymentSuccess.value = false

  let details = {}

  if (paymentMethod.value === 'cod') {
    if (!address.value) {
      error.value = 'Please enter your address'
      loading.value = false
      return
    }
    details.address = address.value
  }

  if (paymentMethod.value === 'upi') {
    if (!upiId.value) {
      error.value = 'Please enter UPI ID'
      loading.value = false
      return
    }
    details.upi_id = upiId.value
  }

  if (paymentMethod.value === 'card') {
    if (!cardNumber.value || !expiry.value || !cvv.value) {
      error.value = 'Please enter full card details'
      loading.value = false
      return
    }
    details.card = {
      number: cardNumber.value,
      expiry: expiry.value,
      cvv: cvv.value
    }
  }

  try {
    await api.post('/payments', {
      payment_method: paymentMethod.value,
      payment_status: 'completed',
      details: details
    })
    paymentSuccess.value = true
  } catch (err) {
    console.error('Payment error:', err)
    error.value = 'Payment failed. Try again.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCart()
  fetchPaymentMethods()
})
</script>
