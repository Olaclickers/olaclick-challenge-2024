import 'vuetify/styles'; 
import { createVuetify } from 'vuetify';

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
        },
      },
      dark: {
        colors: {
          primary: '#2196F3',
          secondary: '#757575',
        },
      },
    },
  },
});
