const express = require('express');

const repairController = require('./../controllers/constroller.repair');

const validationMiddleware = require('./../middlewares/validator.middleware');
const repairMiddleware = require('./../middlewares/repairs.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router
  .route('/')
  .get(
    authMiddleware.protect,
    authMiddleware.restrictTo('employee'),
    repairController.findAllRepair
  )
  .post(validationMiddleware.validCreateRepairs, repairController.createRepair);

router.use(authMiddleware.protect, authMiddleware.restrictTo('employee'));

router
  .use('/:id', repairMiddleware.validRepair)
  .route('/:id')
  .get(repairController.findOneRepair)
  .patch(repairController.updateRepair)
  .delete(repairController.deleteRepair);

module.exports = router;
