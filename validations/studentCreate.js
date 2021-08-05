const { validationResult, body } = require('express-validator')

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({
    errors: extractedErrors,
  });
}

exports.studentCreate = () => {
    return [
      body('name').notEmpty().withMessage('name is required'),
      body('dob').notEmpty().withMessage('DOB is required')
    ]
  }