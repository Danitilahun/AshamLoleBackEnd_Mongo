const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const refreshToken = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.status(401).json({ message: "No JWT cookie found" });
    }

    const refreshToken = cookies.jwt;
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (
      !decodedToken ||
      !decodedToken.id ||
      !decodedToken.email ||
      !decodedToken.role
    ) {
      return res.status(403).json({ message: "Invalid decoded token" });
    }

    let foundUser;

    switch (decodedToken.role) {
      case process.env.ADMIN:
        foundUser = await Admin.findOne({
          _id: decodedToken.id,
          email: decodedToken.email,
        }).session(session);
        break;
      case process.env.SUPERADMIN:
        foundUser = await Superadmin.findOne({
          _id: decodedToken.id,
          email: decodedToken.email,
        }).session(session);
        break;
      case process.env.FINANCE:
        foundUser = await Finance.findOne({
          _id: decodedToken.id,
          email: decodedToken.email,
        }).session(session);
        break;
      case process.env.CALLCENTER:
        foundUser = await CallCenter.findOne({
          _id: decodedToken.id,
          email: decodedToken.email,
        }).session(session);
        break;
      default:
        await session.abortTransaction();
        session.endSession();
        return res.status(403).json({ message: "Invalid user role" });
    }

    if (!foundUser) {
      // Detected refresh token reuse
      await session.abortTransaction();
      session.endSession();
      return res
        .status(403)
        .json({ message: "Refresh token not found in the database" });
    }

    // Verify the JWT and proceed
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser.id,
          email: foundUser.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );

    const newRefreshToken = jwt.sign(
      { id: foundUser.id, email: foundUser.email, role: foundUser.role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await User.updateOne(
      { _id: foundUser.id },
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

    return res.status(200).json({
      message: "Token refreshed successfully",
      accessToken,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({
      message:
        error.message || "An error occurred while processing the request",
    });
  }
};

module.exports = refreshToken;
