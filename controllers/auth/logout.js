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

    foundUser = await Admin.findOne({ refreshToken });

    if (!foundUser) {
      foundUser = await Superadmin.findOne({ refreshToken });
    }

    if (!foundUser) {
      foundUser = await Finance.findOne({ refreshToken });
    }

    if (!foundUser) {
      foundUser = await CallCenter.findOne({ refreshToken });
    }

    if (!foundUser) {
      return res.status(403).json({ message: "Invalid user role" });
    }

    // Delete refreshToken in the database
    foundUser.refreshToken = null;
    await foundUser.save();

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    return res
      .status(200)
      .json({ message: "Successfully logged out", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = logout;
