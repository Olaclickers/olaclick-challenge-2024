<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getOrderDetails } from '../utils/getOrderDetails'
import BackButton from '../components/Button.vue'

// Obtener el parámetro de la ruta
const route = useRoute()
const orderId = Number(route.params.id)

// Variable reactiva para los detalles de la orden
const orderDetails = ref(null)

// Cargar los datos de la orden al montar el componente
onMounted(() => {
  orderDetails.value = getOrderDetails(orderId)
})
</script>

<template>
  <main class="order-details-container" v-if="orderDetails">
    <BackButton />
    <h1>Detalles de la Orden</h1>
    <section class="order-header">
      <p><strong>Id de Orden:</strong> {{ orderDetails.id }}</p>
      <p><strong>Cliente:</strong> {{ orderDetails.cliente }}</p>
    </section>

    <section class="order-items">
      <h2>Detalle de orden:</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Costo unitario $</th>
            <th>Costo total $</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orderDetails.items" :key="item.item">
            <td>{{ item.item }}</td>
            <td>{{ item.descripcion }}</td>
            <td>{{ item.cantidad }}</td>
            <td>{{ item.costoUnitario.toFixed(2) }}</td>
            <td>{{ item.costoTotal.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="order-summary">
      <p><strong>Total:</strong> $ {{ orderDetails.total.toFixed(2) }}</p>
      <p :class="`status-${orderDetails.estado.toLowerCase()}`">
        <strong>Estado:</strong> {{ orderDetails.estado.toUpperCase() }}
      </p>
    </section>
  </main>

  <p v-else>Cargando detalles de la orden...</p>
</template>
