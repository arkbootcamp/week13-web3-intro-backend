const express = require('express');
const userController = require('../controllers/user');
const { protect } = require('../middleware/auth');
const route = express.Router();
const commonMiddle = require('../middleware/common');

route
  .post('/', commonMiddle.roleAdmin, userController.insertUser)
  .post('/register', userController.register)
  .post('/login', userController.login)
  .get('/profile', protect, userController.profile)
  .get('/', userController.getUser)
  .delete('/:id', userController.deleteUser);
// .get('/detail');

module.exports = route;
