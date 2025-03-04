<template>
    <div v-if="visible" class="toast-notification" :class="type">
      <span>{{ message }}</span>
      <button @click="closeToast">×</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'ToastNotification',
    props: {
      message: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'info', // Puede ser 'info', 'success', 'error', etc.
      },
      duration: {
        type: Number,
        default: 3000, // Duración en milisegundos
      },
    },
    setup(props) {
      const visible = ref(true);
  
      const closeToast = () => {
        visible.value = false;
      };
  
      // Cierra automáticamente el toast después de la duración especificada
      setTimeout(() => {
        visible.value = false;
      }, props.duration);
  
      return {
        visible,
        closeToast,
      };
    },
  });
  </script>
  
  <style scoped>
  .toast-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .toast-notification.success {
    background-color: #4caf50;
  }
  
  .toast-notification.error {
    background-color: #f44336;
  }
  
  .toast-notification button {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    margin-left: 10px;
  }
  </style>