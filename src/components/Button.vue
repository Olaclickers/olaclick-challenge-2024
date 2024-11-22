<script setup>
import { useRouter } from 'vue-router'
import { VIcon, VBtn } from 'vuetify/lib/components/index.mjs'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <v-btn icon @click="goBack" class="back-button">
    <VIcon>mdi-arrow-left</VIcon>
  </v-btn>
</template>

<style scoped>
.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
  background-color: #0077b6;
  color: white;
  border-radius: 50%;
  padding: 10px;
}

.back-button:hover {
  background-color: #005f8b;
  transform: scale(1.05);
}
</style>
