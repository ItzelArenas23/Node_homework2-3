const express = require('express');

//* middlewares/controllers

const validationMiddleware = require('../middlewares/validations.middleware');
const usersController = require('./../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const authController = require('../controllers/auth.contoller');
const router = express.Router();

router.route('/').get(usersController.findAll).post(usersController.create);

router
  .route('/:id')
  .get(usersController.findUser)
  .patch(authMiddleware.protectAccountOwner, usersController.updateUser)
  .delete(authMiddleware.protectAccountOwner, usersController.deleteUser);

router.post(
  '/login',
  validationMiddleware.createUserValidation,
  authController.login
);
module.exports = router;
