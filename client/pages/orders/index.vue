<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-2">
      <h1>Órdenes</h1>
      <!-- Nueva orden -->
      <v-btn @click="createOrder" color="primary">Nueva orden</v-btn>
    </div>

    <!-- Campo de búsqueda por ID -->
    <v-text-field
      v-model="searchId"
      label="Buscar por ID"
      dense
      class="mb-2"
      clearable
      @keyup.enter="searchOrderById"
    >
      <template v-slot:append>
        <v-btn icon @click="searchOrderById">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <div v-if="orders.length === 0">
      <v-alert type="info" outlined> No hay órdenes registradas. </v-alert>
    </div>

    <v-row
      v-else
      ref="scrollContainer"
      style="overflow-y: auto; max-height: 80vh"
      @scroll="handleScroll"
    >
      <v-col v-for="order in orders" :key="order.id" cols="12" md="6" lg="4">
        <v-card @click="viewOrder(order)">
          <v-list-item class="w-100">
            <template v-slot:prepend>
              <v-card-title> Orden #{{ order.id }} </v-card-title>
            </template>
            <template v-slot:append>
              <v-card-title> Estado: {{ order.status.name }} </v-card-title>
            </template>
          </v-list-item>
          <v-list-item>
            <v-card-text>
              <h3>Detalles de la orden...</h3>
              <span v-for="(item, index) in order.items" :key="item.id">
                {{ item.item.name }}
                <span v-if="index < order.items.length - 1"> + </span>
              </span>
            </v-card-text>
          </v-list-item>
          <v-list-item>
            <template v-slot:prepend>
              <v-card-subtitle>
                <p>Cliente: {{ order.client.name }}</p>
              </v-card-subtitle>
            </template>
            <template v-slot:append>
              <v-card-title>
                <p>Total: {{ order.total }}</p>
              </v-card-title>
            </template>
          </v-list-item>
        </v-card>
      </v-col>
      <!-- Indicador de carga -->
      <v-col cols="12" class="text-center" v-if="loading">
        <v-progress-circular indeterminate></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useAxios } from "~/composables/useAxios";

const orders = ref([]);
const currentPage = ref(1);
const lastPage = ref(0);
const loading = ref(false);
const searchId = ref("");

const axios = useAxios();
const router = useRouter();

// Función para cargar las órdenes
async function loadOrders() {
  if (
    loading.value ||
    (currentPage.value > 1 && currentPage.value > lastPage.value)
  )
    return;

  loading.value = true;
  try {
    let endpoint = `/api/orders?page=${currentPage.value}`;
    if (searchId.value) {
      endpoint = `/api/orders?page=${currentPage.value}&id=${searchId.value}`;
    }

    const response = await axios.get(endpoint);
    const data = response;

    // Agregar nuevas órdenes a la lista existente
    orders.value = [...orders.value, ...data.data];
    currentPage.value = data.current_page;
    lastPage.value = data.last_page;
  } catch (error) {
    console.error("Error al cargar las órdenes:", error);
  } finally {
    loading.value = false;
  }
}

// Función para manejar el scroll
function handleScroll(event: Event) {
  const container = event.target as HTMLElement;

  // Verificar si se alcanzó el final del scroll
  if (
    container.scrollTop + container.clientHeight >=
    container.scrollHeight - 10
  ) {
    if (currentPage.value < lastPage.value) {
      currentPage.value++;
      loadOrders();
    }
  }
}

// Función para buscar por ID
function searchOrderById() {
  currentPage.value = 1; // Reiniciar la página a 1
  orders.value = []; // Limpiar los resultados anteriores
  loadOrders(); // Cargar los resultados con el nuevo ID
}

// Crear una nueva orden
const createOrder = () => {
  router.push("/orders/create");
};

// Cargar la primera página al montar el componente
onMounted(() => {
  loadOrders();
});

// Redirigir al detalle de una orden
const viewOrder = (order: { id: number }) => {
  if (order.id !== undefined) {
    console.log("Ver orden:", order.id);
    router.push(`/orders/${order.id}`);
  } else {
    console.error("El ID de la orden es indefinido.");
  }
};

watch(searchId, () => {
  if (!searchId.value) {
    currentPage.value = 1;
    orders.value = [];
    loadOrders();
  }
});
</script>
