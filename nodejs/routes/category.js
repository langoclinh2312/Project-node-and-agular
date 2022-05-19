const express = require('express');
const category_router = express.Router();
const category_controller = require('../Controllers/category');

category_router.get('/', category_controller.index) // Lấy hàm ở key index

category_router.get('/create', category_controller.get_create);
category_router.post('/create', category_controller.post_create);

category_router.get('/update/:id', category_controller.get_update);
category_router.post('/update/:id', category_controller.post_update);

category_router.get('/delete/:id', category_controller.get_delete);

module.exports = category_router;