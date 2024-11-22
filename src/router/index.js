import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import OrdersList from '../views/OrdersList.vue';
import OrderDetails from '../views/OrderDetails.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/orders', name: 'OrdersList', component: OrdersList },
  { path: '/order/:id', name: 'OrderDetails', component: OrderDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
