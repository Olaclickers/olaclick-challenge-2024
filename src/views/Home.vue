<script setup lang="ts">
import TableProducts from "@/components/Home/TableProducts.vue"
import { useRouter } from 'vue-router'

const router = useRouter();

</script>

<template>
  <main class="d-flex flex-column ga-3">
    <div class="text-right">
      <v-btn prepend-icon="mdi-plus" color="primary"  @click="router.push(`/new-order`)"> Crear Orden </v-btn>
    </div>
    <h1 class="text-h3 font-weight-bold">Lista de Ordenes</h1>
    <TableProducts />
  </main>
</template>
