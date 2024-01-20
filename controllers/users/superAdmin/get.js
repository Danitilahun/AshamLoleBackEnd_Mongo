const mongoose = require("mongoose");
const Superadmin = require("../../../models/user/superadminSchema");

// Controller function to get the single superadmin
const getSuperAdmin = async (req, res) => {
  try {
    // Fetch the single superadmin document
    const superadmin = await Superadmin.findOne();

    // Check if superadmin document exists
    if (!superadmin) {
      return res.status(404).json({ message: "Superadmin not found" });
    }

    res.status(200).json({ superadmin });
  } catch (error) {
    console.error("Error in getSuperAdmin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getSuperAdmin;
