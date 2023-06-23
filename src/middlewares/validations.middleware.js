const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('name can`t be empty'),
  body('email').notEmpty().withMessage(' email can`t be empty'),
  body('password')
    .notEmpty()
    .withMessage('password can`t be empty')
    .isLength({ min: 7 })
    .withMessage('password have to be at least 7 words length '),
  validFields,
];

exports.createRepairsValidation = [
  body('date').notEmpty().withMessage('must provide a valid date'),
  body('motorsNumber')
    .notEmpty()
    .withMessage('must provide the car license plate'),
  body('description').notEmpty().withMessage('must provide a description'),
  validFields,
];
