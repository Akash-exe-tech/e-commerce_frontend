import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const addToCart = (product, token) => {
  api.post('/api/cart', {
    product_id: product.id,
    quantity: 1
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    console.log(res.data.message);
  }).catch(err => {
    console.error('Add to cart failed:', err.response?.data || err.message);
  });
};
