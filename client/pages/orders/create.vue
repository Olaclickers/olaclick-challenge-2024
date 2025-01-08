<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-2">
      <h1>Nueva Orden</h1>
      <v-btn @click="goBack" color="primary">Volver</v-btn>
    </div>
    <v-row>
      <!-- Lista de Ítems -->
      <v-col v-if="items.length > 0" sm="12" md="8">
        <order-item-list :items="items" @add-item="addItemToOrder" />
      </v-col>

      <!-- Detalles de la Orden -->
      <v-col sm="12" md="4">
        <order-details
          :order="order"
          :clients="clients"
          @remove-item="removeItemFromOrder"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import OrderItemList from "~/components/OrderItemList.vue";
import OrderDetails from "~/components/OrderDetails.vue";
import { useRouter } from "vue-router";
import { useAxios } from '~/composables/useAxios';

const router = useRouter();
const axios = useAxios();

const goBack = () => {
  router.push("/orders");
};

const items = ref([]);
const clients = ref([]);

const order = ref({
  client_id: null,
  items: [],
});

function addItemToOrder(item: any) {
  const existingItem = order.value.items.find((i) => i.id === item.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    order.value.items.push({ ...item, quantity: 1 });
  }
}

function removeItemFromOrder(item: any) {
  order.value.items = order.value.items.filter((i) => i.id !== item.id);
}

async function getItems() {
    try {
        const response = await axios.get("/api/items");
        items.value = response;
    } catch (error) {
        console.error("Error al cargar los ítems:", error);
    }
}

async function getClients() {
    try {
        const response = await axios.get("/api/clients");
        clients.value = response;
    } catch (error) {
        console.error("Error al cargar los clientes:", error);
    }
}

onMounted(() => {
    getItems();
    getClients();
});
</script>
