<template>
  <v-data-table
    :headers="headers"
    :items="transformedItems"
    class="cursor-pointer"
  >
    <template v-slot:item="props">
      <tr
        v-if="props.item.Estado !== 'entregado'"
        @click="handleOderClick(props.item)"
      >
        <td v-for="header in headers" :key="header.key">
          {{ props.item[header.key] }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import data from "@/assets/data.json";

export default {
  name: "OrderList",
  data() {
    return {
      headers: [
        { key: "Id", title: "Id" },
        { key: "Detalle", title: "Detalle" },
        { key: "Cliente", title: "Cliente" },
        { key: "Total", title: "Total ($)" },
        { key: "Estado", title: "Estado" },
      ],
      rawItems: data.orders || [],
    };
  },

  computed: {
    transformedItems() {
      return this.rawItems.map((item) => ({
        Id: item.id,
        Detalle: item.detalle,
        Cliente: item.cliente,
        Total: item.total,
        Estado: item.estado,
      }));
    },
  },
  methods: {
    handleOderClick(item) {
      if (item && item.Id) {
        this.$router.push(`/${item.Id}`);
      }
    },
    changeStateRandomly(index) {
      this.rawItems[index].estado = ["iniciado", "enviado", "entregado"][
        Math.floor(Math.random() * 3)
      ];
    },
  },
  mounted() {
    setInterval(() => {
      this.changeStateRandomly(
        Math.floor(Math.random() * this.rawItems.length)
      );
    }, 1000);
  },
  unmounted() {
    clearInterval();
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
