<script setup lang="ts"></script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="blue-accent-3">
      <v-app-bar-title>
        <v-img
          src="https://olaclick.com/wp-content/uploads/2023/08/logo-blanco-olaclick-header.webp"
          alt="Logo"
          :width="200"
          aspect-ratio="16/9"
          cover
        />
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <router-view v-slot="{ Component }">
        <v-fade-transition appear>
          <v-container>
            <component :is="Component" />
          </v-container>
        </v-fade-transition>
      </router-view>
    </v-main>
  </v-layout>
</template>
