import type { AuthResponse, CreateAuthDto, TokenDto } from '@/types/api/auth';
import apiClient from './index';

export default {
  async login(credentials: CreateAuthDto): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error('Error al iniciar sesión: ' + error);
    }
  },

  async validateToken(tokenDto: TokenDto): Promise<boolean> {
    try {
      const response = await apiClient.post('/auth/validate/token', tokenDto);
      return response.status === 200; 
    } catch (error) {
      throw new Error('Error al validar el token: ' + error);
    }
  },
};