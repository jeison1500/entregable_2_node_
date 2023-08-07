const catchAsync = require('../utils/catchAsync');
const User = require('../models/model.users');
const AppError = require('../utils/appError');

exports.validUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne(id);
  ({
    where: {
      id,
      status: 'available',
    },
  });
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  req.user = user;
  next();
});
