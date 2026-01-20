<template>
    <OrderDetail :orderId="orderId" />
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import OrderDetail from '../components/OrderDetail.vue';
  
  export default defineComponent({
    name: 'OrderDetailView',
    components: {
      OrderDetail,
    },
    setup() {
      const route = useRoute();
      const orderId = computed(() => Number(route.params.id));
  
      return {
        orderId,
      };
    },
  });
  </script>