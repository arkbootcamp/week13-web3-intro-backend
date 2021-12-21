const express = require('express');
const userController = require('../controllers/user');
const route = express.Router();
const commonMiddle = require('../middleware/common');

route
  .post('/', commonMiddle.roleAdmin, userController.insertUser)
  .post('/register', userController.register)
  .post('/login', userController.login)
  .get('/', userController.getUser)
  .delete('/:id', userController.deleteUser);
// .get('/detail');

module.exports = route;
