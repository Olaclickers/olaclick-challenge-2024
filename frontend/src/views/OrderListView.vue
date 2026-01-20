<template>
    <OrderList />
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import OrderList from '../components/OrderList.vue';
  import { useRouter } from 'vue-router';

const router = useRouter();

const viewDetails = (orderId: number) => {
  router.push({ name: 'OrderDetail', params: { id: orderId } });
};
  
  export default defineComponent({
    name: 'OrderListView',
    components: {
      OrderList,
    },
  });
  </script>