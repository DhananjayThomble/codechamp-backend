const logger = require("../config/winston");

module.exports = (req, res, next) => {
  const start = Date.now();
  logger.info(`Received ${req.method} request for ${req.url}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(
      `Response sent with status code ${res.statusCode} in ${duration}ms`
    );
  });

  next();
};
