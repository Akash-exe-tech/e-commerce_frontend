<script setup>
import { ref, onMounted } from "vue";
import api from "../axios"; // path depends on your folder structure

const orders = ref([]);
const token = localStorage.getItem("token");

const fetchOrders = async () => {
  try {
    const res = await api.get("/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    orders.value = res.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

const updateStatus = async (orderId, newStatus) => {
  try {
    await api.put(`/orders/${orderId}`, { status: newStatus }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Order ${orderId} updated to ${newStatus}`);
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

const deleteOrder = async (orderId) => {
  if (!confirm("Are you sure you want to delete this order?")) return;
  try {
    await api.delete(`/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    orders.value = orders.value.filter((order) => order.id !== orderId);
    console.log(`Order ${orderId} deleted`);
  } catch (error) {
    console.error("Error deleting order:", error);
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

onMounted(fetchOrders);
</script>
