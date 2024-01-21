const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/user/adminSchema");
const Superadmin = require("../../models/user/superadminSchema");
const Finance = require("../../models/user/financeschema");
const CallCenter = require("../../models/user/callCenterSchema");

const login = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let potentialUser;

    if (!req.body.email || !req.body.password) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const { email, password } = req.body;

    let User; // Declare User variable

    if (process.env.ADMIN === req.body.role) {
      potentialUser = await Admin.findOne({ email }).session(session);
      User = Admin; // Set User to Admin model
    } else if (process.env.SUPERADMIN === req.body.role) {
      potentialUser = await Superadmin.findOne({ email }).session(session);
      User = Superadmin; // Set User to Superadmin model
    } else if (process.env.FINANCE === req.body.role) {
      potentialUser = await Finance.findOne({ email }).session(session);
      User = Finance; // Set User to Finance model
    } else if (process.env.CALLCENTER === req.body.role) {
      potentialUser = await CallCenter.findOne({ email }).session(session);
      User = CallCenter; // Set User to CallCenter model
    } else {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ message: "Invalid user role" });
    }
    if (!potentialUser) {
      await session.abortTransaction();
      session.endSession();
      res.json({
        loggedIn: false,
        status: "Wrong username or password!",
        message: "Username not found",
      });
      console.log("Username not found");
      return;
    }

    const isSamePass = await bcrypt.compare(password, potentialUser.password);

    if (!isSamePass) {
      await session.abortTransaction();
      session.endSession();
      res.json({
        loggedIn: false,
        status: "Wrong username or password!",
        message: "Invalid password or username",
      });
      console.log("Invalid password");
      return;
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: potentialUser.id,
          email: potentialUser.email,
          role: potentialUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const newRefreshToken = jwt.sign(
      {
        id: potentialUser.id,
        username: potentialUser.username,
        role: potentialUser.role,
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
    console.error("Error logging in:", error);
    res.status(500).json({
      loggedIn: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = login;
