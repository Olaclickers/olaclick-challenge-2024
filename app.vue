<template>
  <NuxtLayout>
    <v-app>
      <v-app-bar class="header-container" app :color="headerColor" dark flat>
        <v-toolbar-title>Gestión de Órdenes</v-toolbar-title>

        <v-chip class="theme-chip" outlined @click="toggleTheme">
          <v-icon left>{{ themeIcon }}</v-icon>
          {{ themeLabel }}
        </v-chip>
      </v-app-bar>

      <v-main>
        <NuxtPage />
      </v-main>

      <v-footer app :color="footerColor" dark>
        <span>&copy; {{ new Date().getFullYear() }} OlaClick Test - Guido Naselli</span>
      </v-footer>
    </v-app>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useNuxtApp } from '#app';

const { $vuetify } = useNuxtApp();

const currentTheme = ref($vuetify.theme.global.name.value);

const themeLabel = computed(() =>
  currentTheme.value === 'light' ? 'Modo Oscuro' : 'Modo Claro'
);

const themeIcon = computed(() =>
  currentTheme.value === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny'
);

const headerColor = computed(() =>
  currentTheme.value === 'light' ? 'primary' : 'surface'
);

const footerColor = computed(() =>
  currentTheme.value === 'light' ? 'grey lighten-2' : 'surface'
);

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
  $vuetify.theme.global.name.value = currentTheme.value;
};
</script>

<style scoped>
.header-container{
  display: flex;
  justify-content: space-between;
}

.theme-chip {
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  background-color: var(--v-theme-surface);
  color: var(--v-theme-text);
  margin: 1rem
}

.theme-chip:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.v-data-table {
  background-color: var(--v-theme-surface) !important;
  color: var(--v-theme-text) !important;
}

.v-input {
  background-color: var(--v-theme-inputBackground) !important;
  color: var(--v-theme-text) !important;
}

.v-chip {
  background-color: var(--v-theme-surface) !important;
  color: var(--v-theme-text) !important;
}
</style>
