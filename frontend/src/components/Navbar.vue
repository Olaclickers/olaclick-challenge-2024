<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="@/assets/images/ec.png" alt="Logo" class="d-inline-block align-text-top" style="height: 40px;" />
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Inicio</router-link>
          </li>

          <li class="nav-item" v-if="isAuthenticated">
            <span class="nav-link" @click="redirectToDashboard">
              👤 <strong><span style="opacity: 0.98;">{{ fullName }}</span></strong>
            </span>
          </li>

          <li class="nav-item" v-if="isAuthenticated">
            <a href="#" class="nav-link" @click="logout">Cerrar Sesión</a>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link to="/login" class="nav-link">Iniciar Sesión</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    onMounted(() => {
      authStore.validateToken();
    });

    const isAuthenticated = computed(() => authStore.isAuthenticated);

    const fullName = computed(() => {
      if (authStore.user) {
        return `${authStore.user.first_name} ${authStore.user.last_name}`;
      }
      return '';
    });

    const role = computed(() => {
      if (authStore.user && authStore.user.role) {
        return authStore.user.role.role; 
      }
      return '';
    });

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

    const redirectToDashboard = () => {
      if (role.value) {
        redirectUserByRole(role.value);
      } else {
        console.error('No se pudo obtener el rol del usuario.');
      }
    };

    return {
      isAuthenticated,
      fullName,
      logout: authStore.logout,
      redirectToDashboard,
    };
  },
});
</script>

<style scoped>
.navbar-brand img {
  height: 40px;
}
</style>