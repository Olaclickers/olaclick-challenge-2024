<template>
  <v-data-table :headers="headers" :items="items" class="cursor-pointer">
    <template v-slot:item="props">
      <tr @click="handleOderClick(props.item)">
        <td v-for="header in headers" :key="header.key">
          {{ props.item[header.key] }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { key: "Id", title: "Id" },
        { key: "Detalle", title: "Detalle" },
        { key: "Cliente", title: "Cliente" },
        { key: "Total", title: "Total ($)" },
        { key: "Estado", title: "Estado" },
      ],
      items: [
        {
          Id: 1,
          Detalle: "Pollo a al brasa",
          Cliente: "Juan Perez",
          Total: 120.0,
          Estado: "iniciado",
        },
        {
          Id: 2,
          Detalle: "Pollo a al brasa",
          Cliente: "Juan Perez",
          Total: 120.0,
          Estado: "iniciado",
        },
      ],
    };
  },
  methods: {
    handleOderClick(item) {
      if (item && item.Id) {
        this.$router.push(`/${item.Id}`);
      }
    },
  },
};
</script>

<style scoped>
.cursor-pointer :deep(tbody tr) {
  cursor: pointer;
}

.cursor-pointer :deep(tbody tr:hover) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
