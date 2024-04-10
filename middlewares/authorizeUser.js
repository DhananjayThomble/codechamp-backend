const authorizeUser = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).send("Unauthorized");
    }
    next();
  };
};

module.exports = authorizeUser;
