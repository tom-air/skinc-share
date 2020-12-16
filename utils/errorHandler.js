const { validationResult } = require('express-validator');
const logger = require('./logger');

const errorFormatter = (error) => {
  return `${error.param}: ${error.msg}`;
};

const errorResponder = (req, res, path) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    const error = (errors.array() || [])[0];
    logger.log('error', error);
    res.status(400).send({
      message: error,
      success: false,
    })
  }
}

const pageNotFound = (req, res, next) => {
  res.locals.message = 'Page Not Found';
  res.locals.error = 'Page Not Found';
  res.status(404).render('error');
};

module.exports = {
  errorFormatter,
  errorResponder,
  pageNotFound,
};
