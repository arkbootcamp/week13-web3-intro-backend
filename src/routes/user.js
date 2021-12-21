const express = require('express');
const userController = require('../controllers/user');
const route = express.Router();

route
  .post('/', userController.insertUser)
  .get('/', userController.getUser)
  .delete('/:id', userController.deleteUser);
// .get('/detail');

module.exports = route;
