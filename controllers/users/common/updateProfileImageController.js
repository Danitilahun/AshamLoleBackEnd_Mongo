const Admin = require("../models/admin");
const CallCenter = require("../models/callCenter");
const Finance = require("../models/finance");
const SuperAdmin = require("../models/superAdmin");
const DeliveryGuy = require("../models/deliveryGuy");
const Staff = require("../models/staff");
const updateProfileImage = require("../path/to/updateProfileImage"); // Update the path accordingly

const updateProfileImageController = async (req, res) => {
  try {
    const { userId, newProfileImage } = req.body;
    const userType = req.userType;

    // Determine the model based on userType using a switch statement
    let userModel;
    switch (userType) {
      case "Admin":
        userModel = Admin;
        break;
      case "Callcenter":
        userModel = CallCenter;
        break;
      case "Finance":
        userModel = Finance;
        break;
      case "SuperAdmin":
        userModel = SuperAdmin;
        break;
      case "DeliveryGuy":
        userModel = DeliveryGuy;
        break;
      case "Staff":
        userModel = Staff;
        break;
      default:
        return res.status(400).json({ error: "Invalid userType" });
    }

    // Use the updateProfileImage function with the determined model
    const updatedUser = await updateProfileImage(
      req.session,
      userId,
      userModel,
      newProfileImage
    );

    // Send the updated user as a response
    res.json({
      message: "Profile image updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateProfileImageController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = updateProfileImageController;
