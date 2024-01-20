const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ErrorHandler = require("../../utils/errorHandler");
const Admin = require("../../models/Admin"); // Import Admin model
const CallCenter = require("../../models/CallCenter"); // Import CallCenter model
const Finance = require("../../models/Finance"); // Import Finance model

const activationController = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { activation_token } = req.body;

    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (!newUser) {
      return next(new ErrorHandler("Invalid token", 400));
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
        return next(new ErrorHandler("Invalid user role", 400));
    }

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Update the activated field to true
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
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = activationController;
