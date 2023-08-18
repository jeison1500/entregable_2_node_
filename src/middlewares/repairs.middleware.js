const catchAsync = require('../utils/catchAsync');
const Repair = require('../models/models.repairs');
const AppError = require('../utils/appError');
const User = require('../models/model.users');

exports.validRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
    include: [
      {
        model: User,
        attributes: ['name', 'email', 'role'],
      },
    ],
  });

  if (!repair) {
    return next(new AppError('Repair not found', 404));
  }

  req.repair = repair;
  next();
});
