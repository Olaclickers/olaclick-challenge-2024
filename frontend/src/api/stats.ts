import type { Stats } from '@/types/api/stats';
import apiClient from './index';

export default {
  getTotalUsers() {
    return apiClient.get<{ total_users: number }>('/stats/total-users');
  },
  getTotalMenu() {
    return apiClient.get<{ total_menu: number }>('/stats/total-menu');
  },
  getTotalSideDishes() {
    return apiClient.get<{ total_side_dishes: number }>('/stats/total-side-dishes');
  },
  getTotalDrinks() {
    return apiClient.get<{ total_drinks: number }>('/stats/total-drinks');
  },
  getMostSoldMenu() {
    return apiClient.get<Stats['most_sold_menu']>('/stats/most-sold-menu');
  },
  getMostSoldSideDish() {
    return apiClient.get<Stats['most_sold_side_dish']>('/stats/most-sold-side-dish');
  },
};