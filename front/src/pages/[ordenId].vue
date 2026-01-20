<template>
  <v-container>
    <v-card v-if="orderData">
      <v-card-title>Id de Orden: {{ orderData.id }}</v-card-title>
      <v-card-text>
        <p>Cliente: {{ orderData.cliente }}</p>
        Detalle de orden:
        <v-data-table
          :headers="headers"
          :items="transformedItems"
        ></v-data-table>
        <p class="mt-4">Total de Orden: ${{ orderData.total }}</p>
        <p>Estado: {{ orderData.estado }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="$router.back()">Volver</v-btn>
      </v-card-actions>
    </v-card>
    <v-alert v-else type="error">Order not found</v-alert>
  </v-container>
</template>

<script>
import ordersData from "@/assets/data.json";

export default {
  name: "OrderDetailPage",

  data() {
    return {
      headers: [
        { key: "item", title: "Item" },
        { key: "descripcion", title: "Descripción" },
        { key: "cantidad", title: "Cantidad" },
        { key: "costoUnitario", title: "Costo unitario $" },
        { key: "costoTotal", title: "Costo total $" },
      ],
    };
  },

  computed: {
    orderId() {
      return parseInt(this.$route.params.ordenId);
    },

    orderData() {
      return ordersData.orders.find((order) => order.id === this.orderId);
    },

    transformedItems() {
      if (!this.orderData?.orderDetails?.items) return [];

      return this.orderData.orderDetails.items.map((item) => ({
        item: item.item,
        descripcion: item.descripcion,
        cantidad: item.cantidad,
        costoUnitario: item.costoUnitario.toFixed(2),
        costoTotal: item.costoTotal.toFixed(2),
      }));
    },
  },
};
</script>
