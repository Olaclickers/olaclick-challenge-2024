<template>
  <div class="p-1">
    <div>
      <form @submit.prevent="submitOrder">
        <div class="p-2">
          <label for="user">Seleccionar Usuario</label>
          <select v-model="userId" required>
            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
          </select>
        </div>
        <div v-for="(item, index) in orderItems" :key="index" class="p-3">
          <div class="p-2">
            <label for="itemName">Producto</label>
            <select v-model="item.selectedProduct" @change="updatePrice(item)" required>
              <option value="">Selecciona un producto</option>
              <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
            </select>
          </div>
          
          <div class="p-2">
            <label for="quantity">Cantidad</label>
            <input v-model.number="item.quantity" type="number" min="1" placeholder="Cantidad" required />
          </div>

          <div class="p-2">
            <label for="price">Precio</label>
            <input :value="item.price" readonly type="text" />
          </div>

          <div class="p-2">
            <label for="total">Total</label>
            <input :value="item.quantity * item.price" readonly type="text" />
          </div>
          <Button label="Eliminar ítem" icon="pi pi-trash" class="p-button-danger" @click="removeItem(index)" />
        </div>
        <Button label="Agregar Ítem" icon="pi pi-plus" @click="addItem" />
        <br>
        <div class="pt-6">
          <Button label="Enviar Orden" icon="pi pi-check" type="submit" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useItemService } from "@/services/ItemService.js";
import { useOrderService } from "@/services/OrderService.js";
import { useUserService } from "@/services/UserService.js";

import Button from 'primevue/button';

export default {
  name: 'OrderForm',
  components: {
    Button,
  },
  async mounted() {
    this.getProducts();
    this.getUsers();
  },
  data() {
    return {
      orderService: useOrderService(),
      itemService: useItemService(),
      userService: useUserService(),
      orderItems: [
        {
          selectedProduct: null,
          quantity: 1,
          price: 0,
        },
      ],
      userId: null,
      products: [], 
      users: [],
    };
  },
  methods: {
    async getProducts() {
      const response = await this.itemService.getItemList();
      if (response.status == 200) {
        this.products = response.data.data
      }
    },
    async getUsers() {
      const response = await this.userService.getUserList();
      if (response.status == 200) {
        this.users = response.data.data
      }
    },
    addItem() {
      this.orderItems.push({
        selectedProduct: null,
        quantity: 1,
        price: 0,
      });
    },
    removeItem(index) {
      this.orderItems.splice(index, 1);
    },
    updatePrice(item) {
      const selectedProduct = this.products.find(product => product.id === item.selectedProduct);
      if (selectedProduct) {
        item.price = selectedProduct.price;
      }
    },
    async submitOrder() {
      const orderData = {
        items: this.orderItems.map(item => ({
          productId: item.selectedProduct,
          quantity: item.quantity,
          price: item.price,
          total: item.quantity * item.price,
        })),
        total: this.orderItems.reduce((acc, item) => acc + (item.quantity * item.price), 0),
        user_id: this.userId,
      };
      const response = await this.orderService.sendOrder(orderData)
      if (response.status == 201) {
        this.resetForm();
        this.$emit('success-order');
      }
    },
    resetForm() {
      this.orderItems = [
        {
          selectedProduct: null,
          quantity: 1,
          price: 0,
        },
      ];
      this.userId = null;
    },
  },
};
</script>

<style scoped>

</style>