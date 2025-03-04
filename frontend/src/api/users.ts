import type { User } from '@/types/api/users';
import apiClient from './index';

export default {
  createUser(user: User) {
    return apiClient.post('/users', user);
  },
  getUsers() {
    return apiClient.get('/users');
  },
  getUserByDni(dni: string) {
    return apiClient.get(`/users/${dni}`);
  },
  updateUser(dni: string, user: Partial<User>) {
    return apiClient.put(`/users/${dni}`, user);
  },
  deleteUser(dni: string) {
    return apiClient.delete(`/users/${dni}`);
  },
};