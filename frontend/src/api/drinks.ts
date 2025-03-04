import type { Drink } from '@/types/api/drinks';
import apiClient from './index';

export default {
  getDrinks() {
    return apiClient.get<Drink[]>('/drinks');
  },
};