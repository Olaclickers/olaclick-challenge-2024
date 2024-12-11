const mongoose  = require('mongoose');

const prod = true

const CategoryProducts = require('../models/categoryProducts.js');
const Clients = require('../models/clients.js');

let URLMONGO = process.env.URLDB

mongoose.connect(URLMONGO)
        .then(() => console.log("API funcionando Seeder"))
        .catch((err) => console.log(err));

const dataCategoryProducts = [
    {
      name: "Bebida"
    },
    {
      name: "Cervesa",
    },
    {
      name: "Chiclets"
    },
    {
      name: "Cocleteria",
    },
    {
      name: "Comida"
    },
]

const dataClient  = [
  {
    name: "Juan",
    last_name: "Perez",
    full_name: "Juan Perez",
    phone: 934934934
  },
  {
    name: "Jose",
    last_name: "Jose",
    full_name: "Jose Jose",
    phone: 922922922
  },
  {
    name: "Andres",
    last_name: "Salazar",
    full_name: "Andrez Salazar",
    phone: 997997876
  }
]






// Import into DB
const importData = async () => {
  try {
    await Promise.all([CategoryProducts.create(dataCategoryProducts), Clients.create(dataClient)])
    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

importData();