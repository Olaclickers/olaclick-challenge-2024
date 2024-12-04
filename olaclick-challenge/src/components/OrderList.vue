<template>
  <v-container>
    <v-row class="mb-4 flex-d justify-center">
      <v-btn @click="goToDelivered" icon class="full-width">
        <v-icon>mdi-package-check</v-icon> Pedidos entregados
      </v-btn>
    </v-row>

    <v-table>
      <thead>
        <tr>
          <th class="text-center">Id</th>
          <th class="text-center">Detalle</th>
          <th class="text-center">Cliente</th>
          <th class="text-center">Total ($)</th>
          <th class="text-center">Estado</th>
        </tr>
      </thead>
      <tbody>
        <OrderItem
          v-for="order in paginatedOrders"
          :key="order.id"
          :order="order"
        />
      </tbody>
    </v-table>

    <div class="pagination-controls">
      <v-btn icon :disabled="currentPage === 1" @click="prevPage">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <v-btn icon :disabled="currentPage === totalPages" @click="nextPage">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchOrders } from '../services/orderService'
import OrderItem from './OrderItem.vue'

const orders = ref([])
const currentPage = ref(1)
const itemsPerPage = 10

const loadOrders = async () => {
  orders.value = await fetchOrders()
}

const totalPages = computed(() => Math.ceil(orders.value.length / itemsPerPage))

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return orders.value.slice(start, end)
})

const router = useRouter()
const goToDelivered = () => {
  router.push('/delivered')
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

onMounted(loadOrders)
</script>

<style scoped>
.pagination-controls {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 16px;
}

.full-width {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100% !important;
  padding: 12px;
  text-align: center;
}
</style>
