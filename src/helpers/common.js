const handleNotFount = (req, res, next) => {
  res.status(404);
  res.json({
    message: 'url not found'
  });
};
const response = (res, result, status, message, pagination) => {
  // const resultPrint = {}
  // resultPrint.status = 'success'
  // resultPrint.statusCode = status
  // resultPrint.data = result
  // resultPrint.error = error || null
  // res.status(status).json(resultPrint)

  res.status(status).json({
    status: 'Success',
    code: status || 200,
    data: result,
    message: message || null,
    pagination: pagination
  });
};

module.exports = {
  handleNotFount,
  response
};
