const catchAsync = require('./../utils/catchAsync');
const { db } = require('./../database/config');

const Repair = require('./../models/models.repairs');
const User = require('./../models/model.users');

exports.findAllRepair = catchAsync(async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
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

exports.createRepair = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      error,
    });
  }
};

exports.findOneRepair = async (req, res) => {
  try {
    const { repair } = req;

    return res.status(200).json({
      status: 'success',
      message: 'Repair found',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      error,
    });
  }
};

exports.updateRepair = async (req, res) => {
  try {
    const { repair } = req;

    await repair.update({ status: 'completed' });

    return res.status(200).json({
      status: 'success',
      message: 'Repair updated',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      error,
    });
  }
};

exports.deleteRepair = async (req, res) => {
  try {
    const { repair } = req;
    await repair.update({ status: 'cancelled' });

    return res.status(200).json({
      status: 'success',
      message: 'Repair cancelled',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      error,
    });
  }
};
