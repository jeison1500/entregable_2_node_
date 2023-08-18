const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const User = require('./../models/model.users');
const bycrypt = require('bcryptjs');
const AppError = require('../utils/appError');

exports.findAllUser = catchAsync(async (req, res) => {
  const users = await User.findAll({ where: { status: 'available' } });

  res.status(200).json({
    status: 'success',
    users,
  });
});

exports.findOneUser = catchAsync(async (req, res) => {
  const { user } = req;
  return res.status(200).json({
    status: 'success',
    user,
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const salt = await bycrypt.genSaltSync(12);
  const hashPassword = await bycrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
    role,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    token,
    user,
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const { user } = req;

  const { name, email } = req.body;

  await user.update({ name, email });

  return res.status(200).json({
    status: 'success',
    message: `User with id ${id} updated successfully...😎`,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { user } = req;
  await user.update({ status: 'unavailable' });
  return res.status(200).json({
    status: 'success',
    message: `User deleted successfully...😎`,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
      status: 'available',
    },
  });

  if (!user) {
    return next(new AppError('Email or password incorrect...😥', 400));
  }

  if (!(await bycrypt.compare(password, user.password))) {
    return next(new AppError('Email or password incorrect...😥', 400));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
