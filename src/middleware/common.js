const createError = require('http-errors');
const joi = require('joi');
const myConsole = (req, res, next) => {
  req.aplikasiName = 'zwallet';
  console.log('my middleware di jalankan');
  next();
};

const CallMe = (req, res, next) => {
  const heloHeader = req.headers.helo;
  console.log(heloHeader);
  next();
};
const roleAdmin = (req, res, next) => {
  const role = req.headers.rolexxx;
  console.log(role);
  if (role === 'admin') {
    return next();
  }
  next(createError(403, 'hanya admin yg boleh request'));
};
const validationInsert = (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const { name, price, description, stock } = req.body;
  const schema = joi.object({
    name: joi.string().min(3).max(40).required(),
    description: joi.string(),
    price: joi.number().required(),
    stock: joi.number().required()
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((errObject) => errObject.message).toString();
    // const errorMessage = error.details[0].message;
    // console.log(errorMessage.toString());
    // res.status(422);
    // res.json({ error: errorMessage });
    return next(createError(422, errorMessage));
  }
  next();
  // console.log(result);
  // res.json({
  //   test: 'test'
  // });
  // console.log(name);
  // if (!name) {
  //   return next(createError(422, 'name masih kosong'));
  // }
  // if (!price) {
  //   return next(createError(422, 'price masih kosong'));
  // }
  // const role = 'admin';
  // req.roleUser = role;
  // console.log('middleware vadiation di jalankan');
  // next();
};
module.exports = {
  myConsole: myConsole,
  CallMe,
  roleAdmin,
  validationInsert
};
