const express = require('express');
const router  = express.Router();
const user = require('../controllers/user');
const {authMiddleware} = require("../middlewares/authentication.js");

router.post('/api/user', user.createUser)
router.post('/api/login', user.authUser)
router.get('/api/user/:id',authMiddleware , user.getUser)

module.exports = router;