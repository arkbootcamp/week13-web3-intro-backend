const express = require('express');
const productController = require('../controllers/product');
const commonMiddle = require('../middleware/common');

const route = express.Router();

route
  .post('/', commonMiddle.validationInsert, productController.insertProduct)
  .get('/', productController.getAllProduct)
  .put('/:id', productController.updateProduct)
  .delete('/:id', productController.deteleProduct)
  .get('/:id', productController.detailProduct);

module.exports = route;
