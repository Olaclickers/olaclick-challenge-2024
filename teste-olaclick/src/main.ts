

import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia';
import router from './router';
import 'vuetify/styles';



// ✅ Vuetify config

const vuetify = createVuetify({
  components,
  directives,
})


const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(createPinia());
app.mount('#app');
