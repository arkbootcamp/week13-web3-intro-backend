const modelProduct = require('../models/product');
const createError = require('http-errors');
const commonHerper = require('../helpers/common');
const client = require('../config/redis');

const insertProduct = (req, res, next) => {
  // console.log(req.get('host'));
  const { name, description, price, stock } = req.body;
  const fileName = req.file.filename;
  // const dataheader = req.headers.Authorization;
  // console.log(dataheader);
  // const data = req.body;
  const data = {
    name,
    description,
    price,
    stock,
    photo: `http://${req.get('host')}/file/${fileName}`
    // photo: `${process.env.BASE_URL}/file/${fileName}`
  };
  modelProduct.insertProduct(data)
    .then((result) => {
      commonHerper.response(res, data, 201, 'data berhasil masuk datbase');
    })
    .catch((err) => {
      console.log(err);
      next({ status: 500, message: 'internal server error' });
      // res.status(500)
      // res.json({
      //   statusCode: 500,
      //   message: 'Internal Server Error'
      // })
    });
};
const getAllProduct = async (req, res, next) => {
  // modelProduct.getAllProduct()
  // .then((result)=>{
  //   res.json({
  //     result: result
  //   })
  // })
  // .catch((err)=>{
  //   res.status(500)
  //   res.json({
  //     statusCode: 500,
  //     message: 'Internal Server Error'
  //   })
  // })
  // const adaError = "disini ada yg rusak"

  // next(adaError)
  // http://localhost:4000/product?name=baju&sort=name&order=asc&page=2&limit=10
  try {
    const search = req.query.name;
    const sort = req.query.sort || 'created_at';
    const order = req.query.order || 'desc';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;
    console.log(search);
    const resultProduct = await modelProduct.getAllProduct({
      search: search,
      sort: sort,
      order: order,
      offset: offset,
      limit: limit
    });
    const resultCount = await modelProduct.countProduct();
    const { total } = resultCount[0];
    client.setEx('product', 60 * 60, JSON.stringify(resultProduct));
    commonHerper.response(res, resultProduct, 200, null, {
      currentPage: page,
      limit: limit,
      totalData: total,
      totalPage: Math.ceil(total / limit)

    });
    // res.json({
    //   status: 'Success',
    //   code: 200,
    //   data: result,
    //   message: 'Data berhasil di tambahkan'
    // })
  } catch (error) {
    console.log(error);
    // cara 1
    // const errorResponse = new Error('Internal Server Error')
    // errorResponse.status = 500

    // next(errorResponse)

    // cara 2 (menggunakan package)
    // const err = createError(500, 'ada error lagi bro...')
    const err = new createError.InternalServerError();
    next(err);
  }
};
// http://localhost:4000/product/12
const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const stock = req.body.stock;

    console.log(new Date());
    const data = {
      name: name,
      description: description,
      price: price,
      stock: stock,
      updated_at: new Date()
    };
    const result = await modelProduct.updateProduct(data, id);
    res.json({
      status: 'Success',
      code: 200,
      data: result,
      message: 'Data berhasil di tambahkan'
    });
  } catch (error) {
    console.log(error);
    const err = new createError.InternalServerError();
    next(err);
  }
};
const deteleProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await modelProduct.deleteProduct(id);
    res.json({
      result: result
    });
  } catch (error) {
    console.log(error);
    const err = new createError.InternalServerError();
    next(err);
  }
};

const detailProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await modelProduct.detailProduct(id);
    await client.setEx(`product/${id}`, 60 * 60, JSON.stringify(result));
    res.json({
      status: 'Success',
      code: 200,
      data: result,
      message: 'Data berhasil dari database'
    });
  } catch (error) {
    console.log(error);
    const err = new createError.InternalServerError();
    next(err);
  }
};
module.exports = {
  insertProduct,
  getAllProduct,
  updateProduct,
  deteleProduct,
  detailProduct
};
