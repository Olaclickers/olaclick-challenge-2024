import { defineStore } from 'pinia';

interface OrderItem {
  id: number;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  id: number;
  detail: string;
  client: string;
  total: number;
  state: string;
  items: OrderItem[];
}

export const useOrderStore = defineStore('orderStore', {
  state: () => ({
    orders: JSON.parse(localStorage.getItem('orders') || '[]') as Order[], // Recupera do Local Storage // Retrieves from Local Storage
    nextId: JSON.parse(localStorage.getItem('nextId') || '1'), // Recupera próximo ID //Retrieves next ID
  }),

  actions: {
    addOrder(order: Omit<Order, 'id' | 'total'>) {
      const items = order.items.map((item, index) => ({
        id: Date.now() + index,
        name: item.name,
        description: item.description || '',
        quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 0,
        unitPrice: Number(item.unitPrice) > 0 ? Number(item.unitPrice) : 0,
      }));

      const total = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

      const newOrder = {
        id: this.nextId++,
        client: order.client,
        detail: order.detail,
        items,
        total,
        state: order.state,
      };

      this.orders.push(newOrder);
      this.saveToLocalStorage(); // Salva no Local Storage //Saves to Local Storage
    },

    removeOrder(id: number) {
      this.orders = this.orders.filter(order => order.id !== id);
      this.saveToLocalStorage(); // Atualiza o Local Storage // Updates Local Storage
    },

    changeState(id: number, newState: string) {
      const order = this.orders.find(order => order.id === id);
      if (order) {
        order.state = newState;
        this.saveToLocalStorage(); // Salva mudanças no estado // Saves state changes
      }
    },

    saveToLocalStorage() {
      localStorage.setItem('orders', JSON.stringify(this.orders, null, 2)); // Formata JSON // Formats JSON
      localStorage.setItem('nextId', JSON.stringify(this.nextId));
    }
  }
});