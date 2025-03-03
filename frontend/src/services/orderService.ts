import axios from 'axios';
import type { Order } from '../order';

const API_URL = 'http://localhost:3000/orders'; // Adjust to match your backend

export const OrderService = {
  async getOrders(): Promise<Order[]> {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async getOrderById(id: number): Promise<Order> {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  async createOrder(order: Order): Promise<Order> {
    const response = await axios.post(API_URL, order);
    return response.data;
  },

  async updateOrder(order: Order): Promise<Order> {
    const response = await axios.patch(`${API_URL}/${order.id}`, order);
    return response.data;
  },

  async deleteOrder(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  }
};