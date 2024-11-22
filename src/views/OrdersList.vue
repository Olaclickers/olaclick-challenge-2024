<script setup>
import { useRouter } from 'vue-router'
import { VDataTable, VIcon } from 'vuetify/components'
import BackButton from '../components/Button.vue'
import DB from '../db/orders.json'

const router = useRouter()

// Función para manejar el clic en el icono de "ver detalles"
const viewOrderDetails = (orderId) => {
  router.push(`/order/${orderId}`)
}
</script>

<template>
  <div class="orders-container">
    <BackButton />
    <h1 class="orders-title">Lista de Órdenes <VIcon>mdi-format-list-bulleted</VIcon></h1>

    <!-- Tabla de órdenes -->
    <VDataTable :items="DB.orders" item-value="id" class="orders-table">
      <!-- Slot para mostrar las filas de la tabla -->
      <template v-slot:item="{ item }">
        <tr :class="{ 'status-entregado': item.estado === 'entregado' }">
          <td>{{ item.estado === 'entregado' ? '----' : item.id }}</td>
          <td>{{ item.estado === 'entregado' ? '----' : item.detalle }}</td>
          <td>{{ item.estado === 'entregado' ? '----' : item.cliente }}</td>
          <td>{{ item.estado === 'entregado' ? '----' : item.total }}</td>
          <td :class="`status-${item.estado.toLowerCase()}`">
            {{ item.estado === 'entregado' ? '----' : item.estado }}
          </td>
          <td>
            <!-- Icono de ver detalles -->
            <template v-if="item.estado !== 'entregado'">
              <VIcon @click="viewOrderDetails(item.id)" class="icon"> mdi-eye </VIcon>
            </template>
            <template v-else> ---- </template>
          </td>
        </tr>
      </template>
    </VDataTable>
  </div>
</template>
