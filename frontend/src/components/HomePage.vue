<template>
  <div class="home-page">
    <h1>Bienvenido al sistema de Gestión de Restaurantes</h1>
    <div class="content">
      <p>
        Nuestra aplicación te permite gestionar todos los aspectos de tu restaurante de manera eficiente.
        Desde la gestión de inventario hasta la atención al cliente, todo en un solo lugar.
      </p>
      <p>
        Optimiza tus flujos de trabajo y reduce los tiempos de espera con nuestras herramientas integradas.
        Mejora la experiencia de tus clientes y aumenta la productividad de tu equipo.
      </p>
      <p>
        Con nuestra solución, podrás tomar decisiones basadas en datos en tiempo real, lo que te permitirá
        mejorar la rentabilidad de tu negocio.
      </p>
    </div>
    <div class="image-container">
      <img src="@/assets/images/restaurante1.jpg" alt="Restaurante 1" class="responsive-image">
      <img src="@/assets/images/restaurante2.jpg" alt="Restaurante 2" class="responsive-image">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
});
</script>

<style scoped>
.home-page {
  text-align: center;
  padding: 20px;
}

.content {
  margin: 20px 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.image-container {
  display: flex;
  justify-content: center;
  gap: 20px; /* Espacio entre las imágenes */
  flex-wrap: wrap; /* Permite que las imágenes se ajusten en pantallas pequeñas */
}

.responsive-image {
  width: 100%; /* Ajusta el ancho al 100% del contenedor */
  max-width: 400px; /* Tamaño máximo de las imágenes */
  height: auto; /* Mantiene la proporción de la imagen */
  border-radius: 10px; /* Opcional: bordes redondeados */
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .image-container {
    flex-direction: column; /* Apila las imágenes en pantallas pequeñas */
    align-items: center;
  }

  .responsive-image {
    max-width: 100%; /* Ajusta el ancho al 100% en pantallas pequeñas */
  }
}
</style>