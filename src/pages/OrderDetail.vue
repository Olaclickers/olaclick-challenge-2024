<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Details, ordersData } from "../data/ordersData";

const router = useRouter();
const route = useRoute();
import type { Order } from "../data/ordersData";

const order = ref<Order | null>(null);
const loading = ref(false);
const selection = ref<string | undefined>(undefined);

onMounted(() => {
  const orderId = parseInt(
    Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  );
  order.value = ordersData.find((order) => order.id === orderId) ?? null;
  if (order.value) {
    selection.value = order.value.status;
  } else {
    selection.value = undefined;
  }
});

const getTotal = (details: Details[]) => {
  if (!details) return;
  return details
    .reduce((total, detail) => total + detail.quantity * detail.price, 0)
    .toFixed(2);
};

watch(selection, (newStatus) => {
  if (order.value && newStatus !== undefined) {
    order.value.status = newStatus;
  }
});
</script>

<template>
  <v-btn
    color="deep-purple-lighten-2"
    icon="mdi-arrow-left"
    size="small"
    round
    @click="router.go(-1)"
  ></v-btn>
  <v-card
    v-if="order"
    :disabled="loading"
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      cover
    ></v-img>

    <v-card-item>
      <v-card-title>Nº Orden: {{ order.id }}</v-card-title>
      <v-card-subtitle>
        <span class="me-1">Cliente: {{ order.client }}</span>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <div class="text-subtitle-1">Detalle de orden</div>
      <div v-for="(detail, index) in order.details" :key="index" class="my-3">
        <div class="d-flex flex-row justify-between ga-5 w-full my-2">
          <span>{{ detail.quantity }}</span>
          <span class="w-100">
            {{ detail.product }}
          </span>
          <span>S/{{ (detail.quantity * detail.price).toFixed(2) }}</span>
        </div>
      </div>
    </v-card-text>
    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>Actualizar orden</v-card-title>

    <div class="px-4 mb-2">
      <v-chip-group
        v-model="selection"
        selected-class="bg-deep-purple-lighten-2"
      >
        <v-chip value="iniciado">Iniciado</v-chip>
        <v-chip value="enviado">Enviado</v-chip>
        <v-chip value="entregado">Entregado</v-chip>
      </v-chip-group>
    </div>

    <v-card-actions>
      <v-btn color="deep-purple-lighten-2" block border
        >Total a pagar: S/{{ getTotal(order?.details) }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
