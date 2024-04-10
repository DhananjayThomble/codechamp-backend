const { validationResult } = require("express-validator");

const validatorErrorHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(`error from validatorErrorHandler: ${errors.array()}`);
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = validatorErrorHandler;
