const express = require('express');
const productController = require('../controllers/product');
const { protect, isAdmin } = require('../middleware/auth');
const { hitCacheProductId, hitCacheProduct, clearRedisProduct } = require('../middleware/redis');
// const commonMiddle = require('../middleware/common');
const upload = require('../middleware/upload');

const route = express.Router();

route
  .post('/', upload.single('photo'), clearRedisProduct, productController.insertProduct)
  .get('/', protect, hitCacheProduct, productController.getAllProduct)
  .put('/:id', protect, productController.updateProduct)
  .delete('/:id', protect, isAdmin, productController.deteleProduct)
  .get('/:id', protect, hitCacheProductId, productController.detailProduct);

module.exports = route;
