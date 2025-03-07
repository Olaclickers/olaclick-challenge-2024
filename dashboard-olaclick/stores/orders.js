import { defineStore } from "pinia";

export const useOrdersStore = defineStore(
  'orders-store',
  {
    state: () => ({
      api: useRuntimeConfig().public.apiURL,
      list: []
    }),
    actions: {
      async getOrdersAll(){
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${this.api}/orders`, {headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
          const data = await res.json();
          
          if(data.msg == "Token no válido")  {
            localStorage.removeItem("token")
            window.location.href = "/login"
          }
          if(data.success) this.list = data.data
        } catch (error) {
          console.log("Error get orders ALL", error)
        }
      },
      async getOrdersSearch(name){
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${this.api}/orders?name=${name}`, {headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
          const data = await res.json();
          if(data.success) this.list = data.data
        } catch (error) {
          console.log("Error get orders", error)
        }
      },
      async getOrdersPage(page){
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${this.api}/orders?page=${page}`, {headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
          const data = await res.json();
          if(data.success) this.list = data.data
        } catch (error) {
          console.log("Error get orders", error)
        }
      },
      async getOrdersLimit(limit){
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${this.api}/orders?limit=${limit}`, {headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
          const data = await res.json();
          if(data.success) this.list = data.data
        } catch (error) {
          console.log("Error get orders", error)
        }
      },
      async getOrder(serie){
        return new Promise(async(resolve, reject) => {
          try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${this.api}/orders/${serie}`, {headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
            const data = await res.json();
            if(data.success) resolve(data.data)
          } catch (error) {
            reject(error)
            console.log("Error get orders", error)
          }
        })
      },
    }
  }
)
