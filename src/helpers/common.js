const handleNotFount = (req, res, next) => {
  res.status(404)
  res.json({
    message: 'url not found'
  })
}

module.exports = {
  handleNotFount
}