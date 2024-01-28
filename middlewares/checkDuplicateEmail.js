const mongoose = require("mongoose");
const Superadmin = require("../models/user/superadminSchema");
const Finance = require("../models/user/financeschema");
const CallCenter = require("../models/user/callCenterSchema");
const Admin = require("../models/user/adminSchema");

const checkDuplicateEmail = async function (req, res, next) {
  const { email } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check in Superadmin
    let superadmin = await Superadmin.findOne({ email }).session(session);
    if (superadmin) {
      throw new Error("Email is already in use");
    }

    // Check in Finance
    let finance = await Finance.findOne({ email }).session(session);
    if (finance) {
      throw new Error("Email is already in use");
    }

    // Check in CallCenter
    let callCenter = await CallCenter.findOne({ email }).session(session);
    if (callCenter) {
      throw new Error("Email is already in use");
    }

    // Check in Admin
    let admin = await Admin.findOne({ email }).session(session);
    if (admin) {
      throw new Error("Email is already in use");
    }

    // If email is not found in any schema, commit the transaction and move to the next middleware
    await session.commitTransaction();
    session.endSession();
    next();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({ error: error.message });
  }
};

module.exports = checkDuplicateEmail;
