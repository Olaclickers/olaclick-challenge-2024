import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/new-order/',
    name: 'New Order',
    component: () => import('@/views/NewOrder.vue'),
  },
  {
    path: '/order/:id',
    name: 'Order',
    component: () => import('@/views/Order.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
export { routes };
