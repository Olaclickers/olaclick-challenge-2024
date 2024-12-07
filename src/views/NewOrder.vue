<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { postOrder } from "@/services/Api";
import { useRouter } from 'vue-router'

const router = useRouter()

const initialItem = {
  id: 1,
  name: "",
  price: 0,
  quantity: 1,
  total_price: 0,
};
const initialOrder = {
  detail: "",
  client: "",
  price: 0,
  status_id: 1,
  items: [
    {
      ...initialItem,
    },
  ],
};
const loading = ref(false);
const order = ref({ ...initialOrder });
const selectedNumber = ref(1);
const valid = ref(false);

const numbers = Array.from({ length: 5 }, (_, index) => ({
  value: index + 1,
  title: `Opción ${index + 1}`,
}));

const rules = {
  required: (value: any) => !!value || "Este campo es requerido.",
  numeric: (value: any) => !isNaN(value) || "Debe ser un número válido.",
};

const calculatedPrice = computed(() => {
  return order.value.items.reduce((total, item) => total + item.total_price, 0);
});

watch(selectedNumber, (newVal) => {
  generateItems(newVal);
});

const updateItemTotalPrice = (item: any) => {
  item.total_price = item.price * item.quantity;
  order.value.price = calculatedPrice.value;
};

const generateItems = (quantity: number) => {
  order.value.items = Array.from({ length: quantity }, (_, index) => ({
    ...initialItem,
    id: index + 1,
  }));
};

const submitForm = async () => {
  console.log("Orden creada:", order.value);
  loading.value = true;
  try {
    const response = await postOrder(order.value);
    router.push(`/order/${response.data.id}`)
  } catch (error) {
    console.error("Error crear la orden:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-container>
    <v-form v-model="valid" ref="form" @submit.prevent="submitForm">
      <v-text-field
        v-model="order.detail"
        label="Detalle de la orden"
        required
        :rules="[rules.required]"
      ></v-text-field>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="order.client"
            label="Cliente"
            required
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model.number="order.price"
            label="Precio"
            type="number"
            required
            :value="calculatedPrice"
            readonly
            :rules="[rules.required, rules.numeric]"
          />
        </v-col>
      </v-row>

      <v-select
        v-model="selectedNumber"
        :items="numbers"
        label="Selecciona un número"
        item-text="title"
        item-value="value"
        required
      ></v-select>

      <v-row>
        <v-col
          v-for="(item, index) in order.items"
          :key="index"
          cols="12"
          md="6"
        >
          <v-card>
            <v-card-title>Item {{ index + 1 }}</v-card-title>
            <v-text-field
              v-model="item.name"
              label="Nombre del producto"
              required
            ></v-text-field>
            <v-text-field
              v-model.number="item.price"
              label="Precio del producto"
              type="number"
              required
              :rules="[rules.numeric]"
              @input="updateItemTotalPrice(item)"
            ></v-text-field>
            <v-text-field
              v-model.number="item.quantity"
              label="Cantidad"
              type="number"
              required
              :rules="[rules.numeric]"
              @input="updateItemTotalPrice(item)"
            ></v-text-field>
            <v-text-field
              v-model="item.total_price"
              label="Precio total"
              :value="item.price * item.quantity"
              readonly
              disabled
            ></v-text-field>
          </v-card>
        </v-col>
      </v-row>

      <div class="py-5 d-flex justify-end">
        <v-btn
          type="submit"
          :disabled="!valid"
          color="primary"
          :loading="loading"
          >Crear Orden</v-btn
        >
      </div>
    </v-form>
  </v-container>
</template>
