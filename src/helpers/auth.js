const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  const secretKey = process.env.SECRET_KEY_JWT;
  const verifyOptions = {
    issuer: 'tokopedia',
    expiresIn: 60 * 60
  };
  const token = jwt.sign(payload, secretKey, verifyOptions);
  return token;
};

module.exports = {
  generateToken
};
