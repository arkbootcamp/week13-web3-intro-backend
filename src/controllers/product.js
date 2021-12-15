const connection = require('../config/db')
const modelProduct = require('../models/product')
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
      res.status(500)
      res.json({
        statusCode: 500,
        message: 'Internal Server Error'
      })
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

  try {

    const result = await modelProduct.getAllProduct()
    res.json({
      result: result
    })
  } catch (error) {
    console.log(error);
    res.status(500)
    res.json({
      statusCode: 500,
      message: 'Internal Server Error'
    })
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
      result: result
    })
  } catch (error) {
    console.log(error);
    res.status(500)
    res.json({
      statusCode: 500,
      message: 'Internal Server Error'
    })
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
    res.status(500)
    res.json({
      statusCode: 500,
      message: 'Internal Server Error'
    })
  }


}

const detailProduct = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await modelProduct.detailProduct(id)
    res.json({
      result: result
    })
  } catch (error) {
    console.log(error);
    res.status(500)
    res.json({
      statusCode: 500,
      message: 'Internal Server Error'
    })
  }
}
module.exports = {
  insertProduct,
  getAllProduct,
  updateProduct,
  deteleProduct,
  detailProduct
}