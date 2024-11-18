<script>
import { ref, computed } from 'vue';
import data from "@/assets/orders.json";
import { useRouter } from 'vue-router';

export default {
    name: "OrderList",
    setup() {
        const orders = ref(data.orders);
        const headers = ref(data.headers);
        const isRunning = ref(false);
        const router = useRouter();


        const filteredOrders = computed(() => {
            return orders.value.filter(order => order.Estado !== "entregado" && order.Estado !== "new");
        });

        const virtualOrders = computed(() => {
            return filteredOrders.value.map(order => ({
                Id: order.Id,
                Detalle: order.Detalle,
                Cliente: order.Cliente,
                Total: order.Total,
                Estado: order.Estado
            }));
        });

        const getStatusColor = (estado) => {
            switch (estado) {
                case 'iniciado':
                    return 'text-green-darken-2';
                case 'enviado':
                    return 'text-deep-purple-accent-2';
                case 'entregado':
                    return 'blue--text';
                default:
                    return '';
            }
        };


        const simulateStateChange = () => {
            setTimeout(() => {
                setInterval(() => {
                    orders.value.forEach(order => {
                        if (order.Estado === "new") {
                            order.Estado = "iniciado";
                        } else if (order.Estado === "iniciado") {
                            order.Estado = "enviado";
                        } else if (order.Estado === "enviado") {
                            order.Estado = "entregado";
                        } else if (order.Estado === "entregado") {
                            order.Estado = "new";
                        }
                    });
                }, 4000);
            }, 300);
        };

        const startSimulation = () => {
            if (!isRunning.value) {
                isRunning.value = true;
                simulateStateChange();
            }
        };
        const goToOrderDetail = (id) => {
            router.push(`/${id}`);
        };

        return {
            orders,
            virtualOrders,
            headers,
            startSimulation,
            getStatusColor,
            goToOrderDetail
        };
    }
};
</script>

<template>
    <v-container class="ma-8">
        <v-row class="d-flex">
            <v-sheet class="px-16 py-8">
                <v-btn @click="startSimulation" color="primary" variant="outlined" size="small" class="mb-4">
                    Iniciar Simulación de cambio de estado
                </v-btn>
            </v-sheet>

        </v-row>
        <v-data-table>
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header.key" class="text-left px-16 py-2">{{ header.text }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in virtualOrders" :key="order.Id" @click="goToOrderDetail(order.Id)"
                    style="cursor: pointer;">
                    <td class="text-left px-16 py-2">{{ order.Detalle }}</td>
                    <td class="text-left px16 py-2">{{ order.Cliente }}</td>
                    <td class="text-right px-16 py-2">{{ order.Total }}</td>
                    <td :class="getStatusColor(order.Estado)"
                        class="text-left text-uppercase px-16 py-2 font-weight-bold">{{
                            order.Estado }}</td>
                </tr>
            </tbody>
        </v-data-table>



    </v-container>
</template>
