const express = require('express');
const tours_router_api = express.Router();
const tours_controller = require('../Controllers/tours');
const Joi = require('joi');
var Helper = require('../Helper/Helper');

var helper = new Helper();

// api router
tours_router_api.get('/api/', tours_controller.get_api);
tours_router_api.post('/api/?is_angular=true', tours_controller.search);
tours_router_api.get('/api/orderby/', tours_controller.orderby);
tours_router_api.get('/api/explore/:id/', tours_controller.explore);
tours_router_api.get('/api/detail/:id/', tours_controller.get_detail_api);

module.exports = tours_router_api;