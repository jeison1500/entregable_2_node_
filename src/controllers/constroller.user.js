const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const User = require('./../models/model.users');
const bycrypt = require('bcryptjs');
const AppError = require('../utils/appError');

exports.findAllUser = async (req, res) => {
  try {
    const users = await User.findAll({ where: { status: 'available' } });

    res.status(200).json({
      status: 'success',
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong...😥',
      error,
    });
  }
};

exports.findOneUser = async (req, res) => {
  try {
    const { user } = req;
    return res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong...😥',
      error,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong...😥',
      error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { user } = req;

    const { name, email } = req.body;

    await user.update({ name, email });

    return res.status(200).json({
      status: 'success',
      message: `User with id ${id} updated successfully...😎`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong...😥',
      error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { user } = req;
    await user.update({ status: 'unavailable' });
    return res.status(200).json({
      status: 'success',
      message: `User deleted successfully...😎`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong...😥',
      error,
    });
  }
};

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
