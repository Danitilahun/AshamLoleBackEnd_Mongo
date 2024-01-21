const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      // If req.user or req.user.role does not exist, send 401 Unauthorized
      return res.sendStatus(401);
    }

    const userRole = req.user.role;

    if (allowedRoles.includes(userRole)) {
      // If user's role is in the allowedRoles array, proceed to the next middleware
      next();
    } else {
      // If user's role is not in the allowedRoles array, send 401 Unauthorized
      return res.sendStatus(401);
    }
  };
};

module.exports = verifyRoles;
