import { defineStore } from "pinia";

export const useCategoryProductsStore = defineStore(
  'category-products-store',
  {
    state: () => ({
      api: useRuntimeConfig().public.apiURL,
      list: []
    }),
    actions: {
      async getCategoriesProductsAll(){
        try {
          const res = await fetch(`${this.api}/category-products`)
          const data = await res.json();
          this.list = data.data
        } catch (error) {
          console.log("Error get products", error)
        }
      }
    }
  }
)
