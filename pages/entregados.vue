<template>
    <v-container>
        <v-card class="mb-4 card-elevated">
            <v-card-title class="text-h5">
                Órdenes Entregadas
            </v-card-title>
            <v-card-subtitle class="subtitle">
                Aquí puedes revisar todas las órdenes que ya fueron entregadas.
            </v-card-subtitle>
        </v-card>

        <v-card v-if="loading" class="mb-4 card-elevated">
            <v-card-text>Cargando órdenes entregadas...</v-card-text>
        </v-card>

        <v-data-table v-else :headers="headers" :items="deliveredOrders" item-value="id"
            class="elevation-2 rounded-table" no-data-text="No hay órdenes entregadas. ¡Sigue trabajando duro!">
            <template #item="{ item }">
                <tr @click="navigateToDetail(item)" class="clickable">
                    <td>{{ item.id }}</td>
                    <td>{{ item.detalle }}</td>
                    <td>{{ item.cliente }}</td>
                    <td>${{ item.total }}</td>
                    <td>
                        <v-chip color="green" dark class="chip">
                            Entregado
                        </v-chip>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <v-card-actions>
            <v-btn @click="goBack" text color="primary">Volver</v-btn>
        </v-card-actions>
    </v-container>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/stores/orders';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const orderStore = useOrderStore();
const router = useRouter();
const loading = ref(true);

onMounted(async () => {
    if (!orderStore.orders.length) {
        await orderStore.fetchOrders();
    }
    loading.value = false;
});

const navigateToDetail = (order) => {
    if (order?.id) {
        router.push(`/${order.id}`);
    } else {
        console.error('Error: El ID de la orden no está definido.', order);
    }
};

const goBack = () => {
    router.push("/");
};

const headers = [
    { text: 'ID', value: 'id' },
    { text: 'Detalle', value: 'detalle' },
    { text: 'Cliente', value: 'cliente' },
    { text: 'Total ($)', value: 'total' },
    { text: 'Estado', value: 'estado' },
];

const deliveredOrders = orderStore.deliveredOrders;
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

.rounded-table {
    border-radius: 12px;
    overflow: hidden;
    background-color: var(--v-theme-surface) !important;
    color: var(--v-theme-text) !important;
}

.clickable:hover {
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: background-color 0.3s ease;
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