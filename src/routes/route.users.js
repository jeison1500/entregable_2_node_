const express = require('express');

// constroller

const userController = require('./../controllers/constroller.user');

// middleware

const router = express.Router();

router
  .route('/')
  .get(userController.findAllUser)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.findOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
