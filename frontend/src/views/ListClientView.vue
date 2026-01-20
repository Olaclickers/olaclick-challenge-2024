<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Lista de Clientes</h2>

    <!-- Buscador -->
    <div class="row mb-3">
      <div class="col-md-6">
        <label for="search" class="form-label">Buscar por Nombre o DNI</label>
        <input
          id="search"
          type="text"
          class="form-control"
          placeholder="Nombre o DNI"
          v-model="searchQuery"
        />
      </div>
    </div>

    <!-- Tabla de Clientes -->
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in paginatedClients" :key="client.dni">
            <td>{{ client.dni }}</td>
            <td>{{ client.first_name }} {{ client.last_name }}</td>
            <td>{{ client.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginación -->
    <div class="row mt-3">
      <div class="col-md-12">
        <nav aria-label="Page navigation">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: pagination.page === 1 }">
              <button class="page-link" @click="prevPage">Anterior</button>
            </li>
            <li class="page-item" :class="{ disabled: pagination.page >= totalPages }">
              <button class="page-link" @click="nextPage">Siguiente</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import api from '../api/clients';
import type { Client } from '../types/api/clients';

export default defineComponent({
  name: 'ListClientView',
  setup() {
    const clients = ref<Client[]>([]);
    const searchQuery = ref('');
    const pagination = ref({
      page: 1,
      limit: 10, 
      total: 0,
    });

    const fetchClients = async () => {
      try {
        const response = await api.getClients();
        clients.value = response.data.data;
        pagination.value.total = response.data.meta.total;
      } catch (error) {
        console.error('Error obteniendo clientes:', error);
      }
    };

    onMounted(fetchClients);

    const filteredClients = computed(() => {
      return clients.value.filter((client) => {
        const fullName = `${client.first_name} ${client.last_name}`.toLowerCase();
        const dni = client.dni.toLowerCase();
        const query = searchQuery.value.toLowerCase();
        return fullName.includes(query) || dni.includes(query);
      });
    });

    const paginatedClients = computed(() => {
      const start = (pagination.value.page - 1) * pagination.value.limit;
      const end = start + pagination.value.limit;
      return filteredClients.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredClients.value.length / pagination.value.limit);
    });

    const prevPage = () => {
      if (pagination.value.page > 1) {
        pagination.value.page--;
      }
    };

    const nextPage = () => {
      if (pagination.value.page < totalPages.value) {
        pagination.value.page++;
      }
    };

    watch(searchQuery, () => {
      pagination.value.page = 1; 
    });

    return {
      clients,
      searchQuery,
      pagination,
      filteredClients,
      paginatedClients,
      totalPages,
      prevPage,
      nextPage,
    };
  },
});
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}
</style>