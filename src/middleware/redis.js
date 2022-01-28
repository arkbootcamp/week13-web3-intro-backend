const client = require('../config/redis');

const hitCacheProductId = async (req, res, next) => {
  const id = req.params.id;
  const product = await client.get(`product/${id}`);
  if (product !== null) {
    res.json({
      status: 'Success',
      code: 200,
      data: JSON.parse(product),
      message: 'Data berhasil ambil dari redis'
    });
  } else {
    next();
  }
};

const hitCacheProduct = async (req, res, next) => {
//   const page = parseInt(req.query.page) || 1;
  const product = await client.get('product');
  if (product !== null) {
    res.json({
      status: 'Success',
      code: 200,
      data: JSON.parse(product),
      message: 'Data berhasil ambil dari redis'
    });
  } else {
    next();
  }
};
const clearRedisProduct = (req, res, next) => {
  client.del('product');
  next();
};

module.exports = {
  hitCacheProductId,
  hitCacheProduct,
  clearRedisProduct
};
