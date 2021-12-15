
const express = require('express');
const userController = require('./src/controllers/user')
const commonMiddle = require('./src/middleware/common')
const productController = require('./src/controllers/product')

const app = express()

// middleware
// build in middleware to handle json
app.use(express.json())
app.use(commonMiddle.myConsole)

// const biodata ={
//   naem: 'risano',
//   age: 17
// }
// biodata.age

// routes
app.post('/users', userController.insertUser)
app.get('/users', userController.getUser)
app.delete('/users/:id', userController.deleteUser)

app.post('/products', productController.insertProduct)
app.get('/products', productController.getAllProduct)
app.put('/products/:id', productController.updateProduct)
app.delete('/products/:id', productController.deteleProduct)
app.get('/products/:id', productController.detailProduct)

const PORT = 1234

app.listen(PORT, () => {
  console.log(`server starting on port ${PORT}`);
})