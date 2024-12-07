<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getOrderById } from "@/services/Api";
import { useRoute } from "vue-router";
import { formatPrice } from "@/utils";

const route = useRoute();

interface Order {
  id: string;
  client: string;
  detail: string;
  price: number;
  status: string;
  items: any[];
}

const loading = ref(false);
const order = ref<Order | null>(null);

const randomNumber = () => Math.floor(Math.random() * 4) + 1;

const fetchData = async () => {
  try {
    const response = await getOrderById(route.params.id as string);
    order.value = response.data;
  } catch (error) {
    console.error("Error al cargar la orden:", error);
  }
};

onMounted(async () => {
  loading.value = true;
  await fetchData();
  loading.value = false;
});
</script>

<template>
  <v-skeleton-loader type="card" v-if="loading" />
  <main class="py-4 d-flex flex-column items-center justify-center" v-else>
    <v-empty-state
      headline="Order not found"
      text="The order does not exist"
      v-if="!order"
    ></v-empty-state>
    <template v-else>
      <header class="d-flex flex-column ga-6 text-blue-darken-1">
        <h1 class="text-h3 font-weight-bold">Orden {{ order?.id }}</h1>
        <h2 class="text-h4 font-weight-medium">
          Cliente: <span class="font-weight-normal">{{ order?.client }}</span>
        </h2>
        <h2 class="text-h4 font-weight-bold text-black text-right">
          Costo Total: {{ formatPrice(order?.price) }}
        </h2>
      </header>
      <section class="text-blue-darken-3 d-flex flex-column ga-6">
        <h3 class="text-h5 font-weight-medium">Detalle de orden:</h3>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" md="6" v-for="item in order?.items" :key="item.id">
            <v-card
              :color="`blue-darken-${randomNumber()}`"
              class="mx-auto"
              prepend-icon="mdi-food"
              :subtitle="`Costo unitario $: ${formatPrice(item.price)}`"
              :title="item.name"
            >
              <v-card-text class="d-flex ga-2">
                <v-chip color="white" variant="outlined">
                  Cantidad: {{ item.quantity }}
                </v-chip>
                <v-chip color="" variant="tonal">
                  Costo total $ {{ formatPrice(item.total_price) }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </template>
  </main>
</template>
