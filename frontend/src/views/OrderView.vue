<template>
    <OrderForm />
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import OrderForm from '../components/forms/OrderForm.vue';
  
  export default defineComponent({
    name: 'OrderView',
    components: {
      OrderForm,
    },
  });
  </script>