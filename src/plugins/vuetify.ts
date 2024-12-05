import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css"; // Asegúrate de que esto esté importado

// Ya no necesitas importar '@mdi/js' si solo usas las fuentes de iconos
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi", // Define "mdi" como el conjunto predeterminado
  },
});

export default vuetify;
