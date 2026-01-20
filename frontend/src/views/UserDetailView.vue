<template>
    <div class="user-detail-container">
      <div v-if="user" class="card user-detail-card">
        <div class="card-header">
          <img src="@/assets/images/users.webp" alt="User Logo" class="user-logo" />
          <h5 class="card-title">{{ user.first_name }} {{ user.last_name }}</h5>
          <p class="user-role">{{ user.role_id }}</p>
        </div>
        <div class="card-body">
          <p><strong>DNI:</strong> {{ user.dni }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Teléfono:</strong> {{ user.phone }}</p>
          <p><strong>Activo:</strong> {{ user.status ? 'Sí' : 'No' }}</p>
        </div>
        <div class="card-footer">
          <router-link to="/users" class="action-button">
            <i class="bi bi-arrow-left-circle"></i> Volver atrás
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import userApi from '../api/users';
  import type { User } from '../types/api/users';
  
  export default defineComponent({
    name: 'UserDetailView',
    setup() {
      const route = useRoute();
      const user = ref<User | null>(null);
      const dni = route.params.id as string;
  
      const fetchUserDetails = async () => {
        try {
          const response = await userApi.getUserByDni(dni);
          user.value = response.data.dataValues;
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
  
      onMounted(fetchUserDetails);
  
      return {
        user,
      };
    },
  });
  </script>
  
  <style scoped>
  .user-detail-container {
    max-width: 900px;
    margin: 20px auto;
  }
  
  .user-detail-card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .card-header {
    background-color: #f7f7f7;
    text-align: center;
    padding: 20px;
  }
  
  .user-logo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  
  .card-title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .user-role {
    font-size: 1.1rem;
    color: #888;
  }
  
  .card-body {
    padding: 20px;
  }
  
  .card-body p {
    margin: 10px 0;
    font-size: 1rem;
  }
  
  .card-footer {
    background-color: #f7f7f7;
    padding: 15px;
    text-align: center;
  }
  
  .action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    background-color: #007bff;
    color: white;
    text-decoration: none;
  }
  
  .action-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  .action-button i {
    margin-right: 10px;
  }
  </style>
  