<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useOrderStore } from '../store/orderStore';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { formatCurrency } from '../utils/formatters';

const route = useRoute();
const router = useRouter();
const orderStore = useOrderStore();
const { orders } = storeToRefs(orderStore);

const orderId = computed(() => Number(route.params.orderId));
const order = computed(() => orders.value.find(o => o.id === orderId.value) ?? null);

const navigateToOrdersList = () => router.push('/orders');
</script>

<template>
  <div v-if="order">
    <v-btn color="blue" variant="text" @click="navigateToOrdersList">
      ⬅ Voltar para Pedidos
    </v-btn>

    <h1>Detalhes do Pedido #{{ order.id }}</h1>
    <p><strong>Cliente:</strong> {{ order.client }}</p>
    <p><strong>Detalhe:</strong> {{ order.detail || '---' }}</p>
    <p><strong>Valor Total:</strong> {{ formatCurrency(order.total) }}</p>

    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
          <!-- Loop through each item in the order -->
        <!-- Percorre cada item do pedido -->
        <tr v-for="item in order.items ?? []" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.description || '---' }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ formatCurrency(item.unitPrice) }}</td>
          <td>{{ formatCurrency(item.quantity * item.unitPrice) }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else class="error-message">
    <p>Pedido não encontrado.</p>
  </div>
</template>