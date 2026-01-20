import orders from '../data/orders.json'
import products from '../data/products.json'

const processOrders = (ordersToProcess) => {
  return ordersToProcess.map((order) => {
    const updatedDetail = order.detail.map((item) => {
      const product = products.find((product) => product.id === item.productId)

      if (product) {
        return {
          ...item,
          price: product.price,
          total: product.price * item.quantity,
          title: product.title,
        }
      } else {
        return {
          ...item,
          title: 'Producto no encontrado',
        }
      }
    })

    const total = updatedDetail.reduce((sum, item) => sum + item.total, 0);

    return {
      ...order,
      detail: updatedDetail.map((item) => item.title).join(' + '),
      total,
      updatedDetail,
    }
  })
}

export const fetchOrders = async () => {
  const filteredOrders = orders.filter((order) => order.status !== 'entregado')
  return processOrders(filteredOrders)
}

export const fetchOrderById = async (id) => {
  const orders = await fetchOrders()
  return orders.find((order) => order.id === Number(id)) || null
}

export const fetchDeliveredOrders = async () => {
  const deliveredOrders = orders.filter((order) => order.status === 'entregado')
  return processOrders(deliveredOrders)
}
