const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/user/adminSchema");
const Superadmin = require("../../models/user/superadminSchema");
const Finance = require("../../models/user/financeschema");
const CallCenter = require("../../models/user/callCenterSchema");
const { default: mongoose } = require("mongoose");

const login = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password } = req.body;
    let potentialUser;
    let User;

    if (!potentialUser) {
      potentialUser = await Admin.findOne({ email }).session(session);
      User = Admin;
    }

    if (!potentialUser) {
      potentialUser = await Superadmin.findOne({ email }).session(session);
      User = Superadmin;
    }

    if (!potentialUser) {
      potentialUser = await Finance.findOne({ email }).session(session);
      User = Finance;
    }

    if (!potentialUser) {
      potentialUser = await CallCenter.findOne({ email }).session(session);
      User = CallCenter;
    }

    if (!potentialUser) {
      throw new Error("User not found");
    }

    const isSamePass = await bcrypt.compare(password, potentialUser.password);

    if (!isSamePass) {
      throw new Error("Incorrect password");
    }

    let user = {
      id: potentialUser.id,
      email: potentialUser.email,
      role: potentialUser.role,
    };
    const accessToken = jwt.sign(
      {
        User: user,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const newRefreshToken = jwt.sign(
      {
        User: user,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await User.updateOne(
      { _id: potentialUser.id },
      { $set: { refreshToken: newRefreshToken } }
    ).session(session);

    await session.commitTransaction();
    session.endSession();

    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      loggedIn: true,
      accessToken: accessToken,
      user: potentialUser,
      message: "Login successful",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({
      loggedIn: false,
      message: error.message,
    });
  }
};

module.exports = login;
