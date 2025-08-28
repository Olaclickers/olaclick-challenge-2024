<template>
  <div class="background-overlay"></div>
</template>

<style scoped>
.background-overlay {
  background-image: url('https://media-cdn.tripadvisor.com/media/photo-s/15/c3/27/68/lai.jpg');
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter: blur(4px);
  opacity: 0.8;
  z-index: -1;
}
</style>
