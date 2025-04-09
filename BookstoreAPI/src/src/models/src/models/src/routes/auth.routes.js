const express = require('express');
const { register80, login80 } = require('../controllers/auth.controller');

const router80 = express.Router();

router80.post('/register', register80);
router80.post('/login', login80);

module.exports = router80;