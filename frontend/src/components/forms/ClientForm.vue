<template>
  <div class="container mt-5">
    <ToastNotification
      v-if="showToast"
      :message="toastMessage"
      :type="toastType"
      @close="showToast = false"
    />
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Crear Cliente</h2>
            <form @submit.prevent="handleSubmit">
              <!-- DNI -->
              <div class="mb-3">
                <label for="dni" class="form-label">DNI</label>
                <input
                  type="text"
                  class="form-control"
                  id="dni"
                  v-model="form.dni"
                  @blur="validateField('dni')"
                  placeholder="Ingrese el DNI"
                />
                <small v-if="errors.dni" class="text-danger">{{ errors.dni }}</small>
              </div>

              <!-- Nombres y Apellidos -->
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="firstName" class="form-label">Nombres</label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    v-model="form.firstName"
                    @blur="validateField('firstName')"
                    placeholder="Ingrese los nombres"
                  />
                  <small v-if="errors.firstName" class="text-danger">{{ errors.firstName }}</small>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="lastName" class="form-label">Apellidos</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    v-model="form.lastName"
                    @blur="validateField('lastName')"
                    placeholder="Ingrese los apellidos"
                  />
                  <small v-if="errors.lastName" class="text-danger">{{ errors.lastName }}</small>
                </div>
              </div>

              <!-- Teléfono -->
              <div class="mb-3">
                <label for="phone" class="form-label">Teléfono</label>
                <input
                  type="text"
                  class="form-control"
                  id="phone"
                  v-model="form.phone"
                  @blur="validateField('phone')"
                  placeholder="Ingrese el teléfono"
                />
                <small v-if="errors.phone" class="text-danger">{{ errors.phone }}</small>
              </div>

              <!-- Email -->
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="form.email"
                  @blur="validateField('email')"
                  placeholder="Ingrese el email"
                />
                <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
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
import { defineComponent, reactive, computed, ref } from 'vue';
import ToastNotification from '../../components/ToastNotification.vue';
import api from '../../api/clients'; 

export default defineComponent({
  name: 'ClientForm',
  components: {
    ToastNotification,
  },
  setup() {
    const form = reactive({
      dni: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    });

    const errors = reactive({
      dni: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    });

    const showToast = ref(false);
    const toastMessage = ref('');
    const toastType = ref('info');

    const validateField = (field: string) => {
      switch (field) {
        case 'dni':
          errors.dni = /^\d+$/.test(form.dni) ? '' : 'El DNI solo debe contener números.';
          break;
        case 'firstName':
          errors.firstName = form.firstName.trim() ? '' : 'Los nombres son obligatorios.';
          break;
        case 'lastName':
          errors.lastName = form.lastName.trim() ? '' : 'Los apellidos son obligatorios.';
          break;
        case 'phone':
          errors.phone = form.phone === '' || /^\d+$/.test(form.phone) ? '' : 'El teléfono solo debe contener números.';
          break;
        case 'email':
          errors.email = form.email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'El email no es válido.';
          break;
        default:
          break;
      }
    };

    const isFormValid = computed(() => {
      return Object.values(errors).every(error => error === '');
    });

    const handleSubmit = async() => {
      Object.keys(form).forEach(field => validateField(field));
      if (isFormValid.value) {
        const clientData = {
            dni: form.dni,
            first_name: form.firstName, 
            last_name: form.lastName,   
            phone: form.phone,
            email: form.email,
            
          };
        await api.createClient(clientData);
        toastMessage.value = 'Cliente creado exitosamente';
        toastType.value = 'success';
        showToast.value = true;
      } else {
        toastMessage.value = 'Por favor, corrige los errores en el formulario.';
        toastType.value = 'error';
        showToast.value = true;
      }
    };

    return {
      form,
      errors,
      showToast,
      toastMessage,
      toastType,
      handleSubmit,
      validateField,
    };
  },
});
</script>