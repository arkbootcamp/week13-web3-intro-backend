const express = require('express');
const productController = require('../controllers/product');
const { protect, isAdmin } = require('../middleware/auth');
// const commonMiddle = require('../middleware/common');
const upload = require('../middleware/upload');

const route = express.Router();

route
  .post('/', upload.single('photo'), productController.insertProduct)
  .get('/', protect, productController.getAllProduct)
  .put('/:id', protect, productController.updateProduct)
  .delete('/:id', protect, isAdmin, productController.deteleProduct)
  .get('/:id', protect, productController.detailProduct);

module.exports = route;
