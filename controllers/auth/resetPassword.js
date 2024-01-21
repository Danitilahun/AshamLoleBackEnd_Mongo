const Admin = require("../../models/user/adminSchema");
const Superadmin = require("../../models/user/superadminSchema");
const Finance = require("../../models/user/financeschema");
const CallCenter = require("../../models/user/callCenterSchema");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const decodeToken = require("../../util/decodeToken");

const resetPassword = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: "Token, newPassword, and confirmPassword are required",
      });
    }

    // Decode token to get user id and role
    const decodedToken = decodeToken(token);

    if (!decodedToken || !decodedToken.id || !decodedToken.role) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ message: "Invalid token" });
    }

    let user;

    switch (decodedToken.role) {
      case process.env.ADMIN:
        user = await Admin.findById(decodedToken.id).session(session);
        break;
      case process.env.SUPERADMIN:
        user = await Superadmin.findById(decodedToken.id).session(session);
        break;
      case process.env.FINANCE:
        user = await Finance.findById(decodedToken.id).session(session);
        break;
      case process.env.CALLCENTER:
        user = await CallCenter.findById(decodedToken.id).session(session);
        break;
      default:
        await session.abortTransaction();
        session.endSession();
        return res.status(403).json({ message: "Invalid user role" });
    }

    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "User not found" });
    }

    // Validate passwords
    if (newPassword !== confirmPassword) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    user.password = hashedPassword;

    // Save the updated user
    await user.save();

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: error.message });
  }
};

module.exports = resetPassword;
