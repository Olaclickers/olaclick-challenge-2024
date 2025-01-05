import { useOrderStore } from "@/stores/orders";

export default defineNuxtPlugin(async () => {
  const orderStore = useOrderStore();
  if (!orderStore.orders.length) {
    await orderStore.fetchOrders();
  }
});
