<template>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Lista de Órdenes</h2>
  
      <!-- Filtros -->
      <div class="row mb-3">
        <div class="col-md-4">
          <label for="statusFilter" class="form-label">Filtrar por Estado</label>
          <select id="statusFilter" class="form-select" v-model="statusFilter">
            <option value="">Todos</option>
            <option value="iniciado">Iniciado</option>
            <option value="enviado">Enviado</option>
            <option value="entregado">Entregado</option>
            <option value="cancelado">Cancelado</option>
            <option value="facturado">Facturado</option>
          </select>
        </div>
      </div>
  
      <!-- Tabla de Órdenes -->
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th @click="('id')">ID</th>
              <th @click="('detalle')">Detalle</th>
              <th @click="('cliente')">Cliente</th>
              <th @click="('total')">Total</th>
              <th @click="('estado')">Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in paginatedOrders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.detalle }}</td>
              <td>{{ order.cliente }}</td>
              <td>${{ order.total.toFixed(2) }}</td>
              <td>
                <span :class="`badge bg-${getStatusColor(order.estado)}`">
                  {{ order.estado }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-secondary" @click="viewDetails(order.id)">
                  Ver Detalle
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Paginación -->
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="prevPage">Anterior</button>
          </li>
          <li
            class="page-item"
            v-for="page in totalPages"
            :key="page"
            :class="{ active: page === currentPage }"
          >
            <button class="page-link" @click="goToPage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="nextPage">Siguiente</button>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'OrderList',
    setup() {
      const router = useRouter();
  
      const orders = ref([
        { id: 1, detalle: 'Orden 1', cliente: 'Juan Pérez', total: 120.5, estado: 'iniciado' },
        { id: 2, detalle: 'Orden 2', cliente: 'María Gómez', total: 95.0, estado: 'enviado' },
        { id: 3, detalle: 'Orden 3', cliente: 'Carlos López', total: 200.0, estado: 'entregado' },
        { id: 4, detalle: 'Orden 4', cliente: 'Ana Martínez', total: 80.0, estado: 'cancelado' },
        { id: 5, detalle: 'Orden 5', cliente: 'Pedro Sánchez', total: 150.0, estado: 'facturado' },
      ]);
  
      const statusFilter = ref(''); 
      const currentPage = ref(1); 
      const itemsPerPage = 10; 
  
      const filteredOrders = computed(() => {
        if (!statusFilter.value) return orders.value;
        return orders.value.filter(order => order.estado === statusFilter.value);
      });
  
      const sortBy = (field: string) => {
        filteredOrders.value.sort((a, b) => (a[field] > b[field] ? 1 : -1));
      };
  
      // Paginación
      const paginatedOrders = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredOrders.value.slice(start, end);
      });
  
      const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage));
  
      const prevPage = () => {
        if (currentPage.value > 1) currentPage.value--;
      };
  
      const nextPage = () => {
        if (currentPage.value < totalPages.value) currentPage.value++;
      };
  
      const goToPage = (page: number) => {
        currentPage.value = page;
      };
  
      const getStatusColor = (status: string) => {
        switch (status) {
          case 'iniciado':
            return 'success';
          case 'enviado':
            return 'warning';
          case 'entregado':
            return 'success';
          case 'cancelado':
            return 'danger';
          case 'facturado':
            return 'info';
          default:
            return 'secondary';
        }
      };
  
      const viewDetails = (orderId: number) => {
        router.push({ name: 'OrderDetail', params: { id: orderId } });
      };
  
      return {
        orders,
        statusFilter,
        currentPage,
        itemsPerPage,
        filteredOrders,
        paginatedOrders,
        totalPages,
        prevPage,
        nextPage,
        goToPage,
        sortBy,
        getStatusColor,
        viewDetails,
      };
    },
  });
  </script>
  
  <style scoped>
  .table-responsive {
    overflow-x: auto;
  }
  .badge {
    font-size: 0.9em;
  }
  </style>