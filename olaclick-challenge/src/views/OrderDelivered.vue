<template>
  <v-container>

    <v-row class="mb-4">
      <v-btn @click="goBack" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-row>

    <v-table>
      <thead>
        <tr>
          <th class="text-center">Id</th>
          <th class="text-center">Detalle</th>
          <th class="text-center">Cliente</th>
          <th class="text-center">Total</th>
          <th class="text-center">Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in paginatedOrders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.detail }}</td>
          <td>{{ order.client }}</td>
          <td>$ {{ order.total }}</td>
          <td class="status">{{ order.status }}</td>
        </tr>
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

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchDeliveredOrders } from '../services/orderService'

export default {
  setup() {
    const orders = ref([])
    const currentPage = ref(1)
    const itemsPerPage = 10

    const loadOrders = async () => {
      orders.value = await fetchDeliveredOrders()
    }

    const totalPages = computed(() => Math.ceil(orders.value.length / itemsPerPage))

    const paginatedOrders = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return orders.value.slice(start, end)
    })

    const router = useRouter()

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++
    }

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--
    }

    const goBack = () => {
    router.go(-1) 
    }

    onMounted(loadOrders)

    return {
      orders,
      currentPage,
      totalPages,
      paginatedOrders,
      nextPage,
      prevPage,
      goBack
    }
  },
}
</script>

<style scoped>
.pagination-controls {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 16px;
}

  .status {
  color: #d11414; 
  font-weight: bold;
  text-transform: uppercase;
}

</style>
