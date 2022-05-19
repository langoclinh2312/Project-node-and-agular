const express = require('express');
const login_router = express.Router();
const login_controller = require('../Controllers/loginAdmin');

login_router.get('/login', login_controller.get_login);
login_router.post('/login', login_controller.post_login);

login_router.get('/logout', login_controller.get_logout);
module.exports = login_router;