const catchAsync = require('./../utils/catchAsync');
const { db } = require('./../database/config');

const Repair = require('./../models/models.repairs');
const User = require('./../models/model.users');

exports.findAllRepair = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    where: {
      status: ['pending', 'completed'],
    },
    include: [
      {
        model: User,
        attributes: ['name', 'email', 'role'],
      },
    ],
  });

  return res.status(200).json({
    status: 'success',
    repairs,
  });
});

exports.createRepair = catchAsync(async (req, res) => {
  const { date, motorsNumber, description, userId } = req.body;

  const repair = await Repair.create({
    date,
    motorsNumber,
    description,
    userId,
  });

  return res.status(201).json({
    status: 'success',
    message: 'Repair created',
    repair,
  });
});

exports.findOneRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  return res.status(200).json({
    status: 'success',
    message: 'Repair found',
    repair,
  });
});

exports.updateRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({ status: 'completed' });

  return res.status(200).json({
    status: 'success',
    message: 'Repair updated',
    repair,
  });
});

exports.deleteRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  await repair.update({ status: 'cancelled' });

  return res.status(200).json({
    status: 'success',
    message: 'Repair cancelled',
    repair,
  });
});
