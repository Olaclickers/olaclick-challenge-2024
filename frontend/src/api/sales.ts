import type { Sale } from '@/types/api/sales';
import apiClient from './index';

export default {
  createSale(sale: { order_id: string }) {
    return apiClient.post<Sale>('/sales', sale);
  },
  getSales(start_date?: string, end_date?: string) {
    return apiClient.get<Sale[]>('/sales', { params: { start_date, end_date } });
  },
  getTodaySales() {
    return apiClient.get<Sale[]>('/sales/today');
  },
};