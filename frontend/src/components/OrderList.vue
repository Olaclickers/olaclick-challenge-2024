<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-h4 mb-4">Restaurant Orders</h2>
        
        <v-btn 
          color="primary" 
          @click="showCreateOrderModal = true"
        >
          Create New Order
        </v-btn>

        <v-data-table
          :headers="headers"
          :items="orders"
          :loading="isLoading"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn 
              icon 
              @click="viewOrder(item.id)"
            >
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn 
              icon 
              @click="deleteOrder(item.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>

        <v-dialog v-model="showOrderDetailsModal" max-width="500px">
          <v-card v-if="selectedOrder">
            <v-card-title>Order Details</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <strong>Order ID:</strong>
                  <p>{{ selectedOrder.id }}</p>
                </v-col>
                <v-col cols="6">
                  <strong>Customer Name:</strong>
                  <p>{{ selectedOrder.customerName }}</p>
                </v-col>
                <v-col cols="6">
                  <strong>Total Price:</strong>
                  <p>${{ selectedOrder.totalPrice.toFixed(2) }}</p>
                </v-col>
                <v-col cols="6">
                  <strong>Status:</strong>
                  <p>{{ selectedOrder.status }}</p>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="closeOrderDetailsModal">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="showCreateOrderModal" max-width="500px">
          <v-card>
            <v-card-title>Create New Order</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="createOrder">
                <v-text-field
                  v-model="newOrder.customerName"
                  label="Customer Name"
                  required
                ></v-text-field>
                
                <v-text-field
                  v-model="newOrder.details"
                  label="Order Details"
                  required
                ></v-text-field>
                
                <v-text-field
                  v-model="newOrder.totalPrice"
                  label="Total Price"
                  type="number"
                  required
                ></v-text-field>
                
                <v-select
                  v-model="newOrder.status"
                  :items="['initiated', 'sent', 'delivered']"
                  label="Status"
                  required
                ></v-select>
                
                <v-card-actions>
                  <v-btn type="submit" color="primary">Create</v-btn>
                  <v-btn @click="showCreateOrderModal = false">Cancel</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { OrderService } from '../services/orderService'
import { Order } from '../order'

const orders = ref<Order[]>([])
const isLoading = ref(false)
const showCreateOrderModal = ref(false)
const showOrderDetailsModal = ref(false)
const selectedOrder = ref<Order | null>(null)
const newOrder = ref<Partial<Order>>({
  customerName: '',
  details: '',
  totalPrice: 0,
  status: 'initiated'
})

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Customer', key: 'customerName' },
  { title: 'Total Price', key: 'totalPrice' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
]

onMounted(async () => {
  try {
    isLoading.value = true
    orders.value = await OrderService.getOrders()
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  } finally {
    isLoading.value = false
  }
})

const createOrder = async () => {
  try {
    if (!newOrder.value.customerName || !newOrder.value.details || !newOrder.value.totalPrice) {
      alert('Please fill in all required fields')
      return
    }

    const createdOrder = await OrderService.createOrder(newOrder.value as Order)
    orders.value.push(createdOrder)
    showCreateOrderModal.value = false
    newOrder.value = {
      customerName: '',
      details: '',
      totalPrice: 0,
      status: 'initiated'
    }
  } catch (error) {
    console.error('Failed to create order:', error)
    alert('Failed to create order. Please try again.')
  }
}

const viewOrder = (id: number) => {
  selectedOrder.value = orders.value.find(order => order.id === id) || null
  showOrderDetailsModal.value = true
}

const deleteOrder = async (id: number) => {
  try {
    await OrderService.deleteOrder(id)
    orders.value = orders.value.filter(order => order.id !== id)
  } catch (error) {
    console.error('Failed to delete order:', error)
  }
}

const closeOrderDetailsModal = () => {
  showOrderDetailsModal.value = false
  selectedOrder.value = null
}
</script>