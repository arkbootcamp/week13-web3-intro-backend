const createError = require('http-errors');
const myConsole = (req, res, next) => {
  console.log('my middleware di jalankan');
  next();
};

const CallMe = (req, res, next) => {
  console.log('saya menjalan middlewaren CallMe');
  next();
};
const roleAdmin = (req, res, next) => {
  const role = req.headers.rolexxx;
  if (role === 'admin') {
    next();
  }
  next(createError(403, 'hanya admin yg boleh request'));
};
module.exports = {
  myConsole: myConsole,
  CallMe,
  roleAdmin
};
