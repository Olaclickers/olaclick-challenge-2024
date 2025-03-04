import type { Order } from '@/types/api/orders';
import apiClient from './index';

export default {
  createOrder(order: Order) {
    return apiClient.post('/orders', order);
  },
  getOrders(status?: string) {
    return apiClient.get('/orders', { params: { status } });
  },
  getPendingOrders() {
    return apiClient.get('/orders/pending');
  },
  getOrderById(id: string) {
    return apiClient.get(`/orders/${id}`);
  },
  updateOrder(id: string, order: Partial<Order>) {
    return apiClient.put(`/orders/${id}`, order);
  },
  deleteOrder(id: string) {
    return apiClient.delete(`/orders/${id}`);
  },
};