<template>
  <v-container class="d-flex align-center justify-center" style="height: 100vh;">
    <v-card class="pa-5" width="100%" max-width="500">
      <v-card-title class="text-h5 text-center">Crear Cuenta</v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="formRef">
          <!-- Nombre -->
          <v-text-field
            v-model="registerData.name"
            label="Nombre Completo"
            :rules="[rules.required]"
            clearable
            outlined
            dense
            :error-messages="errorMessages.name"
          ></v-text-field>

          <!-- Correo Electrónico -->
          <v-text-field
            v-model="registerData.email"
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
            v-model="registerData.password"
            label="Contraseña"
            type="password"
            :rules="[rules.required, rules.password]"
            clearable
            outlined
            dense
            :error-messages="errorMessages.password"
          ></v-text-field>

          <!-- Confirmar Contraseña -->
          <v-text-field
            v-model="registerData.confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            :rules="[rules.required, rules.matchPassword]"
            clearable
            outlined
            dense
            :error-messages="errorMessages.confirmPassword"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn  color="primary" :disabled="!valid" @click="handleRegister">
          Registrarse
        </v-btn>
        <v-btn  color="secondary" to="/auth/login">
          Iniciar Sesión
        </v-btn>
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

// Datos del formulario
const registerData = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const errorMessages = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

// Validación del formulario
const valid = ref(false);
const rules = {
  required: (v: string) => !!v || "Este campo es obligatorio",
  email: (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Debe ser un correo válido",
  password: (v: string) =>
    v.length >= 6 || "La contraseña debe tener al menos 6 caracteres",
  matchPassword: (v: string) =>
    v === registerData.value.password || "Las contraseñas no coinciden",
};

// Router para redirigir después del registro
const router = useRouter();

// Manejar el envío del formulario
const handleRegister = async () => {
  try {
    // Aquí puedes realizar la petición al backend para registrar al usuario
    console.log("Datos enviados:", registerData.value);

    // Simular un registro exitoso
    alert("Registro exitoso");
    router.push("/login"); // Redirigir a la página de login o dashboard
  } catch (error) {
    console.error("Error durante el registro:", error);
  }
};
</script>

<style scoped>
/* Estilo opcional */
</style>
