import http from "@/http";

export const useItemService = () => {
  const getItemList = async () => {
    try {
      return await http.get("items");
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

  return {
    getItemList,
  };
};
