<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6">Product Management</h2>

    <button
      @click="openModal()"
      class="bg-green-600 text-white px-4 py-2 rounded mb-4"
    >
      Add Product
    </button>

    <table class="w-full border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border px-4 py-2">Image</th>
          <th class="border px-4 py-2">Name</th>
          <th class="border px-4 py-2">Category</th>
          <th class="border px-4 py-2">Price</th>
          
          <th class="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="border px-4 py-2">
            <img
              :src="product.image_url || '/images/fallback-product.png'"
              alt="Product"
              class="w-16 h-16 object-cover"
            />
          </td>
          <td class="border px-4 py-2">{{ product.name }}</td>
          <td class="border px-4 py-2">
            {{ product.categories?.map(c => c.name).join(', ') }}
          </td>
          <td class="border px-4 py-2">₹{{ product.price }}</td>
          
          <td class="border px-4 py-2 space-x-2">
            <button
              @click="openModal(product)"
              class="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              @click="deleteProduct(product.id)"
              class="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded shadow-lg w-96 relative">
        <h3 class="text-xl font-bold mb-4">
          {{ editingProduct ? 'Edit Product' : 'Add Product' }}
        </h3>

        <form @submit.prevent="saveProduct">
          <input
            v-model="form.name"
            type="text"
            placeholder="Product Name"
            class="w-full border p-2 mb-2"
            required
          />
          <textarea
            v-model="form.description"
            placeholder="Description"
            class="w-full border p-2 mb-2"
            required
          ></textarea>
          <input
            v-model="form.price"
            type="number"
            placeholder="Price"
            class="w-full border p-2 mb-2"
            required
          />
          <input
  v-model="form.stock_quantity"
  type="number"
  placeholder="Stock Quantity"
  class="w-full border p-2 mb-2"
  required
/>


          <select
  v-model="form.category_id"
  class="w-full border p-2 mb-2"
  @change="handleCategoryChange"
  required
>
  <option value="">Select Category</option>
  <option
    v-for="cat in categories"
    :key="cat.id"
    :value="cat.id"
  >
    {{ cat.name }}
  </option>
  <option value="new">➕ Add New Category</option>
</select>

<!-- Show input only if adding a new category -->
<div v-if="isAddingCategory" class="flex gap-2 mb-2">
  <input
    v-model="newCategoryName"
    type="text"
    placeholder="Enter new category name"
    class="w-full border p-2"
  />
  <button
    type="button"
    @click="saveCategory"
    class="bg-blue-500 text-white px-4 py-2 rounded"
  >
    Save
  </button>
</div>


          <input
            type="file"
            @change="handleImageUpload"
            class="w-full border p-2 mb-2"
          />

          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="closeModal"
              class="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");

const products = ref([]);
const categories = ref([]);
const isModalOpen = ref(false);
const editingProduct = ref(null);

const form = ref({
  name: "",
  description: "",
  price: "",
  
  category_id: "",
  image: null,
});

const fetchProducts = async () => {
  try {
    if (!baseURL) {
      throw new Error("API base URL is not set! Check your .env file for VITE_API_BASE_URL");
    }

    console.log("Fetching products from:", `${baseURL}/products`);

    const response = await axios.get(`${baseURL}/products`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    products.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error.message || error);
  }
};


const fetchCategories = async () => {
  try {
    const res = await axios.get(`${baseURL}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    categories.value = res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const openModal = (product = null) => {
  if (product) {
    editingProduct.value = product;
    form.value = {
      name: product.name,
      description: product.description,
      price: product.price,
      
      category_id: product.categories?.[0]?.id || "",
      image: null,
    };
  } else {
    editingProduct.value = null;
    form.value = {
      name: "",
      description: "",
      price: "",
      stock_quantity: "",
      category_id: "",
      image: null,
    };
  }
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleImageUpload = (event) => {
  form.value.image = event.target.files[0];
};

const saveProduct = async () => {
  const formData = new FormData();

  Object.keys(form.value).forEach((key) => {
    if (key === "image") {
      if (form.value.image instanceof File) {
        formData.append("image", form.value.image);
      }
    } else {
      formData.append(key, form.value[key]);
    }
  });

  try {
    if (editingProduct.value) {
      await axios.post(
        `${baseURL}/products/${editingProduct.value.id}?_method=PUT`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } else {
      await axios.post(`${baseURL}/products`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    }

    closeModal();
    fetchProducts();
  } catch (error) {
    console.error("Error saving product:", error.response?.data || error.message);
  }
};

;

const deleteProduct = async (id) => {
  if (!confirm("Are you sure you want to delete this product?")) return;
  try {
    await axios.delete(`${baseURL}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

onMounted(() => {
  fetchProducts();
  fetchCategories();
});
const isAddingCategory = ref(false);
const newCategoryName = ref("");

// Triggered when dropdown changes
const handleCategoryChange = () => {
  if (form.value.category_id === "new") {
    isAddingCategory.value = true;
    newCategoryName.value = "";
  } else {
    isAddingCategory.value = false;
  }
};

const saveCategory = async () => {
  if (!newCategoryName.value.trim()) {
    alert("Please enter a category name");
    return;
  }

  try {
    const res = await axios.post(`${baseURL}/categories`, {
      name: newCategoryName.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Push the new category into the list and auto-select it
    categories.value.push(res.data);
    form.value.category_id = res.data.id;
    isAddingCategory.value = false;

    console.log("Category added:", res.data);
  } catch (error) {
    console.error("Error adding category:", error);
  }
};

</script>

<style scoped>
</style>
