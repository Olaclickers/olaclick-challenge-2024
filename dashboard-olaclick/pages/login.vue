<template lang="pug">
NuxtLayout(name="blank")
  .login
    v-container
      .login-content.mx-auto
        v-card(class="px-4 py-8")
          v-card-text
            figure.login-logo.mx-auto.mb-8.text-center
              img(src="/logo-aptitud.svg" alt="imagen de logo")
            v-form(ref="refForm")
              v-text-field(v-model="txtUser" prepend-inner-icon="mdi-account" name="login" label="Usuario" type="text" :rules="rulesUser" required)
              v-text-field(v-model="txtPass" id="password" prepend-inner-icon="mdi-lock" name="password" label="Password" type="password" :rules="rulesPass" required)
              v-checkbox(color="deep-purple-darken-2" label="Recuerdame" v-model="cbxRemenber" @change="changeRemenber($event)")
          v-card-actions.mt-4
            v-btn.mx-auto.px-6.font-weight-bold(variant="flat" size="large" color="blue-darken-3" @click="sendLogin") Ingresar

</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router";
const config = useRuntimeConfig();
const router = useRouter()
const txtUser = ref('')
const txtPass = ref('')
const refForm = ref('')
const cbxRemenber = ref('')
const rulesUser = [
  v => !!v || 'Usuario es requerido'
]
const rulesPass = [
  v => !!v || 'Contraseña es requerido'
]

useSeoMeta({
  title: "Login"
})


const apiLogin = async () => {
  const datos = {
    email: txtUser.value,
    password: txtPass.value
  }

  const res = await fetch(`${config.public.apiURL}/login`, { method: 'POST', body: JSON.stringify(datos), headers: { 'Content-Type': 'application/json' } })
  const data = await res.json();
  if (data.success) {
    localStorage.setItem("token", data.data.token)
    localStorage.setItem("uid", data.data.data._id)
    router.push({ path: "/" })
  } else {
    alert("No ingreso bien las creedenciales")
  }

}

const changeRemenber = () => {
  if (cbxRemenber.value) {
    if (txtUser.value === "" || txtPass.value === "") {
      alert("Coloque el usuario y contraseña")
      cbxRemenber.value = false;
    }
    else {
      localStorage.setItem("login_user", txtUser.value)
      localStorage.setItem("login_pass", txtPass.value)
    }

  } else {
    if (localStorage.getItem("login_user")) localStorage.removeItem("login_user")
    if (localStorage.getItem("login_pass")) localStorage.removeItem("login_pass")
  }
}

const sendLogin = async () => {
  const { valid } = await refForm.value?.validate();
  if (valid) apiLogin()
}

onMounted(() => {
  if (!localStorage.getItem('token')) {
    if (localStorage.getItem("login_user")) txtUser.value = localStorage.getItem("login_user")
    if (localStorage.getItem("login_pass")) txtPass.value = localStorage.getItem("login_pass")
    if (localStorage.getItem("login_user") || localStorage.getItem("login_pass")) cbxRemenber.value = true
  } else { router.push({ path: "/" }) }

})

</script>

<style lang="stylus">
@import '../assets/styles/pages/login.styl';
</style>
