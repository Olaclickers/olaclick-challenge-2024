<template>
  <v-container>
    <h3 class="mb-3">Detalles de la Orden</h3>
    <!-- Campo de Cliente -->
    <v-autocomplete
      v-model="order.client_id"
      :items="clients"
      item-title="name"
      item-value="id"
      label="Cliente"
      variant="outlined"
      dense
      clearable
    ></v-autocomplete>
    <v-alert v-if="showError.client_id" type="error" dense>
      Debe seleccionar un cliente
    </v-alert>

    <!-- Tabla de Ítems -->
    <v-table density="compact" class="mb-3">
      <thead>
        <tr>
          <th class="text-left">Producto</th>
          <th class="text-left">Cantidad</th>
          <th class="text-left">Valor Unitario</th>
          <th class="text-left">Valor Total</th>
          <th class="text-left">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in order.items" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.price }}</td>
          <td>{{ (item.price * item.quantity).toFixed(2) }}</td>
          <td>
            <v-btn
              density="compact"
              icon
              color="error"
              @click="$emit('remove-item', item)"
            >
              <v-icon size="x-small">mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-alert v-if="showError.items" type="error" dense>
      Debe seleccionar al menos un ítem
    </v-alert>

    <!-- Total de la Orden -->
    <v-row class="my-1">
      <v-col class="text-right">
        <p class="text-h4"><strong>Total:</strong> ${{ calculateTotal }}</p>
      </v-col>
    </v-row>

    <!-- Botón Guardar -->
    <v-btn block color="primary" @click="saveOrder"> Guardar Orden </v-btn>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useAxios } from "~/composables/useAxios";
import { useRouter } from "vue-router";

const props = defineProps({
  order: { type: Object, required: true }, // Orden en construcción
  clients: { type: Array, required: true }, // Lista de clientes
});

const axios = useAxios();
const router = useRouter();

// Variables reactivas
const showError = ref({ client_id: false, items: false });

// Computed para el total de la orden
const calculateTotal = computed(() =>
  props.order.items
    .reduce(
      (acc: number, item: { price: number; quantity: number }) =>
        acc + item.quantity * item.price,
      0
    )
    .toFixed(2)
);

async function saveOrder() {
  if (props.order.client_id === null) {
    showError.value.client_id = true;
    return;
  }
  if (props.order.items.length === 0) {
    showError.value.items = true;
    return;
  }

  // Agregar el total al objeto
  props.order.total = parseFloat(calculateTotal.value);
  props.order.order_status_id = 1;

  try {
    await axios.post("/api/orders", props.order);
    router.push("/orders");
  } catch (error) {
    console.error("Error al guardar la orden:", error);
  }
}
</script>
