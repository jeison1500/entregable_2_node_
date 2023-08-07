const { validationResult, body } = require('express-validator');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.validUserCreate = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').notEmpty().withMessage('Email is required'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').custom((value) => {
    if (value.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    if (!/[A-Z]/.test(value)) {
      throw new Error('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(value)) {
      throw new Error('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(value)) {
      throw new Error('Password must contain at least one number');
    }
    if (!/[@$!%*?&]/.test(value)) {
      throw new Error('Password must contain at least one special character');
    }
    return true;
  }),
  validateFields,
];

exports.validCreateRepairs = [
  body('date').notEmpty().withMessage('Date is required'),
  body('motorsNumber').notEmpty().withMessage('Motors number is required'),
  body('description').notEmpty().withMessage('Description is required'),
  validateFields,
];

exports.validlogin = [
  body('email').notEmpty().withMessage('Email is required'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').notEmpty().withMessage('Password is required'),
  validateFields,
];
