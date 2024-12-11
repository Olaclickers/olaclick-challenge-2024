<template lang="pug">
NuxtLayout(name="dashboard" :title="txtName")
  .productos-new
    v-snackbar(v-model="showRibbon" color="green") Se actualizo el producto {{txtName}}
    v-form(ref="refForm")
      v-row
        v-col(lg="7")
          v-row
            v-col(lg="6")
              v-text-field(name="Nombre" label="Nombre" v-model="txtName" :rules="rulesName" required @keyup="getCategory")
            v-col(lg="6")
              v-select(label="Categorias", :items="listCategories.data" , item-title="name", item-value="_id",v-model="txtCategory", @change="changeCategory($event)" )
          v-row
            v-col(lg="6")
              v-text-field(name="Precio de compra" label="Precio de compra" v-model="txtPriceBuy" v-maska="'#######'" :rules="rulesPriceBuy")
            v-col(lg="6")
              v-text-field(name="Precio de venta" label="Precio de venta" v-model="txtPriceSale" v-maska="'#######'" :rules="rulesPriceSale")
          v-row
            v-col(lg="6")
              v-text-field(name="Stock" label="Stock" v-model="txtStock" v-maska="'###'" :rules="rulesStock")
            v-col(lg="6")
              v-text-field(name="Ganancia" label="Ganancia" v-model="getProfit" readonly)
          .mt-10
            v-btn.px-6.font-weight-bold(variant="flat" size="large" color="blue-accent-2" @click.prevent="viewList") Regresar
            v-btn.ml-10.px-6.font-weight-bold(variant="flat" size="large" color="blue-darken-3" @click.prevent="sendRegister") Actualizar

        v-col(lg="5")
          v-row
            v-col(cols="12")
              .relative.drag-drop.mx-auto
                template(v-if="imagenProduct == null")
                  .drag-drop-content.d-flex.align-center.justify-center.flex-column.mx-auto(class="cursor-pointer" @dragover="handleDragOver" @drop.prevent="dropProduct") 
                    v-icon(icon="mdi-image-area")                    
                    p(class="text-[15px] flex mt-3 mb-2") Drag and drop or <button  class="font-weight-bold ml-1 cursor-pointer" @click.prevent="openBrowserProduct()">Browse</button> 
                    p(class="text-[14px] text-[#0F0E0E]") JPG, JPEG, PNG(Max. 2MB)
                  div(v-if="errorMessageFileProduct" class="drag-drop-message text-center  mt-3 px-2 py-2")
                    p {{errorMessageFileProduct}}
                template(v-if="imagenProduct != null")            
                  .drag-drop-imagen.relative.mx-auto
                    figure(class="mx-auto")                      
                      img(:src="imagenProduct.preview" alt="imagen de logo")                       
                    v-icon(icon="mdi-close" class="cursor-pointer" @click="closeImagen")
          v-row
            v-col(cols="12" align="center")
              figure
                img(:src="imagenQR" alt="'imagen de '+txtName")
      
      
</template>
<script setup>
import { ref,onBeforeMount ,onMounted, computed } from 'vue';
import { useCategoryProductsStore } from '@/stores/category-products.js';
import { useProductsStore } from '~/stores/products';
import { useRouter, useRoute } from "vue-router";
const categoryProducts = useCategoryProductsStore();
const products = useProductsStore()
const config = useRuntimeConfig();
const router = useRouter()
const route = useRoute()
const txtID = ref('')
const txtName = ref('')
const txtCategory = ref('')
const txtStock = ref('')
const txtPriceBuy = ref('')
const txtPriceSale = ref('')
const imagenProduct = ref(null)
const imagenQR = ref('')
const errorMessageFileProduct = ref('')
const refForm = ref('')
const showRibbon = ref(false)

const rulesName = [
  v => !!v || 'Nombre es requerido'
]

const rulesStock = [
  v => !!v || 'Stock es requerido'
]

const rulesPriceBuy = [
  v => !!v || 'Precio de compra es requerido'
]

const rulesPriceSale = [
  v => !!v || 'Precio de venta es requerido'
]


const changeCategory = (item) =>{
  console.log("ITEM", item)
}

const closeImagen = () => {
  imagenProduct.value = null
  errorMessageFileProduct.value = ""
}
const handleDragOver = (event) => {
  event.preventDefault();
};

const dropProduct = (event) => {
    const file = event.dataTransfer.files[0];

    if (file.size > 2 * 1024 * 1024) {
      errorMessageFileProduct.value = 'El archivo es demasiado grande. Máximo 2MB';
      return;
    }

    const allowedTypes = ['jpg', 'jpeg', 'png'];
    if (!allowedTypes.includes(file.type.split('/')[1])) {
      errorMessageFileProduct.value = 'Tipo de archivo no válido. Solo se permiten JPG, JPEG y PNG';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      file.preview = e.target.result;
      imagenProduct.value = file
    };    
    reader.readAsDataURL(file);        
};
const openBrowserProduct = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = () => {
    dropProduct({ dataTransfer: { files: input.files } });
  };
  input.click();
};

const apiUpdateProduct = async() => {
  const token = localStorage.getItem('token');
  const datos = {
    name: txtName.value, 
    category_product: txtCategory.value, 
    stock: txtStock.value, 
    price_buy: txtPriceBuy.value, 
    price_sale: txtPriceSale.value, 
    img: imagenProduct.value
  }

  const res = await fetch(`${config.public.apiURL}/products/${txtID.value}`, {method: 'PUT',body: JSON.stringify(datos), headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
  const data = await res.json();

  if(data.success){
    showRibbon.value = true;
  }

  if(data.msg == 'Token no válido') {
    alert("El sesión termino")
    localStorage.removeItem('token');
    router.push({path:"/login"})
  }
}
const getProfit = computed(() => {
  return txtPriceSale.value - txtPriceBuy.value || 0
} )

const listCategories = computed(() => {
  return categoryProducts.list
})

const getCategory = () => {
  const search = txtName.value.toLowerCase();
  const searchWords = search.split(' ')
  const filterCategory = listCategories.value.data.find(item => item.name.toLowerCase().includes(searchWords[0]))
  txtCategory.value = (filterCategory != undefined) ? filterCategory._id: listCategories.value.data[0]._id
}

const sendRegister = async() =>{
  const {valid} = await refForm.value?.validate();
  if(imagenProduct.value == null) errorMessageFileProduct.value = "Agrega una imagen"
  if(valid && imagenProduct.value != null) apiUpdateProduct()
}


onBeforeMount(() => {
  categoryProducts.getCategoriesProductsAll()
  products.getProduct(route.params._name).then(response => {
    txtID.value = response[0]._id
    txtName.value = response[0].name
    txtCategory.value = response[0].category_product
    txtStock.value = response[0].stock
    txtPriceBuy.value = response[0].price_buy
    txtPriceSale.value = response[0].price_sale
    imagenProduct.value = response[0].img[0]
    imagenQR.value = response[0].qr
  })
})


useSeoMeta({
  title: () => txtName.value
})

const viewList = () => {
  router.push({path:"/productos"})
}
</script>
