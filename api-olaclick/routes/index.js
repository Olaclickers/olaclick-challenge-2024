const express           = require('express');
const routes            = express.Router();
const categoryProduct   = require('./categoryProduct');
const clients           = require('./clients');
const products          = require('./products');
const orders            = require('./orders');
const orderDetails      = require('./orderDetails');
const users             = require('./users');

routes.use(categoryProduct)
routes.use(clients)
routes.use(orders)
routes.use(orderDetails)
routes.use(products)
routes.use(users)




/* GET home page. */
routes.get('/', function(req, res, next) {
  res.render('index', { title: 'API de Ola click' });
});

module.exports = routes;
