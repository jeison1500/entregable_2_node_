const express = require('express');

// constroller

const userController = require('./../controllers/constroller.user');

// middleware

const validationMiddleware = require('./../middlewares/validator.middleware');
const userMiddleware = require('./../middlewares/user.midleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router.post('/login', validationMiddleware.validlogin, userController.login);

router
  .route('/')
  .get(authMiddleware.protect, userController.findAllUser)
  .post(validationMiddleware.validUserCreate, userController.createUser);

router.use(authMiddleware.protect);

router
  .use('/:id', userMiddleware.validUser)
  .route('/:id')
  .get(userController.findOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
