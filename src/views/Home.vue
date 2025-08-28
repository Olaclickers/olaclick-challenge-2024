<script setup>
import { useRouter } from 'vue-router'
import { VContainer, VRow, VCol, VBtn, VFooter, VSpacer } from 'vuetify/components'
import Background from '../components/Background.vue'

const router = useRouter()

const goToOrders = async () => {
  await router.push('/orders')
}
</script>

<template>
  <VContainer class="home-container">
    <VRow class="welcome-section">
      <Background />
      <h1 class="home-title">¡Bienvenido a OlaClick Challenge!</h1>
      <VBtn class="home-btn" @click="goToOrders">Ver Órdenes</VBtn>
    </VRow>

    <VSpacer />

    <Footer />
  </VContainer>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.welcome-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  z-index: 1;
}

.home-title {
  background-color: rgba(240, 240, 240, 0.781);
  border-radius: 1em;
  padding: 0.39em;
  color: rgb(50, 94, 218);
  font-size: 3.9rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.home-title:hover {
  background-color: rgba(197, 197, 197, 0.925);
  transform: scale(1.05);
  transition:
    transform 0.3s ease,
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.home-btn {
  background-color: rgb(241, 79, 79);
  font-size: 1.2em;
  border-radius: 2em;
  color: white;
  margin-top: 20px;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.home-btn:hover {
  transform: scale(1.1);
  background-color: rgb(185, 46, 46);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>
