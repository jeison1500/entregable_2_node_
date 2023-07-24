const Repair = require('./../models/models.repairs');

exports.findAllRepair = async (req, res) => {
  try {
    const repairs = await Repair.findAll({ where: { status: 'pending' } });

    return res.status(200).json({
      status: 'success',
      repairs,
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

exports.createRepair = async (req, res) => {
  try {
    const { date, usersId } = req.body;

    const repair = await Repair.create({
      date,
      usersId,
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
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'Repair not found',
      });
    }

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
    const { id } = req.params;
    const { status } = req.body;

    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'Repair not found',
      });
    }

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
    const { id } = req.params;
    const { status } = req.body;

    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'Repair not found',
      });
    }

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
