const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    return next(createError(403, 'Server Need Token'));
  }
  try {
    const secretKey = process.env.SECRET_KEY_JWT;
    const decoded = jwt.verify(token, secretKey);
    req.email = decoded.email;
    req.role = decoded.role;
    next();
  } catch (err) {
    // console.log('error dari verify', err);
    if (err && err.name === 'JsonWebTokenError') { return next(createError(400, 'Token Invalid')); } else if (err && err.name === 'TokenExpiredError') { return next(createError(400, 'Token Expired')); } else {
      return next(createError(400, 'Token not actived'));
    }
  }
};

module.exports = {
  protect
};