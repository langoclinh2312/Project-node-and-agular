const express = require('express');
const account_router_api = express.Router();
const account_controller = require('../Controllers/account');

// api router
account_router_api.post('/api/login', account_controller.check_login);
account_router_api.post('/api/create', account_controller.post_api);
module.exports = account_router_api;