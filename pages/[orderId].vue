<template>
  <v-container>
    <v-card class="order-card">
      <v-card-title>Detalle de la Orden #{{ order.id }}</v-card-title>
      <v-card-subtitle>Cliente: {{ order.cliente }}</v-card-subtitle>
      <v-card-text>
        <div class="status-container">
          <v-chip :color="getStatusColor(order.estado)" dark class="chip">
            {{ order.estado }}
          </v-chip>

          <v-menu offset-y>
            <template #activator="{ props }">
              <v-btn v-bind="props" class="small-btn" color="primary" dark :disabled="order.estado === 'entregado'">
                Cambiar Estado
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="estado in estados" :key="estado" @click="changeOrderStatus(estado)"
                :disabled="estado === order.estado">
                <v-list-item-title>{{ capitalize(estado) }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <v-divider class="my-4"></v-divider>

        <v-data-table :headers="productHeaders" :items="order.productos" class="elevation-1">
          <template #item.unitario="{ item }">
            ${{ item.unitario }}
          </template>
          <template #item.total="{ item }">
            ${{ item.total }}
          </template>
        </v-data-table>

        <p class="text-right mt-4">
          <strong>Total: ${{ order.total }}</strong>
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="goBack" text color="primary">Volver</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useOrderStore } from "@/stores/orders";

const route = useRoute();
const router = useRouter();
const orderStore = useOrderStore();

const orderId = parseInt(route.params.orderId, 10);
const order = orderStore.getOrderById(orderId);

const estados = ["iniciado", "enviado", "entregado"];
const productHeaders = [
  { text: "Item", value: "item" },
  { text: "Descripción", value: "descripcion" },
  { text: "Cantidad", value: "cantidad" },
  { text: "Costo Unitario ($)", value: "unitario" },
  { text: "Costo Total ($)", value: "total" },
];

const goBack = () => {
  router.push("/");
};

const getStatusColor = (estado) => {
  switch (estado.toLowerCase()) {
    case "iniciado":
      return "blue";
    case "enviado":
      return "orange";
    case "entregado":
      return "green";
    default:
      return "gray";
  }
};

const changeOrderStatus = (estado) => {
  if (order) {
    order.estado = estado;

    if (estado === "entregado") {
      orderStore.orders = orderStore.orders.filter((o) => o.id !== order.id);
      goBack();
    }
  }
};

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
</script>

<style scoped>
.order-card {
  background-color: var(--v-theme-surface) !important;
  color: var(--v-theme-text) !important;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--card-border-color, rgba(255, 255, 255, 0.1));
}

.status-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.small-btn {
  padding: 4px 12px;
  font-size: 0.875rem;
  height: 32px;
  line-height: 1.5;
  border-radius: 16px;
}

.chip {
  font-weight: 500;
  font-size: 14px;
  border-radius: 16px;
}
</style>
