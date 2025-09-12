const express = require('express');
const router  = express.Router();
const client = require('../controllers/client');
const {authMiddleware, authRol} = require("../middlewares/authentication.js");

router.post('/api/clients',[authMiddleware, authRol('adm_nl')] , client.createClient)
router.get('/api/clients',[authMiddleware, authRol('adm_nl')] , client.getAll)

module.exports = router;