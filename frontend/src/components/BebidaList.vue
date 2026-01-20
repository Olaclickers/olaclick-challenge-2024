<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Lista de Bebidas</h2>

    <!-- Buscador -->
    <div class="row mb-3">
      <div class="col-md-6">
        <label for="search" class="form-label">Buscar por Nombre</label>
        <input
          id="search"
          type="text"
          class="form-control"
          placeholder="Nombre de la Bebida"
          v-model="searchQuery"
        />
      </div>
    </div>

    <!-- Tabla de Bebidas -->
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="drink in filteredDrinks" :key="drink.id">
            <td>{{ drink.drinks }}</td>
            <td>S/ {{ drink.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import api from '../api/drinks';
import type { Drink, DrinkApiResponse } from '../types/api/drinks';

export default defineComponent({
  name: 'BebidaList',
  setup() {
    const drinks = ref<Drink[]>([]);
    const searchQuery = ref('');

    // Obtener bebidas
    const fetchDrinks = async () => {
      try {
        const response = await api.getDrinks();
        const apiResponse = response.data as DrinkApiResponse; // Asegurar el tipo de respuesta
        drinks.value = apiResponse.data; // Asignar los datos
      } catch (error) {
        console.error('Error obteniendo bebidas:', error);
      }
    };

    onMounted(fetchDrinks);

    // Filtrar bebidas por nombre
    const filteredDrinks = computed(() => {
      return drinks.value.filter((drink) => {
        const drinkName = drink.drinks.toLowerCase();
        const query = searchQuery.value.toLowerCase();
        return drinkName.includes(query);
      });
    });

    return {
      drinks,
      searchQuery,
      filteredDrinks,
    };
  },
});
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}
</style>