const connection = require('../config/db')
const modelProduct = require('../models/product')
const createError = require('http-errors')
const commonHerper = require('../helpers/common')

const insertProduct = (req, res, next) => {
  const { name, description, price, stock } = req.body
  const data = {
    name: name,
    description: description,
    price: price,
    stock: stock
  }
  modelProduct.insertProduct(data)
    .then((result) => {
      res.json({
        result: result
      })
    })
    .catch((err) => {
      next({status: 500, message: 'internal server error'})
      // res.status(500)
      // res.json({
      //   statusCode: 500,
      //   message: 'Internal Server Error'
      // })
    })
}
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
  try {

    const search = req.query.name
    const sort = req.query.sort || 'created_at'
    const order = req.query.order || 'desc'
    console.log(search);

    const resultProduct = await modelProduct.getAllProduct({
      search: search,
      sort: sort,
      order: order
    })
    // const resultUser = await modelUser.getAllUser()
    commonHerper.response(res, resultProduct, 200)
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
    const err = new createError.InternalServerError()
    next(err)
  }
}
const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id

    const name = req.body.name
    const description = req.body.description
    const price = req.body.price
    const stock = req.body.stock

    console.log(new Date());
    const data = {
      name: name,
      description: description,
      price: price,
      stock: stock,
      updated_at: new Date()
    }
    const result = await modelProduct.updateProduct(data, id)
    res.json({
      status: 'Success',
      code: 200,
      data: result,
      message: 'Data berhasil di tambahkan'
    })
  } catch (error) {
    console.log(error);
    const err = new createError.InternalServerError()
    next(err)
  }



}
const deteleProduct = async (req, res, next) => {
  try {
    const id = req.params.id
    
    const result = await modelProduct.deleteProduct(id)
    res.json({
      result: result
    })

  } catch (error) {
    console.log(error);
    const err = new createError.InternalServerError()
    next(err)
  }


}

const detailProduct = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await modelProduct.detailProduct(id)
    res.json({
      status: 'Success',
      code: 200,
      data: result,
      message: 'Data berhasil di tambahkan'
    })
  } catch (error) {
    console.log(error);
    const err = new createError.InternalServerError()
    next(err)
  }
}
module.exports = {
  insertProduct,
  getAllProduct,
  updateProduct,
  deteleProduct,
  detailProduct
}