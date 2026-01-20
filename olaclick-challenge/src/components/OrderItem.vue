<template>
  <tr @click="viewOrder" class="order-row">
    <td>{{ order.id }}</td>
    <td>{{ order.detail }}</td>
    <td>{{ order.client }}</td>
    <td>{{ order.total.toFixed(2) }}</td>
    <td :class="statusColor(order.status)">{{ order.status }}</td>
  </tr>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  order: Object,
})

const router = useRouter()

const viewOrder = () => {
  router.push({ name: 'OrderDetail', params: { orderId: props.order.id } })
}

const statusColor = (status) => {
  return status === 'iniciado' ? 'green' : 'blue'
}
</script>

<style scoped>
.order-row {
  cursor: pointer;
}

.order-row:hover {
  background-color: #1e88e5;
  color: white;
}

.green {
  color: #388e3c;
  font-weight: bold;
  text-transform: uppercase;
}

.blue {
  color: #1976d2;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
