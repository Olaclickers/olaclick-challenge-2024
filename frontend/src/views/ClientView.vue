<template>
    <ClientForm />
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import ClientForm from '../components/forms/ClientForm.vue';
  
  export default defineComponent({
    name: 'ClientView',
    components: {
      ClientForm,
    },
  });
  </script>