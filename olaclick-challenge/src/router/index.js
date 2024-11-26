import { createRouter, createWebHistory } from "vue-router"
import Home from '../views/Home.vue'
import OrderDetail from '../views/OrderDetail.vue'
import OrderDelivered from '../views/OrderDelivered.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/:orderId', name: 'OrderDetail', component: OrderDetail },
  { path: '/delivered', name: 'OrderDelivered', component: OrderDelivered },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router