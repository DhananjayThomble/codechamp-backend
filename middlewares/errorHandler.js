module.exports = (err, req, res, next) => {
  const logger = require("../config/winston");
  logger.error(err.message, err);
  res.status(500).send("Something failed.");
};
