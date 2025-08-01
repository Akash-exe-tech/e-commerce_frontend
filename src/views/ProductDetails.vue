<script>
import { addToCart } from '../axios';

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
  },
  methods: {
    handleAddToCart() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Please login to add items to your cart.");
        return;
      }
      addToCart(this.product, token)
        .then(() => {
          alert('Product added to cart successfully!');
        })
        .catch(err => {
          console.error(err);
          alert('Something went wrong while adding to cart.');
        });
    }
  }
};
</script>
