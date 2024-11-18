<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import data from "@/assets/orders.json";


const route = useRoute();
const router = useRouter();
const orders = ref(data.orders);
const orderId = ref(null);


onMounted(() => {
  orderId.value = route.params.ordenId || null;
});


const order = computed(() => {
  if (orderId.value) {
    return orders.value.find(o => o.Id === Number(orderId.value));
  }
  return null;
});
const goBack = () => {
  router.back(); // Volver a la página anterior
};

watch(() => route.params.ordenId, (newId) => {
  orderId.value = newId;
});


</script>

<template>
  <v-container>

    <div v-if="order">
      <div class="py-16">
        <h2>Detalles de la Orden: {{ order.Id }}</h2>
        <p><strong>Cliente:</strong> {{ order.Cliente }}</p>
      </div>
      <h3>Detalle de la Orden</h3>
      <v-data-table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Costo Unitario ($)</th>
            <th>Costo Total ($)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.DetalleOrden" :key="item.Item">
            <td class="text-left">{{ item.Item }}</td>
            <td class="text-left">{{ item.Descripcion }}</td>
            <td class="text-left">{{ item.Cantidad }}</td>
            <td>{{ item.CostoUnitario }}</td>
            <td>{{ item.CostoTotal }}</td>
          </tr>
        </tbody>
      </v-data-table>
    </div>

    <div v-else>
      <p>Orden no encontrada.</p>
    </div>
    <v-btn @click="goBack" color="secondary" variant="outlined" size="small" class="mt-4">
      Volver
    </v-btn>
  </v-container>
</template>
