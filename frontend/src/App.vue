<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from './components/Navbar.vue';


export default defineComponent({
  name: 'App',
  components: {
    Navbar,
  },
});
</script>

<template>
<div>
    <Navbar />
    <router-view />
  </div>
</template>


<style scoped>
</style>

