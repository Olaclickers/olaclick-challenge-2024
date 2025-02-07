import Vue from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css'; 
import ToastService from 'primevue/toastservice';


Vue.config.productionTip = false
Vue.use(ToastService);
Vue.use(PrimeVue);

new Vue({
  render: h => h(App),
}).$mount('#app')