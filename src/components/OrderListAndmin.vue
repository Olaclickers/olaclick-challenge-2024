<script>
import { ref, computed } from 'vue';
import data from "@/assets/orders.json";
import router from '@/router';

export default {
    name: "OrderList",
    setup() {
        const orders = ref(data.orders);
        const headers = ref(data.headers);
        const virtualOrders = computed(() => orders.value);
        const totalDeliveredCount = ref(0)

        const changeStatus = (order, newStatus) => {
            order.Estado = newStatus;
        };

        const removeOrder = (order) => {
            const index = orders.value.indexOf(order);
            if (index > -1) {
                orders.value.splice(index, 1);
            }
            if (order.Estado === "entregado" && !order.processed) {
                totalDeliveredCount.value++;
                order.processed = true;
            }
        };

        const goToOrderDetail = (id) => {
            router.push(`/${id}`);
        };



        return {
            orders,
            headers,
            virtualOrders,
            changeStatus,
            removeOrder,
            goToOrderDetail,
            totalDeliveredCount

        };
    }
};
</script>

<template>
    <v-container class="ma-8">
        <v-row class="d-flex justify-space-between">
            <v-sheet class="px-16 py-8 text-left">
                <h1>Control de Entregas</h1>
            </v-sheet>
            <v-sheet class="px-16 py-8 text-left">
                <p>Total de órdenes: {{ virtualOrders.length }}</p>
                <p>Total de órdenes entregadas: {{ totalDeliveredCount }}</p>
            </v-sheet>
        </v-row>

        <v-data-table :headers="headers" :items="virtualOrders">
            <template v-slot:item="props">
                <tr style="cursor: pointer;">
                    <td class="text-left px-16 py-2 text-decoration-underline" @click="goToOrderDetail(props.item.Id)">
                        {{
                            props.item.Detalle }}
                    </td>
                    <td class="text-left px-16 py-2">{{ props.item.Cliente }}</td>
                    <td class="text-right px-16 py-2">{{ props.item.Total }}</td>

                    <!-- Estado con botones -->
                    <td class="text-left px-16 py-2">
                        <v-btn v-if="props.item.Estado === 'iniciado'" @click="changeStatus(props.item, 'enviado')"
                            color="yellow" size="small">Iniciado</v-btn>
                        <v-btn v-if="props.item.Estado === 'enviado'" @click="removeOrder(props.item)" color="green"
                            size="small">Enviado</v-btn>

                    </td>
                </tr>

            </template>
        </v-data-table>
    </v-container>
</template>