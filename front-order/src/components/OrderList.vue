<template>
  <div class="p-7">
      <p>
        <Button label="Agregar Entrega" @click="newOrder()" />
      <br>
      </p>
      <div v-if="loading" class="loading-indicator">
        <p>Loading...</p>
      </div>
      <div v-else class="p-7">
        <DataTable :value="orders" responsiveLayout="scroll">
          <Column field="id" header="Id"></Column>
          <Column header="Detalle">
            <template slot="body" slot-scope="props">
              {{ setDetails(props.data.items) }}
            </template>
          </Column>
          <Column header="Cliente">
            <template slot="body" slot-scope="props">
              {{ setFullNameToClient(props.data.user) }} <!-- Llamamos a la función del objeto -->
            </template>
          </Column>
          <Column field="total" header="Total"></Column>
          <Column field="status" header="Estado"></Column>
          <Column header="Acciones">
            <template slot="body" slot-scope="props">
              <Button label="Entregar" @click="sendDelivery(props.data)" />
              <Button class="p-button-danger" label="Eliminar" @click="deleteOrder(props.data)" />
            </template>
          </Column>
        </DataTable>
        <Dialog header="Form" :visible.sync="display" :containerStyle="{width: '50vw'}" :modal="true">
          <div><OrderForm @success-order="successOrder" /></div>
        </Dialog>
        <Toast />
      </div>
  </div>
</template>

<script>
import { useOrderService } from "@/services/OrderService.js";

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import OrderForm from '@/components/OrderForm';

export default {
  name: 'OrderList',
  props: {
  },
  components: {
    OrderForm,
    Toast,
    Button,
    DataTable,
    Column,
    Dialog,
  },
  data() {
    return {
      loading: false,
      display: false,
      orderSelected: {},
      orders: [],
      orderService: useOrderService(),
    };
  },
  async mounted() {
    this.getOrders();
  },
  methods: {
    async getOrders() {
      this.loading = true;
      const response = await this.orderService.getOrderList();
      if (response.status == 200) {
        this.orders = response.data.data
        console.log(this.orders[0])
      }
      this.loading = false;
    },
    async sendDelivery(element) {
      await this.orderService.sendDelivery(element.id)
      this.$toast.add({severity:'success', summary: 'Success', detail:'Orden Entregada', life: 3000});
      await this.getOrders();
    },
    async deleteOrder(element) {
      await this.orderService.destroyOrder(element.id)
      this.$toast.add({severity:'success', summary: 'Danger', detail:'Orden Eliminada', life: 3000});
      await this.getOrders();
    },
    setFullNameToClient(user) {
      return `${user.name} ${user.last_name}`
    },
    setDetails(items) {
      return items.map(item => item.name).join(' + ');
    },
    newOrder() {
      this.openModal();
    },
    openForm(element) {
      this.orderSelected = element;
      this.openModal();
    },
    openModal() {
      this.display = true;
    },
    successOrder() {
      this.getOrders();
      this.closemodal();
    },
    closemodal() {
      this.display = false;
    },
  },
};
</script>
