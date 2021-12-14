const mysql = require('mysql2')


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'web3_week12'
});

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

module.exports = {
  insertProduct
}