const OrderClient = require('./order-client');

async function main() {
  const client = new OrderClient({
    baseURL: 'http://localhost:3000/orders'
  });

  try {
    // First, get and remove all existing orders
    const existingOrders = await client.getOrders();
    console.log('Existing Orders:', existingOrders);

    // Remove existing orders (if the backend supports bulk delete)
    for (const order of existingOrders) {
      await client.updateOrderStatus(order.id, 'delivered');
    }

    // Create a list of new orders with orderItems
    const ordersToCreate = [
      {
        customerName: 'John Doe',
        totalPrice: 29.99,
        status: 'initiated',
        details: 'Lunch order',
        orderItems: [
          { name: 'Burger', quantity: 1, price: 15.99 },
          { name: 'Fries', quantity: 1, price: 7.00 },
          { name: 'Soda', quantity: 1, price: 6.00 }
        ]
      },
      {
        customerName: 'Jane Smith',
        totalPrice: 45.50,
        status: 'sent',
        details: 'Dinner delivery',
        orderItems: [
          { name: 'Pasta', quantity: 1, price: 25.50 },
          { name: 'Salad', quantity: 1, price: 10.00 },
          { name: 'Dessert', quantity: 1, price: 10.00 }
        ]
      },
      {
        customerName: 'Mike Johnson',
        totalPrice: 15.75,
        status: 'initiated',
        details: 'Breakfast takeout',
        orderItems: [
          { name: 'Pancakes', quantity: 1, price: 12.75 },
          { name: 'Coffee', quantity: 1, price: 3.00 }
        ]
      }
    ];

    // Create new orders
    const createdOrders = [];
    for (const orderData of ordersToCreate) {
      const newOrder = await client.createOrder(orderData);
      createdOrders.push(newOrder);
    }

    // Fetch and display all current orders
    const currentOrders = await client.getOrders();
    console.log('\nCurrent Active Orders:');
    currentOrders.forEach((order, index) => {
      console.log(`Order ${index + 1}:`, {
        id: order.id,
        customerName: order.customerName,
        totalPrice: order.totalPrice,
        status: order.status,
        details: order.details,
        orderItems: order.orderItems
      });
    });

  } catch (error) {
    console.error('Error in main process:', error);
  }
}

main();