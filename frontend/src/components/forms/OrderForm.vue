<template>
  <div class="container mt-5">
    <ToastNotification
      v-if="showToast"
      :message="toastMessage"
      :type="toastType"
      @close="showToast = false"
    />
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Crear Orden</h2>
            <form @submit.prevent="handleSubmit">
              <!-- Selección de Cliente -->
              <div class="mb-3">
                <label for="client" class="form-label">Cliente</label>
                <select
                  class="form-select"
                  id="client"
                  v-model="form.clientId"
                  @blur="validateField('clientId')"
                  :class="{ 'is-invalid': errors.clientId }"
                >
                  <option value="">Seleccione un cliente</option>
                  <option v-for="client in clients" :key="client.dni" :value="client.dni">
                    {{ client.firstName }} {{ client.lastName }} ({{ client.dni }})
                  </option>
                </select>
                <small v-if="errors.clientId" class="text-danger">{{ errors.clientId }}</small>
              </div>

              <!-- Selección de Menú -->
              <div class="mb-3">
                <label for="menu" class="form-label">Menú</label>
                <select
                  class="form-select"
                  id="menu"
                  v-model="selectedMenu"
                  :class="{ 'is-invalid': errors.menuItems }"
                >
                  <option value="">Seleccione un menú</option>
                  <option
                    v-for="menu in availableMenus"
                    :key="menu.id"
                    :value="menu"
                  >
                    {{ menu.name }} - ${{ menu.price }}
                  </option>
                </select>
                <small v-if="errors.menuItems" class="text-danger">{{ errors.menuItems }}</small>
              </div>

              <!-- Cantidad de Menú -->
              <div class="mb-3" v-if="selectedMenu">
                <label for="menuQuantity" class="form-label">Cantidad de Menú</label>
                <input
                  type="number"
                  class="form-control"
                  id="menuQuantity"
                  v-model="menuQuantity"
                  min="1"
                />
                <button type="button" class="btn btn-secondary mt-2" @click="addMenuItem">
                  Agregar Menú
                </button>
              </div>

              <!-- Lista de Menús seleccionados -->
              <div class="mb-3" v-if="form.menuItems.length > 0">
                <h5>Menús Seleccionados</h5>
                <ul class="list-group">
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center"
                    v-for="(item, index) in form.menuItems"
                    :key="index"
                  >
                    {{ item.name }} (Cantidad: {{ item.quantity }})
                    <button type="button" class="btn btn-secondary btn-sm" @click="removeMenuItem(index)">
                      Eliminar
                    </button>
                  </li>
                </ul>
              </div>

              <!-- Selección de Contorno -->
              <div class="mb-3">
                <label for="sideDish" class="form-label">Contorno</label>
                <select
                  class="form-select"
                  id="sideDish"
                  v-model="selectedSideDish"
                  :class="{ 'is-invalid': errors.sideDishItems }"
                >
                  <option value="">Seleccione un contorno</option>
                  <option
                    v-for="sideDish in availableSideDishes"
                    :key="sideDish.id"
                    :value="sideDish"
                  >
                    {{ sideDish.name }} - ${{ sideDish.price }}
                  </option>
                </select>
                <small v-if="errors.sideDishItems" class="text-danger">{{ errors.sideDishItems }}</small>
              </div>

              <!-- Cantidad de Contorno -->
              <div class="mb-3" v-if="selectedSideDish">
                <label for="sideDishQuantity" class="form-label">Cantidad de Contorno</label>
                <input
                  type="number"
                  class="form-control"
                  id="sideDishQuantity"
                  v-model="sideDishQuantity"
                  min="1"
                />
                <button type="button" class="btn btn-primary mt-2" @click="addSideDishItem">
                  Agregar Contorno
                </button>
              </div>

              <!-- Lista de Contornos seleccionados -->
              <div class="mb-3" v-if="form.sideDishItems.length > 0">
                <h5>Contornos Seleccionados</h5>
                <ul class="list-group">
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center"
                    v-for="(item, index) in form.sideDishItems"
                    :key="index"
                  >
                    {{ item.name }} (Cantidad: {{ item.quantity }})
                    <button type="button" class="btn btn-secondary btn-sm" @click="removeSideDishItem(index)">
                      Eliminar
                    </button>
                  </li>
                </ul>
              </div>

              <!-- Selección de Bebida -->
              <div class="mb-3">
                <label for="drink" class="form-label">Bebida</label>
                <select
                  class="form-select"
                  id="drink"
                  v-model="selectedDrink"
                  :class="{ 'is-invalid': errors.drinkItems }"
                >
                  <option value="">Seleccione una bebida</option>
                  <option
                    v-for="drink in availableDrinks"
                    :key="drink.id"
                    :value="drink"
                  >
                    {{ drink.name }} - ${{ drink.price }}
                  </option>
                </select>
                <small v-if="errors.drinkItems" class="text-danger">{{ errors.drinkItems }}</small>
              </div>

              <!-- Cantidad de Bebida -->
              <div class="mb-3" v-if="selectedDrink">
                <label for="drinkQuantity" class="form-label">Cantidad de Bebida</label>
                <input
                  type="number"
                  class="form-control"
                  id="drinkQuantity"
                  v-model="drinkQuantity"
                  min="1"
                />
                <button type="button" class="btn btn-primary mt-2" @click="addDrinkItem">
                  Agregar Bebida
                </button>
              </div>

              <!-- Lista de Bebidas seleccionadas -->
              <div class="mb-3" v-if="form.drinkItems.length > 0">
                <h5>Bebidas Seleccionadas</h5>
                <ul class="list-group">
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center"
                    v-for="(item, index) in form.drinkItems"
                    :key="index"
                  >
                    {{ item.name }} (Cantidad: {{ item.quantity }})
                    <button type="button" class="btn btn-secondary btn-sm" @click="removeDrinkItem(index)">
                      Eliminar
                    </button>
                  </li>
                </ul>
              </div>

              <div class="mb-3">
                <h4>Total: ${{ total.toFixed(2) }}</h4>
              </div>

              <div style="display: flex; justify-content: flex-end;">
                <button type="submit" class="btn btn-secondary w-30">Registrar</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';
import ToastNotification from '../../components/ToastNotification.vue'; 

export default defineComponent({
  name: 'OrderForm',
  components: {
    ToastNotification, // Registra el componente
  },
  setup() {
    // Datos de prueba (simulando una API)
    const clients = ref([
      { dni: '12345678', firstName: 'Edwar', lastName: 'Castillo' },
      { dni: '87654321', firstName: 'Karlins', lastName: 'Medina' },
      { dni: '87654321', firstName: 'Fernanda', lastName: 'Castillo' },
      { dni: '87654321', firstName: 'Juana', lastName: 'Blasco' },
      { dni: '87654321', firstName: 'Delia', lastName: 'Gonzalez' },
      { dni: '87654321', firstName: 'Mhya', lastName: 'Monserrat' },
    ]);

    const menus = ref([
      { id: 1, name: 'Adobo Arequipeño', price: 64.3 },
      { id: 2, name: 'Ajì de Gallina', price: 35.5 },
      { id: 3, name: 'Arroz con Pollo', price: 42.5 },
      { id: 4, name: 'Carapulcra con Sopa Seca', price: 37.5 },
      { id: 5, name: 'Ceviche de Pescado', price: 36.5 },
      { id: 6, name: 'Juane de Gallina', price: 41.0 },
    ]);

    const sideDishes = ref([
      { id: 1, name: 'Arroz', price: 13.0 },
      { id: 2, name: 'Camote', price: 11.0 },
      { id: 3, name: 'Cancha Serrana', price: 12.0 },
      { id: 4, name: 'Choclo', price: 14.0 },
      { id: 5, name: 'Ensalada Criolla', price: 9.0 },
      { id: 6, name: 'Papas Fritas', price: 12.0 },
      { id: 7, name: 'Platano Frito', price: 10.0 },
    ]);

    const drinks = ref([
      { id: 1, name: 'Agua', price: 13.0 },
      { id: 2, name: 'Agua de Cebada', price: 11.0 },
      { id: 3, name: 'Chiha Morada', price: 12.0 },
      { id: 4, name: 'Chicha de Jora', price: 14.0 },
      { id: 5, name: 'Emoliente', price: 9.0 },
      { id: 6, name: 'Inca Kola', price: 12.0 },
      { id: 7, name: 'Jugo de Mango', price: 10.0 },
    ]);

    const form = reactive({
      clientId: '',
      menuItems: [] as { id: number; name: string; price: number; quantity: number }[],
      sideDishItems: [] as { id: number; name: string; price: number; quantity: number }[],
      drinkItems: [] as { id: number; name: string; price: number; quantity: number }[],
    });

    const errors = reactive({
      clientId: '',
      menuItems: '',
      sideDishItems: '',
      drinkItems: '',
    });

    const selectedMenu = ref<any>(null);
    const selectedSideDish = ref<any>(null);
    const selectedDrink = ref<any>(null);

    const menuQuantity = ref(1);
    const sideDishQuantity = ref(1);
    const drinkQuantity = ref(1);

    const showToast = ref(false); 
    const toastMessage = ref(''); 
    const toastType = ref('info');

    const availableMenus = computed(() => {
      return menus.value.filter(menu => !form.menuItems.some(item => item.id === menu.id));
    });

    const availableSideDishes = computed(() => {
      return sideDishes.value.filter(sideDish => !form.sideDishItems.some(item => item.id === sideDish.id));
    });

    const availableDrinks = computed(() => {
      return drinks.value.filter(drink => !form.drinkItems.some(item => item.id === drink.id));
    });

    const validateField = (field: string) => {
      switch (field) {
        case 'clientId':
          errors.clientId = form.clientId ? '' : 'Seleccione un cliente.';
          break;
        case 'menuItems':
          errors.menuItems = form.menuItems.length > 0 ? '' : '';
          break;
        case 'sideDishItems':
          errors.sideDishItems = form.sideDishItems.length > 0 ? '' : '';
          break;
        case 'drinkItems':
          errors.drinkItems = form.drinkItems.length > 0 ? '' : '';
          break;
        default:
          break;
      }
    };

    const isFormValid = computed(() => {
      return (
        form.clientId &&
        (form.menuItems.length > 0 || form.sideDishItems.length > 0 || form.drinkItems.length > 0)
      );
    });

    const addMenuItem = () => {
      if (selectedMenu.value && menuQuantity.value > 0) {
        const existingItem = form.menuItems.find(item => item.id === selectedMenu.value.id);
        if (existingItem) {
          existingItem.quantity += menuQuantity.value;
        } else {
          form.menuItems.push({ ...selectedMenu.value, quantity: menuQuantity.value });
        }
        selectedMenu.value = null;
        menuQuantity.value = 1;
        validateField('menuItems');
      }
    };

    const addSideDishItem = () => {
      if (selectedSideDish.value && sideDishQuantity.value > 0) {
        const existingItem = form.sideDishItems.find(item => item.id === selectedSideDish.value.id);
        if (existingItem) {
          existingItem.quantity += sideDishQuantity.value;
        } else {
          form.sideDishItems.push({ ...selectedSideDish.value, quantity: sideDishQuantity.value });
        }
        selectedSideDish.value = null;
        sideDishQuantity.value = 1;
        validateField('sideDishItems');
      }
    };

    const addDrinkItem = () => {
      if (selectedDrink.value && drinkQuantity.value > 0) {
        const existingItem = form.drinkItems.find(item => item.id === selectedDrink.value.id);
        if (existingItem) {
          existingItem.quantity += drinkQuantity.value;
        } else {
          form.drinkItems.push({ ...selectedDrink.value, quantity: drinkQuantity.value });
        }
        selectedDrink.value = null;
        drinkQuantity.value = 1;
        validateField('drinkItems');
      }
    };

    const removeMenuItem = (index: number) => {
      form.menuItems.splice(index, 1);
      validateField('menuItems');
    };

    const removeSideDishItem = (index: number) => {
      form.sideDishItems.splice(index, 1);
      validateField('sideDishItems');
    };

    const removeDrinkItem = (index: number) => {
      form.drinkItems.splice(index, 1);
      validateField('drinkItems');
    };

    const total = computed(() => {
      const menuTotal = form.menuItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const sideDishTotal = form.sideDishItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const drinkTotal = form.drinkItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return menuTotal + sideDishTotal + drinkTotal;
    });

    const handleSubmit = () => {
      Object.keys(form).forEach(field => validateField(field));
      if (isFormValid.value) {
        console.log('Datos del formulario:', form);
        toastMessage.value = 'Orden creada exitosamente';
        toastType.value = 'success';
        showToast.value = true;
      } else {
        toastMessage.value = 'Por favor, seleccione al menos un menú, contorno o bebida.';
        toastType.value = 'error';
        showToast.value = true;
      }
    };

    return {
      clients,
      menus,
      sideDishes,
      drinks,
      form,
      selectedMenu,
      selectedSideDish,
      selectedDrink,
      menuQuantity,
      sideDishQuantity,
      drinkQuantity,
      availableMenus,
      availableSideDishes,
      availableDrinks,
      errors,
      showToast,
      toastMessage,
      toastType,
      total,
      addMenuItem,
      addSideDishItem,
      addDrinkItem,
      removeMenuItem,
      removeSideDishItem,
      removeDrinkItem,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.card {
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.is-invalid {
  border-color: #dc3545;
}
</style>