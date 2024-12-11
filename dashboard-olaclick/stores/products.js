import { defineStore } from "pinia";

export const useProductsStore = defineStore(
  'products-store',
  {
    state: () => ({
      api: useRuntimeConfig().public.apiURL,
      list: []
    }),
    actions: {
      async getProductsAll(){
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${this.api}/products`, {headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
          const data = await res.json();
          
          if(data.msg == "Token no válido")  {
            localStorage.removeItem("token")
            window.location.href = "/login"
          }
          if(data.success) this.list = data.data
        } catch (error) {
          console.log("Error get products ALL", error)
        }
      },
      async getProductsSearch(name){
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${this.api}/products?name=${name}`, {headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
          const data = await res.json();
          if(data.success) this.list = data.data
        } catch (error) {
          console.log("Error get products", error)
        }
      },
      async getProductsPage(page){
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${this.api}/products?page=${page}`, {headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
          const data = await res.json();
          if(data.success) this.list = data.data
        } catch (error) {
          console.log("Error get products", error)
        }
      },
      async getProductsLimit(limit){
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${this.api}/products?limit=${limit}`, {headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
          const data = await res.json();
          if(data.success) this.list = data.data
        } catch (error) {
          console.log("Error get products", error)
        }
      },
      async getProduct(name){
        return new Promise(async(resolve, reject) => {
          try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${this.api}/products/${name}`, {headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
            const data = await res.json();
            if(data.success) resolve(data.data)
          } catch (error) {
            reject(error)
            console.log("Error get products", error)
          }
        })
      },
    }
  }
)
