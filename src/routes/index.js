const express = require('express');

const route = express.Router();
const userRoute = require('./user');
const productRoute = require('./product');

route.use('/users', userRoute);
// method all kemudian di awali path /products
route.use('/products', productRoute);

module.exports = route;
