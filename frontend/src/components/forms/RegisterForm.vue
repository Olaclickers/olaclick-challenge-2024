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
            <h2 class="card-title text-center mb-4">Crear Usuario</h2>
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
                  placeholder="Ingrese su DNI"
                  :class="{ 'is-invalid': errors.dni }"
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
                    placeholder="Ingrese sus nombres"
                    :class="{ 'is-invalid': errors.firstName }"
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
                    placeholder="Ingrese sus apellidos"
                    :class="{ 'is-invalid': errors.lastName }"
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
                  placeholder="Ingrese su teléfono"
                  :class="{ 'is-invalid': errors.phone }"
                />
                <small v-if="errors.phone" class="text-danger">{{ errors.phone }}</small>
              </div>

              <!-- Rol -->
              <div class="mb-3">
                <label for="role" class="form-label">Rol</label>
                <select
                  class="form-select"
                  id="role"
                  v-model="form.role"
                  @blur="validateField('role')"
                  :class="{ 'is-invalid': errors.role }"
                >
                  <option value="42a5aa8c-91cc-4cdc-8f11-af06850a55bb">Administrador</option>
                  <option value="5ad305a4-4882-49d1-a3fd-82d1533d4c21">Cajero</option>
                  <option value="c0cb453e-436d-4f12-8c5c-34427caae132">Cocinero</option>
                  <option value="54d61975-14b1-43f2-9e5c-2fa678149537">Mesero</option>
                </select>
                <small v-if="errors.role" class="text-danger">{{ errors.role }}</small>
              </div>

              <!-- Email y Contraseña -->
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="form.email"
                  @blur="validateField('email')"
                  placeholder="Ingrese su email"
                  :class="{ 'is-invalid': errors.email }"
                />
                <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="form.password"
                  @blur="validateField('password')"
                  placeholder="Ingrese su contraseña"
                  :class="{ 'is-invalid': errors.password }"
                />
                <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
              </div>

              <!-- Activo -->
              <div class="mb-3">
                <label for="active" class="form-label">Activo</label>
                <select
                  class="form-select"
                  id="active"
                  v-model="form.active"
                  @blur="validateField('active')"
                  :class="{ 'is-invalid': errors.active }"
                >
                  <option :value="true">Sí</option>
                  <option :value="false">No</option>
                </select>
                <small v-if="errors.active" class="text-danger">{{ errors.active }}</small>
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
import { useRouter } from 'vue-router';
import ToastNotification from '../../components/ToastNotification.vue';
import api from '../../api/users'; 

export default defineComponent({
  name: 'RegisterForm',
  components: {
    ToastNotification, 
  },
  setup() {
    const router = useRouter();
    const form = reactive({
      dni: '',
      firstName: '',
      lastName: '',
      phone: '',
      role: 'admin',
      email: '',
      password: '',
      active: true,
    });

    const errors = reactive({
      dni: '',
      firstName: '',
      lastName: '',
      phone: '',
      role: '',
      email: '',
      password: '',
      active: '',
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
          errors.phone = /^\d+$/.test(form.phone) ? '' : 'El teléfono solo debe contener números.';
          break;
        case 'role':
          errors.role = form.role ? '' : 'Seleccione un rol.';
          break;
        case 'email':
          errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'El email no es válido.';
          break;
        case 'password':
          errors.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password)
            ? ''
            : 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.';
          break;
        case 'active':
          errors.active = form.active !== undefined ? '' : 'Seleccione un estado.';
          break;
        default:
          break;
      }
    };

    const isFormValid = computed(() => {
      return Object.values(errors).every(error => error === '');
    });

    const generateUsername = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let username = '';
      for (let i = 0; i < 8; i++) {
        username += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return username;
    };

    const handleSubmit = async () => {
      Object.keys(form).forEach(field => validateField(field));
      if (isFormValid.value) {
        try {
          const username = generateUsername();

          const userData = {
            dni: form.dni,
            first_name: form.firstName, 
            last_name: form.lastName,   
            phone: form.phone,
            role_id: form.role, 
            email: form.email,
            password: form.password,
            active: form.active,
            username: username, 
          };

          await api.createUser(userData);
          toastMessage.value = 'Usuario registrado exitosamente';
          toastType.value = 'success';
          showToast.value = true;

          setTimeout(() => {
            router.push('/users');
          }, 2000);
        } catch (error) {
          console.error('Error al crear el usuario:', error);
          toastMessage.value = 'Error al registrar el usuario. Inténtelo de nuevo.';
          toastType.value = 'error';
          showToast.value = true;
        }
      } else {
        toastMessage.value = 'Por favor, corrija los errores en el formulario.';
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

<style scoped>
.card {
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.is-invalid {
  border-color: #dc3545;
}
</style>