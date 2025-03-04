<template>
  <div class="admin-dashboard">
    <h1 class="dashboard-title">Dashboard Administrador</h1>

    <!-- Estadísticas -->
    <div class="stats-grid">
      <b-card v-for="stat in stats" :key="stat.title" class="stat-card">
        <h3 class="stat-title">{{ stat.title }}</h3>
        <b-card-text class="stat-value">{{ stat.value }}</b-card-text>
      </b-card>
    </div>

    <!-- Gráficos -->
    <div class="charts-grid">
      <b-card class="chart-card">
        <h3 class="chart-title">Ventas del Mes</h3>
        <line-chart :chart-data="salesChartData" />
      </b-card>
      <b-card class="chart-card">
        <h3 class="chart-title">Estadísticas de Menú, Contornos y Bebidas</h3>
        <bar-chart :chart-data="menuStatsChartData" />
      </b-card>
    </div>

    <!-- Acciones -->
    <div class="actions-grid">
      <b-button variant="primary" class="action-button" @click="navigateTo('/users')">
        <i class="fas fa-users"></i> Usuarios
      </b-button>
      <b-button variant="success" class="action-button" @click="navigateTo('/clients')">
        <i class="fas fa-user-plus"></i>Clientes
      </b-button>
      <b-button variant="info" class="action-button" @click="navigateTo('/menus')">
        <i class="fas fa-utensils"></i> Ver Menús
      </b-button>
      <b-button variant="warning" class="action-button" @click="navigateTo('/contornos')">
        <i class="fas fa-carrot"></i> Ver Contornos
      </b-button>
      <b-button variant="danger" class="action-button" @click="navigateTo('/bebidas')">
        <i class="fas fa-glass-cheers"></i> Ver Bebidas
      </b-button>
      <b-button variant="secondary" class="action-button" @click="navigateTo('/orders')">
        <i class="fas fa-clipboard-list"></i> Ver Órdenes
      </b-button>
      <b-button variant="dark" class="action-button" @click="navigateTo('/sales')">
        <i class="fas fa-chart-line"></i> Ver Ventas
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import LineChart from '../components/charts/LineChart.vue';
import BarChart from '../components/charts/BarChart.vue';
import type { ProductsChartData, SalesChartData } from '../types/chart';
import statsApi from '../api/stats'; 

export default defineComponent({
  name: 'AdminDashboard',
  components: {
    LineChart,
    BarChart,
  },
  setup() {
    const router = useRouter();

    const stats = ref([
      { title: 'Total de Usuarios', value: 0 },
      { title: 'Total de Ítems de Menú', value: 0 },
      { title: 'Total de Contornos', value: 0 },
      { title: 'Total de Bebidas', value: 0 },
      { title: 'Menú Más Vendido', value: 'Cargando...' },
      { title: 'Contorno Más Vendido', value: 'Cargando...' },
    ]);

    const salesChartData = ref<SalesChartData>({
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [
        {
          label: 'Ventas',
          backgroundColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40],
        },
      ],
    });

    const menuStatsChartData = ref<ProductsChartData>({
      labels: ['Menú', 'Contornos', 'Bebidas'],
      datasets: [
        {
          label: 'Ventas',
          backgroundColor: '#42b983',
          data: [0, 0, 0], 
        },
      ],
    });

    const fetchStats = async () => {
      try {
        const [
          totalUsers,
          totalMenu,
          totalSideDishes,
          totalDrinks,
          mostSoldMenu,
          mostSoldSideDish,
        ] = await Promise.all([
          statsApi.getTotalUsers(),
          statsApi.getTotalMenu(),
          statsApi.getTotalSideDishes(),
          statsApi.getTotalDrinks(),
          statsApi.getMostSoldMenu(),
          statsApi.getMostSoldSideDish(),
        ]);

        // Actualizar las estadísticas
        stats.value = [
          { title: 'Total Usuarios', value: totalUsers.data.total_users },
          { title: 'Total Items Menú', value: totalMenu.data.total_menu },
          { title: 'Total Contornos', value: totalSideDishes.data.total_side_dishes },
          { title: 'Total Bebidas', value: totalDrinks.data.total_drinks },
          { title: 'Menú Más Vendido', value: mostSoldMenu.data.name },
          { title: 'Contorno Más Vendido', value: mostSoldSideDish.data.name },
        ];

        // Actualizar los datos para los gráficos
        menuStatsChartData.value.datasets[0].data = [
          totalMenu.data.total_menu,
          totalSideDishes.data.total_side_dishes,
          totalDrinks.data.total_drinks,
        ];
      } catch (error) {
        console.error('Error al obtener estadísticas:', error);
      }
    };

    const navigateTo = (route: string) => {
      router.push(route);
    };

    onMounted(() => {
      fetchStats();
    });

    return {
      stats,
      salesChartData,
      menuStatsChartData,
      navigateTo,
    };
  },
});
</script>

<style scoped>
.admin-dashboard {
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  text-align: center;
  padding: 20px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #42b983;
}

.stat-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.chart-card {
  padding: 20px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chart-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #2c3e50;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
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
</style>
