const User = require('./../models/model.users');

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
    const { id } = req.params;

    const user = await User.findOne({ where: { id, status: 'available' } });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User with id ${id} not found...😥`,
      });
    }

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

    const user = await User.create({ name, email, password, role });

    res.status(201).json({
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

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findOne({ where: { id, status: 'available' } });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User with id ${id} not found...😥`,
      });
    }

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
    const { id } = req.params;

    const user = await User.findOne({ where: { id, status: 'available' } });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User with id ${id} not found...😥`,
      });
    }

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
