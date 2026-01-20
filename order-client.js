const axios = require('axios');

class OrderClient {
  /**
   * Create a new OrderClient instance
   * @param {Object} config - Configuration options
   * @param {string} [config.baseURL='http://localhost:3000/orders'] - Base URL for the API
   */
  constructor(config = {}) {
    this.baseURL = config.baseURL || 'http://localhost:3000/orders';
    this.client = axios.create({ baseURL: this.baseURL });
  }

  /**
   * Create a new order
   * @param {Object} order - Order details
   * @param {string} order.customerName - Customer's name
   * @param {number} order.totalPrice - Total price of the order
   * @param {string} [order.status='initiated'] - Order status
   * @param {string} [order.details] - Additional order details
   * @param {Array<{name: string, quantity: number, price: number}>} [order.orderItems=[]] - List of order items
   * @returns {Promise<Object>} Created order
   */
  async createOrder(order) {
    try {
      const response = await this.client.post('/', {
        customerName: order.customerName,
        totalPrice: order.totalPrice,
        status: order.status || 'initiated',
        details: order.details,
        orderItems: order.orderItems || []
      });
      return response.data;
    } catch (error) {
      this._handleError(error, 'Create Order');
    }
  }

  /**
   * Get all active orders (non-delivered)
   * @returns {Promise<Array>} List of active orders
   */
  async getOrders() {
    try {
      const response = await this.client.get('/');
      return response.data;
    } catch (error) {
      this._handleError(error, 'Get Orders');
    }
  }

  /**
   * Get a specific order by ID
   * @param {number} id - Order ID
   * @returns {Promise<Object>} Order details
   */
  async getOrderById(id) {
    try {
      const response = await this.client.get(`/${id}`);
      return response.data;
    } catch (error) {
      this._handleError(error, 'Get Order by ID');
    }
  }

  /**
   * Update an existing order
   * @param {number} id - Order ID
   * @param {Object} updates - Order update details
   * @returns {Promise<Object>} Updated order
   */
  async updateOrder(id, updates) {
    try {
      const response = await this.client.patch(`/${id}`, updates);
      return response.data;
    } catch (error) {
      this._handleError(error, 'Update Order');
    }
  }

  /**
   * Update order status
   * @param {number} id - Order ID
   * @param {string} status - New order status ('initiated', 'sent', 'delivered')
   * @returns {Promise<Object>} Updated order
   */
  async updateOrderStatus(id, status) {
    try {
      const response = await this.client.patch(`/${id}/status`, { status });
      return response.data;
    } catch (error) {
      this._handleError(error, 'Update Order Status');
    }
  }

  /**
   * Internal error handling method
   * @param {Error} error - Axios error object
   * @param {string} context - Context of the error
   * @private
   */
  _handleError(error, context) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error(`${context} Error:`, error.response.data);
      throw new Error(`${context} failed: ${error.response.data.message || 'Unknown error'}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error(`${context} Error: No response received`);
      throw new Error(`${context} failed: Network error`);
    } else {
      // Something happened in setting up the request
      console.error(`${context} Error:`, error.message);
      throw error;
    }
  }

  /**
   * Example usage method
   * @returns {Promise<void>}
   */
  async exampleUsage() {
    try {
      // Create an order with order items
      const newOrder = await this.createOrder({
        customerName: 'John Doe',
        totalPrice: 29.99,
        status: 'initiated',
        orderItems: [
          { name: 'Pizza', quantity: 1, price: 15.99 },
          { name: 'Soda', quantity: 2, price: 7.00 }
        ]
      });
      console.log('New Order:', newOrder);

      // Get all orders
      const orders = await this.getOrders();
      console.log('Active Orders:', orders);

      // Update order status
      if (newOrder.id) {
        const updatedOrder = await this.updateOrderStatus(newOrder.id, 'sent');
        console.log('Updated Order:', updatedOrder);
      }
    } catch (error) {
      console.error('Example usage error:', error);
    }
  }
}

// Export the client for use in Node.js environments
module.exports = OrderClient;

// If run directly, demonstrate usage
if (require.main === module) {
  const client = new OrderClient();
  client.exampleUsage();
}