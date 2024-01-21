// Import required modules
const express = require("express");
const login = require("../../controllers/auth/login");
const logout = require("../../controllers/auth/logout");
const activationController = require("../../controllers/auth/activation");
const refreshToken = require("../../controllers/auth/refreshToken");
const resetPassword = require("../../controllers/auth/resetPassword");
const forgetPassword = require("../../controllers/auth/forgotPassword");
const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/activate", activationController);
router.post("/refreshToken", refreshToken);
router.post("/forgetPassword", forgetPassword);
router.post("/resetPassword", resetPassword);
module.exports = router;
