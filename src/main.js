import '@mdi/font/css/materialdesignicons.css'
import './assets/main.css'
import { createApp } from 'vue'
import App from './App'
import router from './router'
import vuetify from './styles/vuetify'

const app = createApp(App)

app.use(router)
app.use(vuetify);

app.mount('#app')
