const connection = require('../config/db')

const insertProduct = (req, res, next)=>{
  const { name, description, price, stock} = req.body
  const data = {
    name: name,
    description: description,
    price: price,
    stock: stock
  }
  connection.query("INSERT INTO products set ?", data, (error, result)=>{
    if(error){
      res.json({
        message: "data gagal di tambahkan"
      })
    }else{
      res.json({
        result: result
      })
    }
  })
}
const getAllProduct = (req, res, next)=>{
  connection.query("SELECT * FROM products", (error, result)=>{
    if(error){
      console.log(error);
      res.json({
        message: "Internal Server Error"
      })
    }else{
      res.json({
        result: result
      })
    }
  })
}
const updateProduct = (req, res, next)=>{
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

  connection.query("UPDATE products SET ? WHERE id = ?", [data, id], (error, result)=>{
    if (error) {
      console.log(error);
      res.json({
        message: "Internal Server Error"
      })
    } else {
      res.json({
        result: result
      })
    }
  })
}
const deteleProduct = (req, res, next)=>{
  const id = req.params.id
  connection.query("DELETE FROM products WHERE id = ?", id, (error, result)=>{
    if (error) {
      console.log(error);
      res.json({
        message: "Internal Server Error"
      })
    } else {
      res.json({
        result: result
      })
    }
  })
}

const detailProduct = (req, res, next)=>{
  const id = req.params.id
  connection.query("SELECT * FROM products WHERE id = ?", id, (error, result)=>{
    if (error) {
      console.log(error);
      res.json({
        message: "Internal Server Error"
      })
    } else {
      const resultDetail = result[0]
      res.json({
        result: resultDetail
      })
    }
  })

}
module.exports = {
  insertProduct,
  getAllProduct,
  updateProduct,
  deteleProduct,
  detailProduct
}