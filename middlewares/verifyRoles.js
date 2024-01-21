const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("Verifying user role", req.user);
    if (!req.user || !req.user.role) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User role not found" });
    }

    const userRole = req.user.role;

    if (allowedRoles.includes(userRole)) {
      console.log("User role is allowed");
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden: User role not permitted" });
    }
  };
};

module.exports = verifyRoles;
