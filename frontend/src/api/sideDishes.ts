import type { SideDish } from '@/types/api/sideDishes';
import apiClient from './index';

export default {
  getSideDishes() {
    return apiClient.get<SideDish[]>('/side-dishes');
  },
};