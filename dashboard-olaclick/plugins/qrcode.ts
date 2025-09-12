import { QrcodeStream } from "vue-qrcode-reader";
export default defineNuxtPlugin(({vueApp}) =>{
  vueApp.component('qrcode-stream', QrcodeStream)
})
