<script setup lang="ts">
import SideBar from "./components/SideBar.vue";
</script>

<template>
  <div id="app">
    <SideBar>
      <router-view />
    </SideBar>
  </div>
</template>
