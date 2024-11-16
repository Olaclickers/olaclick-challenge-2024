<!-- src/pages/[id].vue -->
<template>
  <v-container>
    <v-card>
      <v-card-title>Id de Orden: {{ id }}</v-card-title>
      <v-card-text>
        <p>Cliente: {{ Cliente }}</p>
        Detalle de orden:
        <v-data-table :headers="Headers" :items="Items"></v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="$router.back()">Volver</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "OrderDetailPage",
  mounted() {
    // console.log("Order ID:", this.$route.params.OrderId);
    // TODO: Fetch order details with this.$route.params.OrderId
  },
  data() {
    return {
      id: this.$route.params.ordenId,
      Cliente: "Juan Perez",
      Headers: [
        { key: "Item", title: "Item" },
        { key: "Descripción", title: "Descripción" },
        { key: "Cantidad", title: "Cantidad" },
        { key: "CostoUnidad", title: "Costo unitario $" },
        { key: "CostoTotal", title: "Costo total $" },
      ],
      Items: [
        {
          Item: "A",
          Descripción: "Ensalada cesar",
          Cantidad: "1",
          CostoUnidad: "100.00",
          CostoTotal: "100.00",
        },
      ],
    };
  },
};
</script>
