const Admin = require("../../models/user/adminSchema");
const Superadmin = require("../../models/user/superadminSchema");
const Finance = require("../../models/user/financeschema");
const CallCenter = require("../../models/user/callCenterSchema");
const createActivationToken = require("../../util/createActivationToken");
const sendMail = require("../../util/sendMail");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let foundUser;

    if (process.env.ADMIN === req.body.role) {
      foundUser = await Admin.findOne({ email });
    }

    if (!foundUser && process.env.SUPERADMIN === req.body.role) {
      foundUser = await Superadmin.findOne({ email });
    }

    if (!foundUser && process.env.FINANCE === req.body.role) {
      foundUser = await Finance.findOne({ email });
    }

    if (!foundUser && process.env.CALLCENTER === req.body.role) {
      foundUser = await CallCenter.findOne({ email });
    }

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const forgetPasswordToken = createActivationToken({
      id: foundUser._id,
      role: foundUser.role,
    });

    const resetPasswordUrl = `http://localhost:3000/reset-password/${forgetPasswordToken}`;

    try {
      await sendMail({
        email: foundUser.email,
        subject: "Reset Your Password",
        message: `Hello ${foundUser.fullName}, please click on the link to reset your password: ${resetPasswordUrl}`,
      });

      return res.status(200).json({
        message: "Password reset email sent successfully",
      });
    } catch (error) {
      throw new Error("Email could not be sent");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = forgotPassword;
