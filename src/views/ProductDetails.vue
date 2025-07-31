<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Product Image -->
      <div class="w-full md:w-1/2">
        <img :src="product.image" alt="Product" class="w-full rounded shadow" />
      </div>

      <!-- Product Info -->
      <div class="w-full md:w-1/2 space-y-4">
        <h1 class="text-2xl font-bold">{{ product.name }}</h1>
        <p class="text-gray-600">{{ product.description }}</p>
        <p class="text-blue-600 font-bold text-lg">₹{{ product.price }}</p>

        <!-- Action Buttons -->
        <div class="flex gap-4 mt-4">
  <button class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer">
            Add to Cart
          </button>
  <button class="bg-white text-black border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition cursor-pointer">
            Add to Wishlist
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetails',
  data() {
    return {
      product: {}
    };
  },
  created() {
    const products = [
      {
        id: 1,
        slug: 'bluetooth-speaker',
        name: 'Bluetooth Speaker',
        brand: 'Sony',
        price: 2999,
        image: '/images.jpeg',
        description: 'Portable wireless speaker with high-quality sound and bass.'
      },
      {
        id: 2,
        slug: 'nike-running-shoes',
        name: 'Running Shoes',
        brand: 'Nike',
        price: 4999,
        image: '/download (3).jpeg',
        description: 'Comfortable running shoes designed for performance and durability.'
      },
      {
        id: 3,
        slug: 'samsung-led-tv',
        name: 'LED TV',
        brand: 'Samsung',
        price: 24999,
        image: '/download (2).jpeg',
        description: '43-inch Smart LED TV with HD resolution and built-in streaming apps.'
      },
      {
        id: 4,
        slug: 'boat-smartwatch',
        name: 'Smartwatch',
        brand: 'boAt',
        price: 1599,
        image: '/download (1).jpeg',
        description: 'Stylish smartwatch with fitness tracking, notifications, and more.'
      }
    ];

    const slug = this.$route.params.slug;
    this.product = products.find(p => p.slug === slug);
  }
};
</script>
