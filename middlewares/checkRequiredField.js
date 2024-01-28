const checkRequiredField = (fieldName) => (req, res, next) => {
  if (!req.body || !req.body[fieldName] || req.body[fieldName].trim() === "") {
    return res.status(400).json({
      message: `Request body must include a non-empty '${fieldName}' field`,
    });
  }
  next();
};

module.exports = checkRequiredField;
