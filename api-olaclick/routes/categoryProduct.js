const express = require('express');
const router  = express.Router();
const categoryProduct = require('../controllers/categoryProduct');
const {authMiddleware, authRol} = require("../middlewares/authentication.js");

router.post('/api/category-categoryProducts',[authMiddleware, authRol('adm_nn')] , categoryProduct.createCategoryProduct)
router.get('/api/category-products' , categoryProduct.getAll)

module.exports = router;