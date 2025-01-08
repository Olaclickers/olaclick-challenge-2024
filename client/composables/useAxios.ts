import axios from 'axios';
import { useRuntimeConfig } from '#imports';

export const useAxios = () => {
  const config = useRuntimeConfig();

  const instance = axios.create({
    baseURL: config.public.apiUrl, // Usa la URL de tu API desde las variables de entorno
    timeout: 10000, // Tiempo límite en milisegundos
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor de solicitud (opcional)
  instance.interceptors.request.use(
    (request) => {
      console.log('Solicitud saliente:', request);
      // Puedes agregar encabezados como tokens aquí
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor de respuesta (opcional)
  instance.interceptors.response.use(
    (response) => {
      console.log('Respuesta recibida:', response);
      return response.data;
    },
    (error) => {
      console.error('Error en la respuesta:', error.response || error.message);
      return Promise.reject(error);
    }
  );

  return instance;
};
