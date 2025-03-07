<template lang="pug">
.dashboard-default
  v-layout
    v-navigation-drawer(v-model='drawer' absolute class="pt-14")
      figure.login-logo.mx-auto.mb-8
        img(src="/logo-aptitud.svg" alt="imagen de logo")
      v-list.menu
        v-list-item(v-for="(menuItem, menuIndex) in menu" @click="getPage(menuItem)")
          v-list-item-title {{ menuItem.title }}
     
    v-app-bar.ps-4(border='b' flat)
      v-app-bar-nav-icon(@click='drawer = !drawer')
      v-app-bar-title {{props.title}}
      .d-flex.align-center
        p(class="mr-4") {{userName}}
        v-btn.text-none.me-2(height='48' icon slim)
          v-avatar(color='surface-light' image="/photo.jpg" size='35')
          v-menu(activator='parent')
            v-list(density='compact')
              //v-list-item(append-icon='mdi-cog-outline' link title='Settings')
              v-list-item(append-icon='mdi-logout' link title='Logout' @click.prevent="logout")
    v-main
      div(class="pa-10 pa-lg-12")
        slot
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const config = useRuntimeConfig();
const router = useRouter()
const drawer = ref(true)
const props = defineProps(['title'])
const userName = ref('')
const menu = ref([
  {
    title: 'Dashboard',
    link: '/',
  },
  {
    title: 'Productos',
    link: '/productos',
  },
  {
    title: 'Pedidos',
    link: '/pedidos',
  },

])

const getPage = (item) => {
  router.push({ path: item.link })
}

onMounted(() => {
  if (!localStorage.getItem('token')) router.push({ path: "/login" })
  getUser()
})

const getUser = async () => {
  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");
  const res = await fetch(`${config.public.apiURL}/user/${uid}`, { headers: { 'Authorization': `Bearer ${token}` } })
  const data = await res.json();
  userName.value = data.data.name
}
const logout = () => {
  localStorage.removeItem("uid")
  localStorage.removeItem("token")
  router.push({ path: "/login" })
}
</script>

<style lang="stylus">
@import '../assets/styles/layouts/dashboard.styl';
</style>
