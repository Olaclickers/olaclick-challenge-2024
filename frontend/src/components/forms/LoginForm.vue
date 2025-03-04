<template>
  <div class="container mt-5">
    <ToastNotification
      v-if="showToast"
      :message="toastMessage"
      :type="toastType"
      @close="showToast = false"
    />

    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Iniciar Sesión</h2>
            <form @submit.prevent="handleSubmit">
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
              <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import ToastNotification from '../../components/ToastNotification.vue'; 
import authApi from '../../api/auth'; 
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/authStore';
import type { DecodedToken } from '../../interfaces/decodeToken';
import { decodeJwt } from '../../utils/jwtUtils';

export default defineComponent({
  name: 'LoginForm',
  components: {
    ToastNotification, 
  },
  setup() {
    const router = useRouter(); 

    const form = reactive({
      email: '',
      password: '',
    });

    const errors = reactive({
      email: '',
      password: '',
    });

    const showToast = ref(false);
    const toastMessage = ref('');
    const toastType = ref('info'); 

    const validateField = (field: string) => {
      switch (field) {
        case 'email':
          errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
            ? ''
            : 'El email no es válido.';
          break;
        case 'password':
          errors.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password)
            ? ''
            : 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.';
          break;
        default:
          break;
      }
    };

    const isFormValid = () => {
      return Object.values(errors).every(error => error === '');
    };
    const redirectUserByRole = (role: string) => {
      switch (role) {
        case 'administrador':
          router.push('/admin');
          break;
        case 'cajero':
          router.push('/cashier');
          break;
        case 'mesero':
          router.push('/waiter');
          break;
        case 'cocinero':
          router.push('/chef');
          break;
        default:
          console.error('Rol no reconocido:', role);
          break;
      }
    };
    const authStore = useAuthStore();
    const handleSubmit = async () => {
  if (isFormValid()) {
    try {
      const response = await authApi.login({
        email: form.email,
        password: form.password,
      });
      localStorage.setItem('authToken', response.access_token);

      await authStore.validateToken(); 

      const decodedToken = decodeJwt(response.access_token) as DecodedToken;
      if (decodedToken && decodedToken.role && decodedToken.role.role) {
        redirectUserByRole(decodedToken.role.role);
      } else {
        throw new Error('No se pudo obtener el rol del usuario.');
      }

      toastMessage.value = 'Inicio de sesión exitoso';
      toastType.value = 'success';
      showToast.value = true;
    } catch (error) {
      toastMessage.value = 'Error al iniciar sesión. Verifica tus credenciales.';
      toastType.value = 'error';
      showToast.value = true;
      console.error('Error al iniciar sesión:', error);
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