const express = require('express');
const category_router = express.Router();
const category_controller = require('../Controllers/category');

category_router.get('/api/', category_controller.get_api);
category_router.post('/api/', category_controller.search);

module.exports = category_router;