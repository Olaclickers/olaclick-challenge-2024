<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Lista de Contornos</h2>

    <!-- Buscador -->
    <div class="row mb-3">
      <div class="col-md-6">
        <label for="search" class="form-label">Buscar por Nombre</label>
        <input
          id="search"
          type="text"
          class="form-control"
          placeholder="Nombre del Contorno"
          v-model="searchQuery"
        />
      </div>
    </div>

    <!-- Tabla de Contornos -->
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="side in filteredSides" :key="side.id">
            <td>{{ side.side_dishes }}</td>
            <td>S/ {{ side.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import api from '../api/sideDishes';
import type { SideDish, SideDishApiResponse } from '../types/api/sideDishes';

export default defineComponent({
  name: 'ContornoList',
  setup() {
    const sides = ref<SideDish[]>([]);
    const searchQuery = ref('');

    // Obtener contornos
    const fetchSides = async () => {
      try {
        const response = await api.getSideDishes();
        const apiResponse = response.data as SideDishApiResponse; // Asegurar el tipo de respuesta
        sides.value = apiResponse.data; // Asignar los datos
      } catch (error) {
        console.error('Error obteniendo contornos:', error);
      }
    };

    onMounted(fetchSides);

    // Filtrar contornos por nombre
    const filteredSides = computed(() => {
      return sides.value.filter((side) => {
        const sideName = side.side_dishes.toLowerCase();
        const query = searchQuery.value.toLowerCase();
        return sideName.includes(query);
      });
    });

    return {
      sides,
      searchQuery,
      filteredSides,
    };
  },
});
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}
</style>