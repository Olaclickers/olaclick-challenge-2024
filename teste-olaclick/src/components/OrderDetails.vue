<template>
  <v-container>
    <h2>📦 Detalhes da Ordem #{{ order?.id }}</h2>

    <v-btn color="primary" class="mb-4" @click="goBack" outlined small>
      ← Voltar
    </v-btn>

    <v-alert type="error" v-if="!order">
      Ordem não encontrada. Verifique o ID.
    </v-alert>

    <div v-else>
      <p><strong>Cliente:</strong> {{ order.client }}</p>

      <v-table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Observações</th>
            <th>Quantidade</th>
            <th>Custo unitário ($)</th>
            <th>Total ($)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.items" :key="item.name">
 
            <td>{{ item.name }}</td>
            <td>{{ order.detail }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.unitPrice.toFixed(2) }}</td>
            <td>{{ (item.unitPrice * item.quantity).toFixed(2) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-right"><strong>Total da Ordem ($):</strong></td>
            <td><strong>{{ totalAmount }}</strong></td>
          </tr>
        </tfoot>
      </v-table>
    </div>
  </v-container>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { useOrderStore } from '../store/orderStore';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const orderStore = useOrderStore();
const { orders } = storeToRefs(orderStore);

const orderId = computed(() => Number(route.params.orderId));
const order = computed(() => orders.value.find(o => o.id === orderId.value));

function goBack() {
  router.back();
}

// Computa o valor total da ordem // Compute the total order value
const totalAmount = computed(() => {
  return order.value?.items.reduce((sum, item) => {
    return sum + item.unitPrice * item.quantity;
  }, 0).toFixed(2);
});

</script>