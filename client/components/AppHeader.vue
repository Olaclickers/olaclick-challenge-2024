<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      permanent
    >
      <div>
        <v-toolbar flat>
          <v-toolbar-title>Menú</v-toolbar-title>
        </v-toolbar>
      </div>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          link
          :to="item.link"
        >
          <div class="d-flex align-center">
            <v-icon class="me-4">{{ item.icon }}</v-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Mi Aplicación</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const drawer = ref(false);

const menuItems = [
  { title: 'Inicio', icon: 'mdi-home', link: '/' },
  { title: 'Ordenes', icon: 'mdi-information', link: '/orders' },
];
</script>

