<template>
  <v-container>
    
    <v-row class="mb-2" dense>
      <v-col
        cols="12"
        md="2"
        v-for="(product, index) in products"
        :key="index"
        class="text-center"
      >
        <div><strong>{{ product.name }}</strong></div>
        <v-text-field
          :model-value="product.quantity"
          @update:model-value="value => updateQuantity(index, value)"
          type="number"
          min="0"
          label="Qtd"
          dense
          hide-details
          :error="errors.products[index] !== ''"
          :error-messages="errors.products[index]"
          style="max-width: 80px; margin: 8px auto;"
        />
        <div>Preço unitário:</div>
        <div><strong>R$ {{ product.unitPrice.toFixed(2) }}</strong></div>
        <div style="margin-top: 8px;">Total:</div>
        <div>
          <strong>R$ {{ (product.quantity * product.unitPrice).toFixed(2) }}</strong>
        </div>
      </v-col>
    </v-row>

    
    <v-row v-if="productSelectionError" class="mb-4">
      <v-col cols="12">
        <v-alert type="error" dense text>
          Escolha ao menos um produto
        </v-alert>
      </v-col>
    </v-row>

    <!-- ALERTAS / Alert-->
    <v-alert
      v-if="successMessage"
      type="success"
      class="mb-4"
      dismissible
      @click:close="successMessage = ''"
    >
      {{ successMessage }}
    </v-alert>
    <v-alert
      v-if="removeMessage"
      type="error"
      class="mb-4"
      dismissible
      @click:close="removeMessage = ''"
    >
      {{ removeMessage }}
    </v-alert>

    <!-- FORMULÁRIO // forms -->
    <v-card class="pa-4 mb-6" elevation="2">
      <v-row dense>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="newOrder.detail"
            label="Observação"
            outlined
            :error="errors.detail !== ''"
            :error-messages="errors.detail"
            @input="validateForm"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="newOrder.client"
            label="Nome do Cliente"
            outlined
            :error="errors.client !== ''"
            :error-messages="errors.client"
            @input="validateForm"
          />
        </v-col>

     <v-col cols="12" md="3" class="d-flex flex-column justify-center">
  <v-text-field
    :model-value="formattedTotal"
    label="Valor Total"
    readonly
    outlined
    dense
    hide-details
  />
</v-col>


        <v-col cols="12" md="1" class="d-flex align-center">
          <v-btn color="blue" @click="addOrder" block>Adicionar</v-btn>
        </v-col>
      </v-row>
    </v-card>

   
    <v-table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Descrição</th>
          <th>Produtos</th>
          <th>Quantidade</th>
          <th>Custo Unitário</th>
          <th>Total</th>
          <th>Estado</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
          class="hoverable-row"
        >
          <td>{{ order.id }}</td>
          <td>{{ order.detail }}</td>
          <td>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li v-for="item in order.items" :key="item.id">
                {{ item.name }} (Qtd: {{ item.quantity }})
              </li>
            </ul>
          </td>
          <td>{{ order.items.reduce((sum, item) => sum + item.quantity, 0) }}</td>
          <td>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li v-for="item in order.items" :key="item.id">
                R$ {{ item.unitPrice.toFixed(2) }}
              </li>
            </ul>
          </td>
          <td>R$ {{ order.total.toFixed(2) }}</td>
          <td>{{ order.state }}</td>
          <td>
            <v-btn
              v-if="order.state !== 'entregue'"
              color="blue"
              variant="text"
              size="small"
              @click="changeState(order.id, 'anuncio')"
            >
              Anunciar
            </v-btn>
            <v-btn
              v-if="order.state !== 'entregue'"
              color="green"
              variant="text"
              size="small"
              @click="changeState(order.id, 'entregue')"
            >
              Entregar
            </v-btn>
            <v-btn
              color="red"
              variant="text"
              size="small"
              @click="removeOrder(order.id)"
            >
              Remover
            </v-btn>
            <v-btn
              color="indigo"
              variant="text"
              size="small"
              @click="goToDetails(order.id)"
            >
              Ver Detalhes
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderStore } from '../store/orderStore';
import { storeToRefs } from 'pinia';

const router = useRouter();
const orderStore = useOrderStore();
const { orders } = storeToRefs(orderStore);

const products = ref([
  { name: 'Banana', quantity: 0, unitPrice: 10.0 },
  { name: 'Maçã', quantity: 0, unitPrice: 15.0 },
  { name: 'Tomate', quantity: 0, unitPrice: 20.0 },
  { name: 'Abacate', quantity: 0, unitPrice: 25.0 },
  { name: 'Jambo', quantity: 0, unitPrice: 30.0 },
]);

// Dados do formulário da nova ordem
// Form data for new order
const newOrder = ref({ detail: '', client: '', total: 0 });
// Objeto de erros para validações
// Error object for validations
const errors = ref({
  detail: '',
  client: '',
  products: products.value.map(() => ''),
});
const successMessage = ref('');
const removeMessage = ref('');
const productSelectionError = ref(false);

function updateQuantity(index, value) {
  const qty = parseInt(value);
  if (isNaN(qty) || qty < 0) {
    products.value[index].quantity = 0;
    errors.value.products[index] = 'Quantidade inválida';
  } else {
    products.value[index].quantity = qty;
    errors.value.products[index] = '';
  }
  updateTotalFromProducts();
  validateForm();
}

const updateTotalFromProducts = () => {
  const total = products.value.reduce(
    (sum, p) => sum + p.quantity * p.unitPrice,
    0
  );
  newOrder.value.total = total;
};


// Valida os campos do formulário
// Validate form fields
const validateForm = () => {
  errors.value.detail = newOrder.value.detail.trim() ? '' : 'A observação não pode estar vázia!';
  errors.value.client = newOrder.value.client.trim() ? '' : 'O nome do cliente não pode estar vazio!';

  const anyProductSelected = products.value.some(p => p.quantity > 0);
  productSelectionError.value = !anyProductSelected;

  errors.value.products = products.value.map(() => '');
};

// Adiciona uma nova ordem à store
// Add a new order to the store
const addOrder = () => {
  validateForm();

  const hasErrors =
    errors.value.detail !== '' ||
    errors.value.client !== '' ||
    productSelectionError.value;

  if (hasErrors) return;

  const selectedItems = products.value
    .filter(p => p.quantity > 0)
    .map((p, index) => ({
      id: index + 1,
      name: p.name,

      quantity: p.quantity,
      unitPrice: p.unitPrice,
      
    }));

  const totalValue = selectedItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  orderStore.addOrder({
    detail: newOrder.value.detail,
    client: newOrder.value.client,
    total: totalValue,
    items: selectedItems,
    state: 'pendente',
  });

    // Limpa o formulário após adicionar
 // Clear form after adding
  newOrder.value = { detail: '', client: '', total: 0 };
  products.value.forEach(p => (p.quantity = 0));
  productSelectionError.value = false;

  successMessage.value = '✅ Ordem adicionada com sucesso!';
  setTimeout(() => (successMessage.value = ''), 3000);
};

const removeOrder = id => {
  const order = orders.value.find(order => order.id === id);
  if (order) {
    orderStore.removeOrder(id);
    removeMessage.value = `❌ Ordem "${order.detail}" foi removida com sucesso!`;
    setTimeout(() => (removeMessage.value = ''), 3000);
  }
};

const changeState = (id, newState) => {
  orderStore.changeState(id, newState);
};

const goToDetails = id => {
  router.push(`/ordem/${id}`);
};

const formattedTotal = computed(() => {
  return `R$ ${newOrder.value.total.toFixed(2)}`;
});

// Observa mudanças nos produtos para atualizar o total
// Watch product changes to update total
watch(products, updateTotalFromProducts, { deep: true });
</script>


