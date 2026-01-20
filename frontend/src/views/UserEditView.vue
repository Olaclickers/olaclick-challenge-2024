<template>
  <div class="edit-view p-4">
    <h2>Editar Usuario</h2>
    <b-form @submit.prevent="guardarCambios">
      <b-form-group label="Nombre" label-for="nombre">
        <b-form-input id="nombre" v-model="usuario.nombre" required></b-form-input>
      </b-form-group>
      <b-form-group label="Email" label-for="email">
        <b-form-input id="email" v-model="usuario.email" type="email" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Guardar Cambios</b-button>
      <b-button variant="secondary" @click="cancelarEdicion" class="ml-2">Cancelar</b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '../api/users'

export default defineComponent({
  name: 'UserEditView',
  setup() {
    const router = useRouter()
    const route = useRoute()

    const usuario = ref({
      id: '',
      nombre: '',
      email: '',
      rol: '',
    })

    const roles = ref(['Administrador', 'Usuario'])

    const id = route.params.id as string

    onMounted(async () => {
      try {
        const response = await api.getUserByDni(id)
        const user = response.data.dataValues
        if (user) {
          usuario.value = {
            id: response.data.dataValues.id,
            nombre: `${response.data.dataValues.first_name} ${response.data.dataValues.last_name}`,
            email: response.data.dataValues.email,
            rol: response.data.dataValues.role_id,
          }
          console.log(66, usuario)
        } else {
          alert('Usuario no encontrado')
          router.push('/users')
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error)
        alert('Error al obtener los datos del usuario')
      }
    })

    const guardarCambios = async () => {
      try {
        const userToUpdate = {
          first_name: usuario.value.nombre.split(' ')[0],
          last_name: usuario.value.nombre.split(' ')[1],
          email: usuario.value.email,
          role_id: usuario.value.rol,
        }
        await api.updateUser(id, userToUpdate)
        alert(`Usuario actualizado: ${usuario.value.nombre}`)
        router.push('/users')
      } catch (error) {
        alert('Error al actualizar el usuario')
      }
    }

    const cancelarEdicion = () => {
      router.push('/users')
    }

    return {
      usuario,
      roles,
      guardarCambios,
      cancelarEdicion,
    }
  },
})
</script>

<style scoped>
.edit-view {
  max-width: 500px;
  margin: 0 auto;
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>
