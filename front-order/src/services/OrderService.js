import http from "@/http";

export const useOrderService = () => {
  const getOrderList = async () => {
    try {
      return await http.get("orders");
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

  const sendOrder = async (order) => {
    try {
      return await http.post("orders", order);
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }; 

  const destroyOrder = async (id) => {
    try {
      return await http.delete(`orders/${id}`);
    } catch (error) {
      console.error('Error al eliminar la orden:', error);
      throw error;
    }
  }

  const sendDelivery = async (id) => {
    try {
      return await http.put(`orders/${id}/delivered`);
    } catch (error) {
      console.error('Error al marcar la orden como entregada:', error);
      throw error;
    }
  }

  return {
    getOrderList,
    sendDelivery,
    destroyOrder,
    sendOrder,
  };
};
