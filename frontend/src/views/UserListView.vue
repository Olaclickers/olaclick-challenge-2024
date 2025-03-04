<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Lista de Usuarios</h2>

    <!-- Filtros -->
    <div class="row mb-3">
      <div class="col-md-4">
        <label for="roleFilter" class="form-label">Filtrar por Rol</label>
        <select id="roleFilter" class="form-select" v-model="roleFilter">
          <option value="">Todos</option>
          <option value="administrador">Administrador</option>
          <option value="cajero">Cajero</option>
          <option value="cocinero">Cocinero</option>
          <option value="mesero">Mesero</option>
        </select>
      </div>
    </div>

    <!-- Tabla de Usuarios -->
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th @click="('dni')">DNI</th>
            <th @click="('first_name')">Nombre</th>
            <th @click="('email')">Email</th>
            <th @click="('role_id')">Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.dni">
            <td>{{ user.dni }}</td>
            <td>{{ user.first_name }} {{ user.last_name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span class="badge bg-secondary">
                {{ user.role_id }}
              </span>
            </td>
            <td>
              <button class="btn btn-sm btn-light" @click="viewDetails(user.dni)">
                Detalle
              </button>
              <!-- <button class="btn btn-sm btn-warning ms-2" @click="updateUser(user.dni)">
                Actualizar
              </button> -->
              <button class="btn btn-sm btn-secondary ms-2" @click="confirmDelete(user.dni)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginación -->
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !pagination.hasPreviousPage }">
          <button class="page-link" @click="prevPage">Anterior</button>
        </li>
        <li class="page-item" :class="{ disabled: !pagination.hasNextPage }">
          <button class="page-link" @click="nextPage">Siguiente</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import api from '../api/users';
import type { User } from '../types/api/users';

export default defineComponent({
  name: 'UserList',
  setup() {
    const router = useRouter();
    const users = ref<User[]>([]);
    const roleFilter = ref('');
    const pagination = ref({
      page: 1,
      limit: 10,
      hasPreviousPage: false,
      hasNextPage: false,
    });

    const fetchUsers = async () => {
      try {
        const response = await api.getUsers();
        users.value = response.data.data;
        pagination.value = response.data.meta;
      } catch (error) {
        console.error('Error obteniendo usuarios:', error);
      }
    };

    onMounted(fetchUsers);

    const filteredUsers = computed(() => {
      return roleFilter.value
        ? users.value.filter(user => user.role_id === roleFilter.value)
        : users.value;
    });

    const paginatedUsers = computed(() => {
      const start = (pagination.value.page - 1) * pagination.value.limit;
      return filteredUsers.value.slice(start, start + pagination.value.limit);
    });

    const viewDetails = (dni: string) => {
      router.push({ name: 'UserDetailView', params: { id: dni } });
    };

    const updateUser = (dni: string) => {
      router.push({ name: 'UserUpdateView', params: { id: dni } });
    };

    const confirmDelete = (dni: string) => {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) deleteUser(dni);
      });
    };

    const deleteUser = async (dni: string) => {
      try {
        await api.deleteUser(dni);
        users.value = users.value.filter(user => user.dni !== dni);
        Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
      } catch (error) {
        console.error('Error eliminando usuario:', error);
        Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
      }
    };

    const prevPage = () => {
      if (pagination.value.page > 1) {
        pagination.value.page--;
        fetchUsers();
      }
    };

    const nextPage = () => {
      if (pagination.value.hasNextPage) {
        pagination.value.page++;
        fetchUsers();
      }
    };

    return {
      users,
      roleFilter,
      pagination,
      filteredUsers,
      paginatedUsers,
      viewDetails,
      updateUser,
      confirmDelete,
      deleteUser,
      prevPage,
      nextPage,
    };
  },
});
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}
.badge {
  font-size: 0.9em;
}
</style>
