require('dotenv').config()
const express = require('express');
const userController = require('./src/controllers/user')
const commonMiddle = require('./src/middleware/common')
const commonHelper = require('./src/helpers/common')
const productController = require('./src/controllers/product')
const productRoute = require('./src/routes/product')
const userRoute = require('./src/routes/user')
const morgan = require('morgan')
const cors = require('cors')

const PORT = 1234

const app = express()

// middleware
// build in middleware to handle json
// app.use(cors())
// var whitelist = ['http://127.0.0.1:5500', 'http://example2.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
app.use(cors())
app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

app.use(commonMiddle.myConsole)
// middleware login
app.use(morgan('dev'))


// routes
app.use('/users', userRoute)

// method all kemudian di awali path /products 
app.use('/products', productRoute)


// handle url not found
app.use(commonHelper.handleNotFount)

app.listen(PORT, () => {
  console.log(`server starting on port ${PORT}`);
})