<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Details, ordersData } from "../data/ordersData";

const router = useRouter();
const orders = ref(ordersData);
const showAll = ref(false);

const filteredOrders = computed(() => {
  if (showAll.value) {
    return orders.value;
  }
  return orders.value.filter((order) => order.status !== "entregado");
});

const changeOrderStatus = () => {
  const randomIndex = Math.floor(Math.random() * orders.value.length);
  const randomOrder = orders.value[randomIndex];
  if (randomOrder.status === "iniciado") {
    randomOrder.status = "enviado";
  } else if (randomOrder.status === "enviado") {
    randomOrder.status = "entregado";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "iniciado":
      return "orange";
    case "enviado":
      return "blue";
    case "entregado":
      return "green";
    default:
      return "grey";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "iniciado":
      return "mdi-clock";
    case "enviado":
      return "mdi-send";
    case "entregado":
      return "mdi-check-circle";
    default:
      return "mdi-alert-circle";
  }
};

const getConcatenatedProducts = (details: Details[]) => {
  return details.map((detail: Details) => detail.product).join(", ");
};

const getOrderTotal = (details: Details[]) => {
  return details
    .reduce(
      (total: number, detail: Details) =>
        total + detail.quantity * detail.price,
      0
    )
    .toFixed(2);
};

const toggleDrawer = (orderId: number) => {
  router.push(`/orders/${orderId}`);
};

onMounted(() => {
  setInterval(changeOrderStatus, 5000);
});
</script>

<template>
  <div class="h-full w-full">
    <v-col>
      <v-row class="d-flex justify-start align-center ga-3 mb-10">
        <h1 class="text-purple-darken-4">Lista de Órdenes</h1>
        <v-btn
          v-if="!showAll"
          color="deep-purple-lighten-2"
          @click="showAll = true"
          rounded
          class="d-flex align-center"
        >
          <v-icon left class="mr-2">mdi-eye</v-icon>
          Mostrar todos
        </v-btn>
        <v-btn
          v-if="showAll"
          color="deep-purple-lighten-2"
          @click="showAll = false"
          rounded
          class="d-flex align-center"
        >
          <v-icon class="mr-2" left>mdi-eye-off</v-icon>
          Solo activas
        </v-btn>
      </v-row>
      <v-row class="d-flex justify-start align-center gap-2">
        <div v-if="filteredOrders.length === 0">
          <span>No hay ordenes pendientes</span>
        </div>
        <v-card
          v-for="order in filteredOrders"
          :key="order.id"
          class="ma-2"
          max-width="300"
        >
          <template v-slot:prepend>
            <div class="ga-2 d-flex flex-row">
              <v-icon
                :color="getStatusColor(order.status)"
                :icon="getStatusIcon(order.status)"
              ></v-icon>
              <span> {{ order.status }}</span>
            </div>
          </template>
          <v-card-title>{{ order.client }}</v-card-title>
          <v-card-subtitle>
            Detalle: {{ getConcatenatedProducts(order.details) }}
          </v-card-subtitle>
          <v-card-text>
            Total: ${{ getOrderTotal(order.details) }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="toggleDrawer(order.id)">
              Ver Más
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-col>
  </div>
</template>

<style scoped>
.v-card {
  margin-bottom: 16px;
}
</style>
