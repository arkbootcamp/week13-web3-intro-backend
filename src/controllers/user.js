const createError = require('http-errors');
const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/user');
const commonHelper = require('../helpers/common');
const bcrypt = require('bcrypt');
let data = [
  // res.send("helo world 4")
  {
    id: 1,
    username: 'risano',
    emai: 'rsiano@gmail.com'
  },
  {
    id: 2,
    username: 'budi',
    emai: 'budi@gmail.com'
  }
];

const insertUser = (req, res, next) => {
  // const username = req.body.username
  // const email = req.body.email
  // const id = req.body.id
  // validasi bla
  const { id, username, email } = req.body;
  const tampung = {
    id: id,
    username: username,
    email: email
  };
  data.push(tampung);
  console.log(req.body);
  res.json({
    message: 'data berhasil di tambahkan'
  });
};

const login = async (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  try {
    const { email, password } = req.body;

    const [user] = await userModel.findByEmail(email);

    if (!user) return next(createError(403, 'email atau password anda salah'));

    const resultHash = await bcrypt.compare(password, user.password);

    if (resultHash) {
      commonHelper.response(res, null, 200, 'anda berhasil login');
    } else {
      next(createError(403, 'email atau password anda salah'));
    }
  } catch (error) {
    console.log(error);
    next(createError(500, new createError.InternalServerError()));
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const user = await userModel.findByEmail(email);
    // console.log(user);
    console.log(user);
    if (user.length > 0) {
      return next(createError(403, 'email is ready'));
    }

    // eslint-disable-next-line node/handle-callback-err
    // bcrypt.genSalt(10, (err, salt) => {
    //   // console.log(err);
    //   console.log(salt);
    // });

    const passwordHash = await bcrypt.hash(password, 10);
    const data = {
      id: uuidv4(),
      email,
      password: passwordHash,
      name
    };
    const resultInsert = await userModel.create(data);
    commonHelper.response(res, resultInsert, 201, 'berhasil insert');
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const deleteUser = (req, res, next) => {
  const idUser = req.params.id;
  console.log(idUser);
  data = data.filter((user) => {
    return user.id !== idUser;
  });
  res.json({
    message: 'data berhasil dihapus'
  });
};
const getUser = (req, res, next) => {
  const role = req.roleUser;
  const aplikasiname = req.aplikasiName;
  res.json({
    nameAplikasi: aplikasiname,
    role: role,
    result: data
  });
};

module.exports = {
  insertUser: insertUser,
  deleteUser: deleteUser,
  getUser: getUser,
  register,
  login
};
