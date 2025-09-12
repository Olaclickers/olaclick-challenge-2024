const express = require('express');
const router  = express.Router();
const orderDetail = require('../controllers/orderDetail');
const {authMiddleware, authRol} = require("../middlewares/authentication.js");

router.get('/api/order-details/:id',[authMiddleware, authRol('adm_nl')] , orderDetail.getOrderDetail)

module.exports = router;