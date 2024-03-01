const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Admin = require("../../models/user/adminSchema");
const CallCenter = require("../../models/user/callCenterSchema");
const Finance = require("../../models/user/financeschema");

const activationController = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { activation_token } = req.body;

    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (!newUser) {
      res.status(400).json({ error: "Invalid token" });
    }

    const { id, role, email } = newUser;

    let user;

    // Switch case to find the user based on role
    switch (role) {
      case process.env.ADMIN:
        user = await Admin.findOne({ _id: id, email }).session(session).exec();
        break;
      case process.env.CALLCENTER:
        user = await CallCenter.findOne({ _id: id, email })
          .session(session)
          .exec();
        break;
      case process.env.FINANCE:
        user = await Finance.findOne({ _id: id, email })
          .session(session)
          .exec();
        break;
      default:
        res.status(400).json({ error: "Invalid role" });
    }

    if (!user) {
      res.status(400).json({ error: "User does not exist" });
    }

    user.activated = true;
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: `Your account has been successfully activated. You can now log in to your account and start exploring our platform.`,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: error.message });
  }
};

module.exports = activationController;
