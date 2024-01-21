const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.sendStatus(401);
    }
    const userRole = req.user.role;
    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      return res.sendStatus(401);
    }
  };
};

module.exports = verifyRoles;
