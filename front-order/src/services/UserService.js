
import http from "@/http";

export const useUserService = () => {
  const getUserList = async () => {
    try {
      return await http.get("users");
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

  return {
    getUserList,
  };
};
