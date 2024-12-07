import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE;

export const getOrders = (page: number, itemsPerPage: number) => {
  return axios.get(`${API_URL}/Products?page=${page}&limit=${itemsPerPage}`);
};

export const getStatus = () => {
  return axios.get(`${API_URL}/status`);
};
