const express = require('express');
const router  = express.Router();
const product = require('../controllers/product');
const {authMiddleware, authRol} = require("../middlewares/authentication.js");

router.post('/api/products',[authMiddleware, authRol('adm_nl')] , product.createProduct)
router.get('/api/products/:name',[authMiddleware, authRol('adm_nl')] , product.getProduct)
router.get('/api/products',[authMiddleware, authRol('adm_nl')] , product.getAll)
router.put('/api/products/:id',[authMiddleware, authRol('adm_nl')] , product.update)

module.exports = router;