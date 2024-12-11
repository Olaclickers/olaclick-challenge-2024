<template lang="pug">
NuxtLayout(name="dashboard" title="Nuevo Pedido")
  .order-new
    v-snackbar(v-model="showRibbon" color="green") Se registro el pedido
    v-row
      v-col( align="end")
        p.mt-3 {{txtDate}}
    v-row
      v-col(align="center" cols="12" lg="4")
        v-combobox(v-model="txtClient" :items="listClients" label="Clientes" item-title="full_name" item-value="_id")
        v-row
          v-col
            v-data-table-server(class="elevation-1" :items="listDetail" :itemsLength="listDetail.length" :headers="headerTable" disabled-pagination :hide-default-footer="true" hide-no-data)
              template(v-slot:item.price="{item}")
                p S/ {{item.price.toFixed(2)}}
              template(v-slot:item.remove="{index}")
                v-icon.icon-hover(icon="mdi-delete" color="red-lighten-2" @click="removeProduct(index)")
        
        p.mt-4.price-total Total: <span class="font-weight-bold">S/ {{getTotal.toFixed(2)}}</span>
        .mt-10
          v-btn.px-6.font-weight-bold(variant="flat" size="large" color="blue-accent-2" @click.prevent="viewList") Regresar
          v-btn.ml-10.px-6.font-weight-bold(variant="flat" size="large" color="blue-darken-2" @click.prevent="sendRegister") Guardar
      
      v-col(cols="12" lg="8")
        v-text-field(label="Buscar producto" v-model="txtSearchProduct" @keypress.enter="getSearch")
        .list-products
          .list-products-content.pb-10
            article(v-for="(itemProduct,indexProduct) in listProducts.data")
              v-card.pb-7
                figure
                  img(:src="itemProduct.img[0].preview", :alt="'imagen de '+itemProduct.name")
                .px-4
                  h2.mb-2 {{itemProduct.name}}
                  v-text-field(type="text" v-model="itemProduct.cant" label="Cantidad" @keypress.enter="addProduct(itemProduct)")
                  h3.text-center S/ {{itemProduct.price_sale.toFixed(2)}}
                  .text-center
                    v-btn.font-weight-bold.mt-4(color="blue-accent-3" @click.prevent="addProduct(itemProduct)") Agregar
          
      
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useProductsStore } from '@/stores/products.js';
import { useClientsStore } from '@/stores/clients.js';

import { useRouter } from "vue-router";
const products = useProductsStore()
const clients = useClientsStore()
const config = useRuntimeConfig();
const router = useRouter()
const txtClient = ref('')
const txtDate = ref('')
const txtSearchProduct = ref('')
const listDetail  = ref([])
const showRibbon = ref(false)
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
  {
    key: 'remove',
    title: ""
  },
])

const getDescrip = computed(() => {
  let list = listDetail.value.map((item) => item.name)
  return list.toString()
})

const getTotal = computed(() => {
  return listDetail.value.reduce((total, product) => total + product.subtotal, 0)
})

const listProducts = computed(() => {
  return products.list
})

const listClients = computed(() => {
  return clients.list
})


const getSearch = () => {
  
  if (txtSearchProduct.value.length < 3){
    router.push({ path: "/pedidos/nuevo"});
    products.getProductsAll()
  } else{
    const search = txtSearchProduct.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    products.getProductsSearch(txtSearchProduct.value)
  }

}

const sendRegister = async() =>{
  const token = localStorage.getItem('token');
  const datos = {
    client: txtClient.value._id,
    descrip: getDescrip.value,
    date_order: txtDate.value,
    total: getTotal.value,
    order_detail: listDetail.value
  }

  const res = await fetch(`${config.public.apiURL}/orders`, {method: 'POST',body: JSON.stringify(datos), headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
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
useSeoMeta({
  title: "Nuevo Pedido"
})

onBeforeMount(() => {
  const date = Date.now()
  const day = new Date(date)
  txtDate.value = day.toLocaleDateString()+' '+day.toLocaleTimeString()
  clients.getClientsAll()
  products.getProductsAll()
})


const addProduct = (item) => {
  listDetail.value.push({id: item._id, name: item.name, cant: item.cant, price: item.price_sale, subtotal: item.cant*item.price_sale})
}

const removeProduct = (index) => {
  listDetail.value.splice(index, 1) 
}
const viewList = () => {
  router.push({path:"/pedidos"})
}
</script>
<style lang="stylus">
@import '../assets/styles/pages/order.styl';
</style>
