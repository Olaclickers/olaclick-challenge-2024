<template lang="pug">
NuxtLayout(name="dashboard" :title="txtSerie")
  v-snackbar(v-model="showRibbon" color="green") Se actualizo la orden {{txtSerie}}
  .serie
    v-row
      v-col
        v-text-field(label="Descripción" v-model="txtDescrip" readonly)
      v-col
        v-select(:items="listStatus" v-model="txtStatus" label="Estado")
    v-row
      v-col
        v-text-field(label="Total" v-model="txtTotal" readonly)
      v-col
        v-text-field(label="Fecha y hora" v-model="txtDate" readonly)
    
    v-data-table-server(class="elevation-1" :items="listDetail" :headers="headerTable" disabled-pagination :hide-default-footer="true" )
      template(v-slot:item.price="{item}")
        p S/ {{item.price.toFixed(2)}}
    .mt-10
      v-btn.px-6.font-weight-bold(variant="flat" size="large" color="blue-accent-2" @click.prevent="viewList") Regresar
      v-btn.ml-10.px-6.font-weight-bold(variant="flat" size="large" color="blue-darken-3" @click.prevent="updateOrder") Actualizar
</template>

<script setup>
import { ref,onBeforeMount ,onMounted, computed } from 'vue';

import { useOrdersStore } from '~/stores/orders';
import { useRouter, useRoute } from "vue-router";

const orders = useOrdersStore()
const config = useRuntimeConfig();
const router = useRouter()
const route = useRoute()
const headerTable = ref([
  {
    key: 'name',
    title: "Nombre"
  },
  {
    key: 'price',
    title: "Precio"
  },
  {
    key: 'cant',
    title: "Cantidad"
  },
])
const listDetail = ref([])
const listStatus = ref(['Iniciado', 'Enviado', 'Entregado'])
const txtID = ref('')
const txtClient = ref('')
const txtSerie = ref('')
const txtDescrip = ref('')
const txtDate = ref('')
const txtTotal = ref('')
const txtStatus = ref('')
const showRibbon = ref(false)
onBeforeMount(() => {
  orders.getOrder(route.params._serie).then(response => {
    txtID.value = response[0]._id
    txtClient.value = response[0].client
    txtSerie.value = response[0].serie
    txtDescrip.value = response[0].descrip
    txtDate.value = response[0].date_order
    txtTotal.value = response[0].total
    txtStatus.value = response[0].status_order
    getDetail(txtID.value)
  })
  
})


const getDetail = async (id) =>{
  const token = localStorage.getItem('token');
  const res = await fetch(`${config.public.apiURL}/order-details/${id}`, {headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
  const data = await res.json()
  listDetail.value = data.data[0].detail
}

const updateOrder = async()=>{
  const token = localStorage.getItem('token');
  const datos = {
    client: txtClient.value,
    descrip: txtDescrip.value,
    date_order: txtDate.value,
    total: txtTotal.value,
    order_detail: listDetail.value,
    status_order: txtStatus.value
  }

  const res = await fetch(`${config.public.apiURL}/orders/${txtID.value}`, {method: 'PUT',body: JSON.stringify(datos), headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
  const data = await res.json();

  if(data.success){
    showRibbon.value = true;
  }

  if(data.msg == 'Token no válido') {
    alert("El sesión termino")
    localStorage.removeItem('token');
    router.push({path:"/login"})
  }
}

const viewList = () => {
  router.push({path:"/pedidos"})
}
</script>
