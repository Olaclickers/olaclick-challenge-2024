import type { Client } from '@/types/api/clients';
import apiClient from './index';

export default {
  createClient(client: Client) {
    return apiClient.post('/client', client);
  },
  getClients() {
    return apiClient.get('/client');
  },
  deleteClient(dni: string) {
    return apiClient.delete(`/clients/${dni}`);
  },
};