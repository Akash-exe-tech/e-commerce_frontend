<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-3xl font-extrabold mb-8 text-gray-800 border-b pb-4">Checkout - Razorpay</h2>

    <div v-if="loading" class="text-gray-600 text-lg animate-pulse">Loading payment options...</div>

    <div v-else-if="cartItems.length === 0" class="text-center py-12 text-gray-600">
      <p>Your cart is empty. Please add products before checkout.</p>
      <router-link to="/shop" class="text-blue-600 hover:underline mt-4 inline-block">Go to Shop</router-link>
    </div>

    <div v-else>
      <p class="mb-4 text-lg">Amount to pay: <strong>₹{{ subtotal }}</strong></p>

      <button
        @click="initiatePayment"
        class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        :disabled="paymentProcessing"
      >
        {{ paymentProcessing ? 'Processing...' : 'Pay Now' }}
      </button>

      <p v-if="errorMessage" class="mt-4 text-red-600 font-semibold">{{ errorMessage }}</p>
      <p v-if="successMessage" class="mt-4 text-green-600 font-semibold">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../axios';

const router = useRouter();

const cartItems = ref([]);
const subtotal = ref(0);
const loading = ref(true);
const paymentProcessing = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const initiatePayment = async () => {
  errorMessage.value = '';
  successMessage.value = '';
  paymentProcessing.value = true;

  try {
    // 1. Load Razorpay script if not already loaded
    if (!window.Razorpay) {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        throw new Error('Failed to load Razorpay SDK');
      }
    }

    // 2. Create order on backend
    const orderRes = await api.post('/razorpay/order', {
      amount: subtotal.value
    });
    
    const { key, amount, order_id, name, email, contact } = orderRes.data;

    // 3. Setup Razorpay options
    const options = {
      key,
      amount,
      currency: 'INR',
      name: 'Your Store',
      description: 'Order Payment',
      order_id,
      handler: async function(response) {
        try {
          const verifyRes = await api.post('/razorpay/verify', {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
          });
          
          successMessage.value = 'Payment successful! Redirecting to orders...';
          setTimeout(() => router.push('/orders'), 2000);
          
        } catch (verifyError) {
          console.error('Verification error:', verifyError);
          errorMessage.value = verifyError.response?.data?.message || 
            'Payment verification failed. Please contact support.';
        }
      },
      prefill: {
        name,
        email,
        contact: contact || '9999999999' // fallback if no phone
      },
      theme: {
        color: '#3399cc'
      },
      modal: {
        ondismiss: function() {
          paymentProcessing.value = false;
        }
      }
    };

    // 4. Open Razorpay checkout
    const rzp = new window.Razorpay(options);
    rzp.open();
    
    rzp.on('payment.failed', function(response) {
      errorMessage.value = response.error.description || 'Payment failed. Please try again.';
      paymentProcessing.value = false;
    });

  } catch (err) {
    console.error('Payment error:', err);
    errorMessage.value = err.response?.data?.error || 
      'Unable to initiate payment. Please try again.';
    paymentProcessing.value = false;
  }
};

onMounted(() => {
  const cartData = sessionStorage.getItem('cartData');
  const cartSubtotal = sessionStorage.getItem('cartSubtotal');

  if (cartData && cartSubtotal) {
    cartItems.value = JSON.parse(cartData);
    subtotal.value = parseFloat(cartSubtotal);
  }
  loading.value = false;
});
</script>
