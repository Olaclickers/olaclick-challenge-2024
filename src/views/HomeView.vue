<script>
import { ref } from 'vue';
import ordersData from '@/assets/orders.json';
import OrderListAndmin from '@/components/OrderListAndmin.vue';


export default {
  name: 'HomeView',
  components: {
    OrderListAndmin
  },
  setup() {
    const orders = ref(ordersData);

    const updateOrderStatus = (id, newStatus) => {
      const order = orders.value.find(order => order.Id === id);
      if (order) {
        order.Estado = newStatus;
      }
    };

    return {
      orders,
      updateOrderStatus
    };
  }
};
</script>

<template>
  <div>
    <OrderListAndmin :orders="orders" />
  </div>
</template>
