import { defineStore } from 'pinia';
import { ref } from 'vue';
import authService from '../api/auth';
import { useRouter } from 'vue-router';
import type { DecodedToken } from '@/interfaces/decodeToken';



export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const isAuthenticated = ref(false);
  const user = ref<DecodedToken | null>(null);

  const validateToken = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const tokenDto = { token };
        const isValid = await authService.validateToken(tokenDto);
        isAuthenticated.value = isValid;

        if (isValid) {
          const decodedToken: DecodedToken = JSON.parse(atob(token.split('.')[1])); 
          user.value = decodedToken;
        } else {
          localStorage.removeItem('authToken');
          router.push('/');
        }
      } catch (error) {
        console.error('Error al validar el token:', error);
        localStorage.removeItem('authToken');
        isAuthenticated.value = false;
        user.value = null;
        router.push('/');
      }
    } else {
      isAuthenticated.value = false;
      user.value = null;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    isAuthenticated.value = false;
    user.value = null;
    router.push('/');
  };

  return {
    isAuthenticated,
    user,
    validateToken,
    logout,
  };
});
