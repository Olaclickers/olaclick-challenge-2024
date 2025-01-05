import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    'vuetify-nuxt-module',
    '@pinia/nuxt'
  ],
  vuetify: {
    vuetifyOptions: { theme: { defaultTheme: 'light' } },
  },
  typescript: {
    strict: true,
  },
})