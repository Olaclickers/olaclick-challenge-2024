<template lang="pug">
NuxtLayout(name="dashboard" title="Productos")
  v-dialog(v-model="showCodeQR")
    .read-codeqr.mx-auto
      qrcode-stream(@detect="onDetect" :paused="qrPause")
  .productos
    v-row
      v-col(cols="10" lg="8")
        v-text-field(label="Buscar producto" v-model="txtSearch" @keypress.enter="getSearch")
      v-col(cols="2")
        v-icon(icon="mdi-qrcode-scan" class="scan-qrcode" size="42" color="#512DA8" @click="showCodeQR = !showCodeQR")
      v-col(cols="12" lg="2" align="end")
        v-btn.px-10.font-weight-bold.mt-1(variant="flat" size="large" color="blue-accent-2" @click.prevent="viewNew") Nuevo
    div(class="mt-6")
      v-data-table-server(class="elevation-1" :items="getProducts.data" :headers="headerTable" disabled-pagination :hide-default-footer="true" )
        template(v-slot:item.price_buy="{item}")
          p S/ {{item.price_buy.toFixed(2)}}
        template(v-slot:item.price_sale="{item}")
          p S/ {{item.price_sale.toFixed(2)}}
        template(v-slot:item.view="{item}")
          v-icon(icon="mdi-open-in-new" @click="viewProduct(item)")
      v-row.mt-4
        v-col(lg="8")
          v-pagination(v-model="txtPage" :lenght="getProducts.totalPages" @input="changePage")
           
</template>
<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useProductsStore } from '@/stores/products.js';

import { useRouter } from "vue-router";
const router = useRouter()
const products = useProductsStore()
const showCodeQR = ref(false)
const qrPause = ref(false)
const headerTable = ref([
  {
    key: 'name',
    title: "Nombre"
  },
  {
    key: 'category_product.name',
    title: "Categoría"
  },
  {
    key: 'stock',
    title: "Stock"
  },
  {
    key: 'price_buy',
    title: "Precio de compra"
  },
  {
    key: 'price_sale',
    title: "Precio de venta"
  },
  {
    key: 'view',
    title: "Ver producto"
  },
])

const txtPage = ref(1)
const txtLimit = ref(10)
const txtSearch = ref('')
// const txtNumberItemsPage = ref(10)
const getProducts = computed(() => {
  return products.list
})


onBeforeMount(async () =>{
  await products.getProductsAll()
})

useSeoMeta({
  title: "Listado de productos"
})

const changePage = (value) => {
  console.log("changePage", item)
}

const getSearch = () => {
  
  if (txtSearch.value.length < 3){
    router.push({ path: "/productos"});
    products.getProductsAll()
  } else{
    const search = txtSearch.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    navigateTo({ path: "/productos", query: { s: search } });

    products.getProductsSearch(txtSearch.value)
  }

}

const onDetect = async([firstDetectedCode]) =>{
  txtSearch.value = firstDetectedCode.rawValue;
  qrPause.value = true;
  getSearch();
  await timeout(500)
  qrPause.value = false;
  showCodeQR.value = false
}
const viewProduct = (item) => {
  const title = item.name.replace(/\s+/g, '-');
  router.push({path: `/productos/${title}`})
}

 const timeout = (ms) =>{
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

const viewNew = () => {
  router.push({path:"/productos/nuevo"})
}

</script>
