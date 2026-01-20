<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Lista de Menús</h2>

    <!-- Buscador -->
    <div class="row mb-3">
      <div class="col-md-6">
        <label for="search" class="form-label">Buscar por Nombre</label>
        <input
          id="search"
          type="text"
          class="form-control"
          placeholder="Nombre del menú"
          v-model="searchQuery"
        />
      </div>
    </div>

    <!-- Tabla de Menús -->
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="menu in filteredMenus" :key="menu.id">
            <td>{{ menu.menu }}</td>
            <td>S/ {{ menu.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import api from '../api/menu';
import type { Menu, ApiResponse } from '../types/api/menu'; 

export default defineComponent({
  name: 'MenuList',
  setup() {
    const menus = ref<Menu[]>([]);
    const searchQuery = ref('');

    const fetchMenus = async () => {
      try {
        const response = await api.getMenu();
        const apiResponse = response.data.data;
        menus.value = apiResponse; 
      } catch (error) {
        console.error('Error obteniendo menús:', error);
      }
    };

    onMounted(fetchMenus);

    const filteredMenus = computed(() => {
      return menus.value.filter((menu) => {
        const menuName = menu.menu.toLowerCase();
        const query = searchQuery.value.toLowerCase();
        return menuName.includes(query);
      });
    });

    return {
      menus,
      searchQuery,
      filteredMenus,
    };
  },
});
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}
</style>