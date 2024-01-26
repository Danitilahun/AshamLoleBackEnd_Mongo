const Admin = require("../../models/user/adminSchema");
const Superadmin = require("../../models/user/superadminSchema");
const Finance = require("../../models/user/financeschema");
const CallCenter = require("../../models/user/callCenterSchema");

const logout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.status(400).json({ message: "No JWT cookie found" });
    }

    const refreshToken = cookies.jwt;

    let foundUser;
    let User;

    foundUser = await Admin.findOne({ refreshToken });
    User = Admin;

    if (!foundUser) {
      foundUser = await Superadmin.findOne({ refreshToken });
      User = Superadmin;
    }

    if (!foundUser) {
      foundUser = await Finance.findOne({ refreshToken });
      User = Finance;
    }

    if (!foundUser) {
      foundUser = await CallCenter.findOne({ refreshToken });
      User = CallCenter;
    }

    if (!foundUser) {
      return res.status(403).json({ message: "Invalid user role" });
    }

    foundUser.refreshToken = null;
    console.log(foundUser);
    await User.findByIdAndUpdate(
      foundUser._id,
      { $set: { refreshToken: null } },
      { new: true }
    );

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    return res
      .status(200)
      .json({ message: "Successfully logged out", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = logout;
