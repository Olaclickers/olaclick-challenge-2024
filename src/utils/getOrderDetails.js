import orders from '../db/orders.json';
import orderItems from '../db/order-items.json';

export const getOrderDetails = (orderId) => {
    const order = orders.orders?.find((order) => order.id === orderId);
    const items = orderItems.orderItems?.find((orderItem) => orderItem.orderId === orderId)?.items || [];
    return { ...order, items };
};
