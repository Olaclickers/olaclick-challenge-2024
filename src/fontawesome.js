import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Íconos sólidos
import { far } from '@fortawesome/free-regular-svg-icons'; // Íconos regulares
import { fab } from '@fortawesome/free-brands-svg-icons'; // Íconos de marcas

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Agregar íconos a la biblioteca
library.add(fas, far, fab);

export default FontAwesomeIcon;
