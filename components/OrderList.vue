<template>
    <v-container>
        <v-card class="mb-4 card-elevated">
            <v-card-title class="text-h5">Órdenes Activas</v-card-title>
            <v-card-subtitle class="subtitle">
                Gestiona tus órdenes de manera eficiente
            </v-card-subtitle>
        </v-card>

        <v-btn @click="goToDeliveredOrders" color="primary" class="mb-4">
            Ver Pedidos Entregados
        </v-btn>

        <v-row>
            <v-col cols="8">
                <v-text-field v-model="searchQuery" label="Buscar órdenes" class="mb-4 text-field"></v-text-field>
            </v-col>
            <v-col cols="4">
                <v-select v-model="selectedState" :items="states" label="Filtrar por estado"
                    class="mb-4 select"></v-select>
            </v-col>
        </v-row>

        <v-data-table :headers="headers" :items="filteredOrders" item-value="id" class="elevation-1 rounded-table"
            :items-per-page="5" :items-per-page-options="[5, 10, 20, 50, 100]" items-per-page-text="Filas por página"
            :loading="loading" loading-text="Cargando órdenes..."
            no-data-text="No hay órdenes disponibles. ¡Agrega una nueva orden!">
            <template #item="{ item }">
                <tr @click="navigateToDetail(item)" class="clickable">
                    <td>{{ item.id }}</td>
                    <td>{{ item.detalle }}</td>
                    <td>{{ item.cliente }}</td>
                    <td>${{ item.total }}</td>
                    <td>
                        <v-chip :color="getStatusColor(item.estado)" dark class="chip">
                            {{ item.estado }}
                        </v-chip>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-container>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, computed, ref } from "vue";
import { useOrderStore } from "@/stores/orders";
import { Order } from "@/types/order";

const router = useRouter();
const orderStore = useOrderStore();

const searchQuery = ref("");
const selectedState = ref("Todos");
const states = ["Todos", "Iniciado", "Enviado", "Entregado"];
const loading = ref(true);

onMounted(async () => {
    loading.value = true;
    await orderStore.fetchOrders();
    loading.value = false;
});

const filteredOrders = computed<Order[]>(() =>
    orderStore.activeOrders.filter((order) => {
        const matchesSearch = order?.detalle
            ?.toLowerCase()
            .includes(searchQuery.value.toLowerCase());
        const matchesState =
            selectedState.value === "Todos" ||
            order.estado.toLowerCase() === selectedState.value.toLowerCase();
        return matchesSearch && matchesState;
    })
);

const headers = [
    { text: "ID", value: "id" },
    { text: "Detalle", value: "detalle" },
    { text: "Cliente", value: "cliente" },
    { text: "Total ($)", value: "total" },
    { text: "Estado", value: "estado" },
];

const navigateToDetail = (order) => {
    if (order?.id) {
        router.push(`/${order.id}`);
    } else {
        console.error("Error: El ID de la orden no está definido.", order);
    }
};

// Navegar a la Lista de Pedidos Entregados
const goToDeliveredOrders = () => {
    router.push("/entregados");
};

const getStatusColor = (estado) => {
    switch (estado.toLowerCase()) {
        case "iniciado":
            return "blue";
        case "enviado":
            return "orange";
        case "entregado":
            return "green";
        default:
            return "gray";
    }
};
</script>


<style scoped>
.card-elevated {
    border-radius: 12px;
    background-color: var(--v-theme-surface) !important;
    color: var(--v-theme-text) !important;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--card-border-color, rgba(255, 255, 255, 0.1));
}

.subtitle {
    color: var(--v-theme-secondary-text) !important;
    font-size: 14px;
}

.mb-4 {
    margin-bottom: 16px !important;
}

.v-btn {
    text-transform: none !important;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    padding: 10px 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.v-data-table {
    background-color: var(--v-theme-surface) !important;
    color: var(--v-theme-text) !important;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.clickable:hover {
    background-color: rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.text-field {
    background-color: var(--v-theme-inputBackground) !important;
    color: var(--v-theme-text) !important;
    border-radius: 8px;
}

.select {
    background-color: var(--v-theme-inputBackground) !important;
    color: var(--v-theme-text) !important;
    border-radius: 8px;
}

.chip {
    font-weight: 500;
    font-size: 14px;
    border-radius: 16px;
    text-transform: capitalize;
}

.v-data-table .v-data-table__empty-wrapper {
    font-size: 16px;
    color: var(--v-theme-secondary-text);
    text-align: center;
    padding: 16px;
    background-color: var(--v-theme-surface);
}

.v-card-text {
    font-size: 16px;
    color: var(--v-theme-secondary-text);
}
</style>
