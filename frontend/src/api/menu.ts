import type { Menu } from '@/types/api/menu';
import apiClient from './index';

export default {
  getMenu() {
    return apiClient.get<Menu[]>('/menu');
  },
};