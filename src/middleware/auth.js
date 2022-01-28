const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    return next(createError(403, 'Server Need Token'));
  }
  const secretKey = process.env.SECRET_KEY_JWT;
  const verifyOptions = {
    issuer: 'Tokoku'
  };
  try {
    const decoded = jwt.verify(token, secretKey, verifyOptions);
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
const isAdmin = (req, res, next) => {
  const role = req.role;
  if (role !== 'admin') return next(createError(403, 'Access Denied!'));
  next();
};

module.exports = {
  protect,
  isAdmin
};
