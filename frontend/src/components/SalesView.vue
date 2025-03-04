<template>
    <div>
      <h2>Ventas</h2>
      <b-table striped hover :items="ventas" :fields="fields"></b-table>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'SalesView',
    setup() {
      const fields = ref(['id', 'fecha', 'total']);
      const ventas = ref([
        { id: 1, fecha: '2023-10-01', total: 100.0 },
        { id: 2, fecha: '2023-10-02', total: 150.0 },
        { id: 3, fecha: '2023-10-03', total: 200.0 },
      ]);
  
      return {
        fields,
        ventas,
      };
    },
  });
  </script>