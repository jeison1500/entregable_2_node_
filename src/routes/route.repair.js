const express = require('express');

const repairController = require('./../controllers/constroller.repair');

const router = express.Router();

router
  .route('/')
  .get(repairController.findAllRepair)
  .post(repairController.createRepair);

router
  .route('/:id')
  .get(repairController.findOneRepair)
  .patch(repairController.updateRepair)
  .delete(repairController.deleteRepair);

module.exports = router;
