const express = require('express');
const tours_router = express.Router();
const tours_controller = require('../Controllers/tours');
const Joi = require('joi');
var Helper = require('../Helper/Helper');

var helper = new Helper();


tours_router.get('/', tours_controller.index);
tours_router.post('/', tours_controller.search);

tours_router.get('/create', tours_controller.get_create);
tours_router.post('/create', helper.upload().single('image'), tours_controller.post_create);


tours_router.get('/update/:id', tours_controller.get_update);
tours_router.post('/update/:id', helper.upload().single('image'), tours_controller.get_update);

tours_router.get('/delete/:id', tours_controller.get_delete);

module.exports = tours_router;