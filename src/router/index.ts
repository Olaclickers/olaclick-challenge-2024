import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../pages/Home.vue";
import Orders from "../pages/Orders.vue";
import OrderDetail from "../pages/OrderDetail.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "Home", component: Home },
  { path: "/orders", name: "Orders", component: Orders },
  { path: "/orders/:id", name: "OrderDetail", component: OrderDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
