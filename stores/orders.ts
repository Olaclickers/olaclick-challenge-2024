import { defineStore } from 'pinia';
import axios from 'axios';
import type { Order } from '@/models/Order';

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [] as Order[],
  }),
  actions: {
    async fetchOrders() {
      if (this.orders.length) return;
      try {
        const { data } = await axios.get('/orders.json');
        this.orders = data.map((order: Order) => ({
          ...order,
          total: order.productos.reduce((sum, p) => sum + p.total, 0),
          detalle: order.productos.map((p) => p.descripcion).join(' + '),
        }));
      } catch (error) {
        console.error('Error al cargar las órdenes:', error);
        this.orders = [];
      }
    },
  },
  getters: {
    activeOrders: (state): Order[] =>
      state.orders.filter((order) => order.estado.toLowerCase() !== 'entregado'),
    deliveredOrders: (state): Order[] =>
      state.orders.filter((order) => order.estado.toLowerCase() === 'entregado'),
    getOrderById: (state) => (id: number): Order | undefined =>
      state.orders.find((order) => order.id === id),
  },
});
