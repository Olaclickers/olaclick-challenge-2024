<template>
  <v-container>
    <h3 class="mb-3">Lista de Ítems</h3>
    <!-- Barra de búsqueda -->
    <v-text-field
      v-model="search"
      label="Buscar ítems"
      variant="outlined"
      dense
      class="mb-4"
      clearable
    ></v-text-field>

    <v-row>
      <v-col
        v-for="item in filteredItems"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card elevation="2" @click="$emit('add-item', item)">
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-subtitle class="mb-2">
            Precio: {{ item.price }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  items: { type: Array, required: true }, // Ítems disponibles
});

// Variables reactivas
const search = ref(""); // Barra de búsqueda

// Computed para buscar y filtrar ítems
const filteredItems = computed(() => {
  if (search.value == "" || search.value == null) {
    return props.items;
  }
  return props.items.filter((item) =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>
