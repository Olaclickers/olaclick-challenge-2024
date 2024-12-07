<script setup lang="ts">
import { getOrders, getStatus } from "@/services/Api";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { formatPrice } from "@/utils";

interface Header {
  title: string;
  align?: "start" | "end" | "center";
  sortable?: boolean;
  key: string;
}

interface Product {
  id: number;
  detail: string;
  client: string;
  price: number;
  status_id: number;
}

type Status = {
  id: string | number;
  name: string;
};

const router = useRouter();

const itemsPerPage = ref(10);
const headers = ref<Header[]>([
  {
    title: "ID",
    align: "start",
    sortable: false,
    key: "id",
  },
  { title: "Detalle", key: "detail", align: "start" },
  { title: "Cliente", key: "client", align: "start" },
  { title: "Total ($)", key: "price", align: "start" },
  { title: "Estado", key: "status_id", align: "start" },
  { title: "Actions", key: "actions", align: "center", sortable: false },
]);
const search = ref("");
const serverItems = ref<Product[]>([]);
const loading = ref(true);
const totalItems = ref(0);
const listStatus = ref<Status[]>([]);

const loadItems = async ({
  page,
  itemsPerPage,
  sortBy,
}: {
  page: number;
  itemsPerPage: number;
  sortBy: { key: string; order: string }[];
}) => {
  loading.value = true;

  try {
    const response = await getOrders(page, itemsPerPage);

    if (response.status !== 200) {
      throw new Error("Error al cargar los datos del API");
    }

    const data = await response.data;
    serverItems.value = data;
    totalItems.value = data.length;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loading.value = false;
  }
};

const getStatusItem = (id: string) => {
  return listStatus.value.find((item) => Number(item.id) === Number(id));
};

const fetchStatus = async () => {
  const response = await getStatus();
  listStatus.value = response.data;
};

onMounted(async () => {
  await fetchStatus();
});
</script>

<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    :search="search"
    item-value="name"
    @update:options="loadItems"
  >
    <template v-slot:item.price="{ item }">
      <p>{{ formatPrice(item.price) }}</p>
    </template>
    <template v-slot:item.status_id="{ item }">
      <v-chip
        :prepend-icon="getStatusItem(item.status_id)?.icon"
        variant="elevated"
        class="text-capitalize"
      >
        {{ getStatusItem(item.status_id)?.name }}
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="me-2"
        size="small"
        @click="router.push(`/order/${item.id}`)"
      >
        mdi-eye
      </v-icon>
      <!-- Botones adicionales -->
    </template>
  </v-data-table-server>
</template>
