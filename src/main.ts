import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './router';

const vuetify = createVuetify();
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.mount('#app');
