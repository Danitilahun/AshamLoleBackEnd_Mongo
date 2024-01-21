const jwt = require("jsonwebtoken");

const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.FORGET_PASSWORD_SECRET); // Replace YOUR_SECRET_KEY with your actual secret key
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = decodeToken;
