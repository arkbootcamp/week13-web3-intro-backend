require('dotenv').config();
const express = require('express');
const commonMiddle = require('./src/middleware/common');
const commonHelper = require('./src/helpers/common');
const productRoute = require('./src/routes/product');
const userRoute = require('./src/routes/user');
const morgan = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// app.use(commonMiddle.CallMe);

app.use(commonMiddle.myConsole);
// middleware login
app.use(morgan('dev'));

// routes
app.use('/users', userRoute);

// method all kemudian di awali path /products
app.use('/products', productRoute);

// handle url not found
app.use(commonHelper.handleNotFount);

// error handling

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';
  commonHelper.response(res, null, statusCode, message);
  // res.status(statusCode);
  // res.json({
  //   status: statusCode,
  //   message: message
  // });
});

app.listen(PORT, () => {
  console.log(`server starting on port ${PORT}`);
});
