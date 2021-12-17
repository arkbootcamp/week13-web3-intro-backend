const connection = require('../config/db')
const getAllProduct = ({search, sort, order})=>{

  return new Promise((resolve, reject)=>{
    connection.query(`SELECT * FROM products ORDER BY ?? ${order}`, sort, (error, result) => {
      console.log('jalan di baris 26');
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })

}
const insertProduct = (data)=>{
  return new Promise((resolve, reject)=>{
    connection.query("INSERT INTO products set ?", data, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const updateProduct = (data, id)=>{
  return new Promise((resolve, reject)=>{
    connection.query("UPDATE products SET ? WHERE id = ?", [data, id], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
 
}

const deleteProduct = (id)=>{
  return new Promise((resolve, reject)=>{
    connection.query("DELETE FROM products WHERE id = ?", id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
 
}

const detailProduct=(id)=>{
  return new Promise((resolve, reject)=>{
    connection.query("SELECT * FROM products WHERE id = ?", id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
  
}
module.exports = {
  getAllProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  detailProduct
}