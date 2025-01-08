<template>
  <v-container class="d-flex align-center justify-center" style="height: 100vh;">
    <v-card class="pa-5" width="100%" max-width="500">
      <v-card-title class="text-h5 text-center">Iniciar Sesión</v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="formRef">
          <!-- Email -->
          <v-text-field
            v-model="loginData.email"
            label="Correo Electrónico"
            type="email"
            :rules="[rules.required, rules.email]"
            clearable
            outlined
            dense
            :error-messages="errorMessages.email"
          ></v-text-field>
          <!-- Contraseña -->
          <v-text-field
            v-model="loginData.password"
            label="Contraseña"
            type="password"
            :rules="[rules.required]"
            clearable
            outlined
            dense
            :error-messages="errorMessages.password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="primary" :disabled="!valid" @click="handleLogin">Iniciar Sesión</v-btn>
        <v-btn color="secondary" to="/auth/register">Registrarse</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Metadata para usar un layout personalizado
definePageMeta({
  layout: "auth",
});

// Variables reactivas para datos del formulario
const loginData = ref({
  email: "",
  password: "",
});

const errorMessages = ref({
  email: "",
  password: "",
});

// Validación del formulario
const valid = ref(false);
const rules = {
  required: (v: string) => !!v || "Este campo es obligatorio",
  email: (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Debe ser un correo válido",
};

// Router para redirigir después del login
const router = useRouter();

// Manejar envío del formulario
const handleLogin = async () => {
  // Validar formulario manualmente

  try {
    // Aquí puedes hacer una petición al backend para autenticar al usuario
    console.log("Datos enviados:", loginData.value);

    // Simular autenticación exitosa
    alert("Inicio de sesión exitoso");
    router.push("/"); // Cambiar a la ruta que corresponda
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
  }
};
</script>

<style scoped>
/* Estilo opcional */
</style>
