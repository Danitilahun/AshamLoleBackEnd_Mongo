// Middleware to check if the request has a body
const checkRequestBody = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: "Request body is missing or empty" });
  }
  next();
};

module.exports = checkRequestBody;
