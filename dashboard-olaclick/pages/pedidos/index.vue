<template lang="pug">
NuxtLayout(name="dashboard" title="Pedidos")
  .pedidos
    v-row
      v-col(cols="9")
        v-text-field(label="Buscar pedido" v-model="txtSearch" @keypress.enter="getSearch")
      v-col(cols="3" align="end")
        v-btn.px-10.font-weight-bold.mt-1(variant="flat" size="large" color="blue-accent-2" @click.prevent="viewNew") Nuevo
    div(class="mt-6")
      v-data-table-server(class="elevation-1" :items="getOrders.data" :headers="headerTable" disabled-pagination :hide-default-footer="true" )
        template(v-slot:item.status_order="{item}")
          p.d-inline.px-4.py-2.rounded-6(:class="{'g-bg-blue': item.status_order == 'Iniciado', 'g-bg-yellow': item.status_order == 'Enviado', 'g-bg-green': item.status_order == 'Entregado'}") {{item.status_order}}
        template(v-slot:item.total="{item}")
          p S/ {{item.total.toFixed(2)}}
   
        template(v-slot:item.view="{item}")
          v-icon(icon="mdi-open-in-new" @click="viewOrder(item)")
     
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useOrdersStore } from '@/stores/orders.js';
import { useRouter } from "vue-router";
const router = useRouter()
const listOrders  = useOrdersStore()
const showModalNewOrder = ref(false)
const headerTable = ([
  {
    key: 'client.name',
    title: "Cliente"
  },
  {
    key: 'descrip',
    title: "Descripción"
  },
  {
    key: 'total',
    title: "Total"
  },
  {
    key: 'date_order',
    title: "Fecha"
  },
  {
    key: 'status_order',
    title: "Estado"
  },
  {
    key: 'view',
    title: "Ver detalle"
  },
])
const txtSearch = ref('')

const getOrders = computed(() => {
  return listOrders.list
})

onBeforeMount(async () =>{
  await listOrders.getOrdersAll()
})

useSeoMeta({
  title: "Listado de pedidos"
})



const getSearch = () => {
  if (txtSearch.value.length < 3){
    router.push({ path: "/pedidos"});
    listOrders.getOrdersAll()
  } else{
    const search = txtSearch.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    navigateTo({ path: "/pedidos", query: { s: search } });
    listOrders.getOrdersSearch(txtSearch.value)
  }
}


const viewOrder = (item) => {
  router.push({path: `/pedidos/${item.serie}`})
}

const viewNew = () => {
  router.push({path:"/pedidos/nuevo"})
}
</script>
