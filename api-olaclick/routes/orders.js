const express = require('express');
const router  = express.Router();
const order = require('../controllers/order');
const {authMiddleware, authRol} = require("../middlewares/authentication.js");

router.post('/api/orders',[authMiddleware, authRol('adm_nl')] , order.createOrder)
router.get('/api/orders/:serie',[authMiddleware, authRol('adm_nl')] , order.getOrder)
router.get('/api/orders',[authMiddleware, authRol('adm_nl')] , order.getAll)
router.put('/api/orders/:id',[authMiddleware, authRol('adm_nl')] , order.update)

module.exports = router;