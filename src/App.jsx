import { RouterView } from 'vue-router'
import { VApp, VMain } from 'vuetify/components'
import Footer from './components/footer.vue'

export default function App() {
  return (
    <VApp>
      <VMain>
        <RouterView />
        <Footer/>
      </VMain>
    </VApp>
  )
}
