<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const changeRoute = (route: string) => {
  router.push(route);
};
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail class="bg-purple-darken-4">
        <v-list-item
          prepend-avatar="https://avatars.githubusercontent.com/u/56892416?v=4"
          title="Amadeo Flores"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list
          density="compact"
          nav
          class="d-flex flex-column h-auto justify-start aling-center"
        >
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Home"
            value="home"
            @click="changeRoute('/')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-receipt-text"
            title="Ordenes"
            value="orders"
            @click="changeRoute('/orders')"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="h-screen w-screen pa-16 bg-deep-purple-lighten-5">
        <container class="pa-4" fluid width="100%">
          <router-view />
        </container>
      </v-main>
    </v-layout>
  </v-card>
</template>
