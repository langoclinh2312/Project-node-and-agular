const express = require('express');
const account_router = express.Router();
const account_controller = require('../Controllers/account');

account_router.get('/', account_controller.index); // Lấy hàm ở key index

account_router.get('/create', account_controller.get_create);
account_router.post('/create', account_controller.post_create);

account_router.get('/update/:id', account_controller.get_update);
account_router.post('/update/:id', account_controller.post_update);

account_router.get('/delete/:id', account_controller.get_delete);

module.exports = account_router;