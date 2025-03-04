<template>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Detalle de la Orden #{{ order.id }}</h2>
  
      <!-- Tarjeta de Detalles -->
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Cliente: {{ order.cliente }}</h5>
          <p class="card-text">Estado: <span :class="`badge bg-${getStatusColor(order.estado)}`">{{ order.estado }}</span></p>
          <p class="card-text">Total: ${{ totalOrder.toFixed(2) }}</p> <!-- Total de la orden -->
  
          <!-- Tabla de Ítems -->
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Ítem</th>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Costo Unitario</th>
                  <th>Costo Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in order.items" :key="index">
                  <td>{{ String.fromCharCode(65 + index) }}</td> <!-- Ítem alfabético -->
                  <td>{{ item.descripcion }}</td>
                  <td>{{ item.cantidad }}</td>
                  <td>${{ item.costoUnitario.toFixed(2) }}</td>
                  <td>${{ item.costoTotal.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  
  export default defineComponent({
    name: 'OrderDetail',
    props: {
      orderId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      // Datos mock de una orden
      const order = ref({
        id: props.orderId,
        cliente: 'Juan Pérez',
        total: 120.5, // Este campo ya no es necesario, se calculará dinámicamente
        estado: 'iniciado',
        items: [
          { descripcion: 'Menú 1', cantidad: 2, costoUnitario: 10.5, costoTotal: 21.0 },
          { descripcion: 'Contorno 1', cantidad: 1, costoUnitario: 3.0, costoTotal: 3.0 },
          { descripcion: 'Bebida 1', cantidad: 3, costoUnitario: 2.5, costoTotal: 7.5 },
        ],
      });
  
      // Calcular el total de la orden sumando los costos totales de los ítems
      const totalOrder = computed(() => {
        return order.value.items.reduce((sum, item) => sum + item.costoTotal, 0);
      });
  
      // Color del badge según el estado
      const getStatusColor = (status: string) => {
        switch (status) {
          case 'iniciado':
            return 'primary';
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
  
      return {
        order,
        totalOrder, // Total calculado
        getStatusColor,
      };
    },
  });
  </script>
  
  <style scoped>
  .card {
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .table-responsive {
    overflow-x: auto;
  }
  .badge {
    font-size: 0.9em;
  }
  </style>