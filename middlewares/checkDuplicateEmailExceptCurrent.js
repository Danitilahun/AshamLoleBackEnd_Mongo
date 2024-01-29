const mongoose = require("mongoose");
const Superadmin = require("../models/user/superadminSchema");
const Finance = require("../models/user/financeschema");
const CallCenter = require("../models/user/callCenterSchema");
const Admin = require("../models/user/adminSchema");

const checkDuplicateEmailExceptCurrent = async function (req, res, next) {
  const { email } = req.body;
  const userId = req.params.id;

  if (!email) {
    return next();
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check in Superadmin
    let superadmin = await Superadmin.findOne({ email }).session(session);
    if (superadmin && superadmin._id.toString() !== userId) {
      throw new Error("Email is already in use");
    }

    // Check in Finance
    let finance = await Finance.findOne({ email }).session(session);
    if (finance && finance._id.toString() !== userId) {
      throw new Error("Email is already in use");
    }

    // Check in CallCenter
    let callCenter = await CallCenter.findOne({ email }).session(session);
    if (callCenter && callCenter._id.toString() !== userId) {
      throw new Error("Email is already in use");
    }

    // Check in Admin
    let admin = await Admin.findOne({ email }).session(session);
    if (admin && admin._id.toString() !== userId) {
      throw new Error("Email is already in use");
    }

    await session.commitTransaction();
    session.endSession();
    next();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({ error: error.message });
  }
};

module.exports = checkDuplicateEmailExceptCurrent;
