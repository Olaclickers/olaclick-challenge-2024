<template>

  <div class="card border-primary m-5">
    <div class="card-header bg-light">
      <AppHeader msg="Restaurante Ficticio" msg2="Estado de las órdenes" />
    </div>

    <div class="row mt-3">
      <div class="col-7"></div>
      <div class="col-3">
        <button type="button" class="btn btn-secondary"><i class="fa-solid fa-magnifying-glass"></i> Ver ordenes entregadas</button>
      </div>
      
      <div class="col-2">
        <button type="button" class="btn btn-primary"><i class="fa-solid fa-plus"></i> Nueva orden</button>
      </div>
    </div>
    <AppTable />
  </div>


</template>

<script>

import AppTable from './components/Table.vue'
import AppHeader from './components/Header.vue';



export default {

  name: 'App',
  components: {
    AppTable,
    AppHeader
  }

}
</script>