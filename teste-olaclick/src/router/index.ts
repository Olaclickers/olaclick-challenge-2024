import { createRouter, createWebHistory } from 'vue-router';
import OrderList from '../components/OrderList.vue';
import OrderDetails from '../components/OrderDetails.vue';

const routes = [
  { path: '/', component: OrderList },
  { path: '/ordem/:orderId', component: OrderDetails, props: true } // Melhor rota para detalhes
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;