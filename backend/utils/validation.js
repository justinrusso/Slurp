const { validationResult, query } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};

    Object.entries(validationErrors.mapped()).forEach(([param, errorObj]) => {
      errors[param] = errorObj.msg;
    });

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const sanitizePaginationQuery = [
  query("limit")
    .toInt()
    .customSanitizer((val) => (val >= 0 ? val : undefined))
    .default(10),
  query("page")
    .toInt()
    .customSanitizer((val) => (val >= 0 ? val : undefined))
    .default(0),
];

module.exports = {
  handleValidationErrors,
  sanitizePaginationQuery,
};
