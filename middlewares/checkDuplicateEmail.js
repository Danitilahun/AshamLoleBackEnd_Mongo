const mongoose = require("mongoose");
const Superadmin = require("../models/user/superadminSchema");
const Finance = require("../models/user/financeschema");
const CallCenter = require("../models/user/callCenterSchema");
const Admin = require("../models/user/adminSchema");

const checkDuplicateSuperadminEmail = async function (req, res, next) {
  const { email } = req.body;

  if (!email) {
    return next();
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let superadmin = await Superadmin.findOne({ email }).session(session);
    if (superadmin) {
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

const checkDuplicateFinanceEmail = async function (req, res, next) {
  const { email } = req.body;

  if (!email) {
    return next();
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let finance = await Finance.findOne({ email }).session(session);
    if (finance) {
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

const checkDuplicateCallCenterEmail = async function (req, res, next) {
  const { email } = req.body;

  if (!email) {
    return next();
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let callCenter = await CallCenter.findOne({ email }).session(session);
    if (callCenter) {
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

const checkDuplicateAdminEmail = async function (req, res, next) {
  const { email } = req.body;

  if (!email) {
    return next();
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let admin = await Admin.findOne({ email }).session(session);
    if (admin) {
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

module.exports = {
  checkDuplicateSuperadminEmail,
  checkDuplicateFinanceEmail,
  checkDuplicateCallCenterEmail,
  checkDuplicateAdminEmail,
};
