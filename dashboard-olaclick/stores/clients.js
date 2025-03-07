import { defineStore } from "pinia";

export const useClientsStore = defineStore(
  'clients-store',
  {
    state: () => ({
      api: useRuntimeConfig().public.apiURL,
      list: []
    }),
    actions: {
      async getClientsAll(){
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${this.api}/clients`, {headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
          const data = await res.json();
          
          if(data.msg == "Token no válido")  {
            localStorage.removeItem("token")
            window.location.href = "/login"
          }
          if(data.success) this.list = data.data
        } catch (error) {
          console.log("Error get clients ALL", error)
        }
      },
    }
  }
)
