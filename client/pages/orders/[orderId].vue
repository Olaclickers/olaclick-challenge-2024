<template>
  <v-container>
    <v-row no-gutters class="mb-3">
      <v-col cols="12" md="6">
        <h1>Detalles de la Orden</h1>
      </v-col>
      <v-col  cols="12" md="6" class="text-md-right">
        <v-btn v-if="orderDetails.order_status_id == 1" @click="goCancel" class="mr-2" color="red">Cancelar</v-btn>
        <v-btn v-if="orderDetails.order_status_id == 1" @click="goSend" class="mr-2" color="purple-darken-2">Enviar</v-btn>
        <v-btn @click="goDelivered" class="mr-2" color="green-darken-2">Entregar</v-btn>
        <v-btn @click="goBack" color="primary">Volver</v-btn>
      </v-col>
    </v-row>
    <p><strong>ID:</strong> {{ orderId }}</p>
    <p><strong>Cliente:</strong> {{ orderDetails.client?.name }}</p>
    <p><strong>Fecha:</strong> {{ orderDetails.created_at }}</p>
    <p><strong>Estado:</strong> {{ orderDetails.status?.name }}</p>
    <h3>Detalle de la orden</h3>
    <v-table class="mb-3">
      <thead>
        <tr>
          <th class="text-left"> Producto </th>
          <th class="text-left"> Cantidad </th>
          <th class="text-left"> Valor Unitario </th>
          <th class="text-left"> Valor Total </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in orderDetails.items" :key="item.id">
          <td>{{ item.item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.price }}</td>
          <td>{{ (item.price * item.quantity).toFixed(2) }}</td>
        </tr>
      </tbody>
    </v-table>
    <div class="mb-3 text-h3">
      <strong>Total: </strong>{{ orderDetails.total }}
    </div>    
  </v-container>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useAxios } from '~/composables/useAxios';
import { VCardItem } from 'vuetify/components';

// Obtiene el parámetro de la URL
const route = useRoute();
const router = useRouter();
const orderId = route.params.orderId;
const axios = useAxios();
const orderDetails = ref({});

// petición get order
async function loadOrder() {
  try {
    const response = await axios.get(`/api/orders/${orderId}`);
    orderDetails.value = response;
  } catch (error) {
    console.error('Error al cargar la orden:', error);
  } finally {
    console.log('Orden cargada:', orderDetails.value);
  }
}

// Cargar la primera página al montar el componente
onMounted(() => {
  loadOrder();
});

// Función para volver a la lista de órdenes
const goBack = () => {
  router.push('/orders');
};

// Función para cambiar el estado de la orden a Enviado
const goSend = async () => {
  try {
    await axios.post(`/api/orders/${orderId}/send`);
    router.push('/orders');
  } catch (error) {
    console.error('Error al cambiar el estado de la orden:', error);
  }
};

// Función para cambiar el estado de la orden a Entregado
const goDelivered = async () => {
  try {
    await axios.post(`/api/orders/${orderId}/delivered`);
    router.push('/orders');
  } catch (error) {
    console.error('Error al cambiar el estado de la orden:', error);
  }
};

// Función para cambiar el estado de la orden a Cancelado
const goCancel = async () => {
  //confirmar si desea cancelar la orden
  if (!confirm('¿Está seguro que desea cancelar la orden?')) {
    return;
  }
  try {
    await axios.post(`/api/orders/${orderId}/cancel`);
    router.push('/orders');
  } catch (error) {
    console.error('Error al cambiar el estado de la orden:', error);
  }
};
</script>
