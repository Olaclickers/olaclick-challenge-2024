import orders from '@/public/orders.json';

export const useOrders = () => {
  const ordersData = ref(
    orders.map(order => ({
      ...order,
      total: order.productos.reduce((sum, p) => sum + p.total, 0),
      detalle: order.productos.map(p => p.descripcion).join(' + '),
    }))
  );

  const getOrderById = (id: number) =>
    ordersData.value.find(order => order.id === id);

  return { ordersData, getOrderById };
};
