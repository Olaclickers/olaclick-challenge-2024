import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderDetail from '../views/OrderDetail.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

    {
      path: '/:ordenId',
      name: 'order-detail',
      component: OrderDetail
    }
  ];
  


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
