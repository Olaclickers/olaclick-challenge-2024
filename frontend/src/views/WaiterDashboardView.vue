<template>
    <div class="waiter-dashboard">
      <h1 class="dashboard-title">Dashboard Mesero</h1>
  
      <!-- Acciones Rápidas -->
      <div class="actions-grid">
        <b-button variant="primary" class="action-button" @click="navigateTo('/menus')">
          <i class="fas fa-utensils"></i> Ver Menús
        </b-button>
        <b-button variant="success" class="action-button" @click="navigateTo('/contornos')">
          <i class="fas fa-carrot"></i> Ver Contornos
        </b-button>
        <b-button variant="info" class="action-button" @click="navigateTo('/bebidas')">
          <i class="fas fa-glass-cheers"></i> Ver Bebidas
        </b-button>
        <b-button variant="warning" class="action-button" @click="navigateTo('/order')">
          <i class="fas fa-plus-circle"></i> Crear Orden
        </b-button>
        <b-button variant="secondary" class="action-button" @click="navigateTo('/orders')">
          <i class="fas fa-clipboard-list"></i> Ver Órdenes
        </b-button>
      </div>
  
      <!-- Órdenes Recientes -->
      <div class="recent-orders">
        <h3 class="section-title">Órdenes Recientes</h3>
        <b-table striped hover :items="recentOrders" :fields="orderFields"></b-table>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import orderApi from '../api/orders'; 
  
  export default defineComponent({
    name: 'WaiterDashboard',
    setup() {
      const router = useRouter();
  
      const recentOrders = ref([]);
      const orderFields = ref([
        { key: 'id', label: 'ID' },
        { key: 'clientName', label: 'Cliente' },
        { key: 'status', label: 'Estado' },
        { key: 'total', label: 'Total' },
        { key: 'createdAt', label: 'Fecha' },
      ]);
  
      const fetchRecentOrders = async () => {
        try {
          const response = await orderApi.getRecentOrders();
          recentOrders.value = response.data;
        } catch (error) {
          console.error('Error al obtener órdenes recientes:', error);
        }
      };
  
      const navigateTo = (route: string) => {
        router.push(route);
      };
  
      onMounted(() => {
        fetchRecentOrders();
      });
  
      return {
        recentOrders,
        orderFields,
        navigateTo,
      };
    },
  });
  </script>
  
  <style scoped>
  .waiter-dashboard {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .dashboard-title {
    text-align: center;
    margin-bottom: 30px;
    font-size: 2.5rem;
    color: #2c3e50;
  }
  
  .actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 30px;
  }
  
  .action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .action-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  .action-button i {
    margin-right: 10px;
  }
  
  .recent-orders {
    margin-top: 30px;
  }
  
  .section-title {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 20px;
  }
  </style>