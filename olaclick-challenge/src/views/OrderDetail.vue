<template>
  <v-container>
    <v-row class="mb-4">
      <v-btn @click="goBack" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-row>

    <v-row>
      <v-col v-if="order">
        <v-card>
          <v-card-title class="text-h3">Id de Orden: {{ order.id }}</v-card-title>
          <v-card-subtitle class="text-h4">Cliente: {{ order.client }}</v-card-subtitle>
          <v-divider></v-divider>

          <v-table>
            <thead>
              <tr>
                <th class="text-center text-h5">Item</th>
                <th class="text-center text-h5">Descripción</th>
                <th class="text-center text-h5">Cantidad</th>
                <th class="text-center text-h5">Costo unitario $</th>
                <th class="text-center text-h5">Costo total $</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.updatedDetail" :key="item.productId">
                <td class="text-center text-h6">{{ item.productId }}</td>
                <td class="text-center text-h6">{{ item.title }}</td>
                <td class="text-center text-h6">{{ item.quantity }}</td>
                <td class="text-center text-h6">{{ item.price.toFixed(2) }}</td>
                <td class="text-center text-h6">{{ item.total.toFixed(2) }}</td>
              </tr>
            </tbody>
          </v-table>

          <v-divider></v-divider>
          <v-card-subtitle class="text-center text-h5 mt-3 font-weight-bold">Total: $ {{ order.total.toFixed(2) }}</v-card-subtitle>
          <v-card-subtitle class="text-center text-h6 mt-1 mb-3">Estado: {{ order.status }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchOrderById } from '../services/orderService'

const order = ref(null)
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const orderId = route.params.orderId
  order.value = await fetchOrderById(orderId)
})


const goBack = () => {
  router.go(-1) 
}
</script>

<style scoped>
  
</style>
