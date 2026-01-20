<template>
  <div>
    <b-button variant="primary" class="action-button" @click="irARegistro">
      Agregar Cliente
    </b-button>
    <ListClientView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import ListClientView from '../views/ListClientView.vue';


export default defineComponent({
  name: 'Clients',
  components: {
    ListClientView,
  },
  setup() {
    const router = useRouter();

    const irARegistro = () => {
      router.push('/client/register');
    };

    return {
      irARegistro,
    };
  },
});
</script>

<style scoped>
.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  width: auto;
  padding: 0.5rem 1rem;
  white-space: nowrap;
}

.action-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.action-button i {
  margin-right: 10px;
}
</style>