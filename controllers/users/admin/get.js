const Admin = require("path-to-your-admin-model");

const getAllAdmin = async (req, res) => {
  try {
    // Fetch all admin users from the database
    const allAdmins = await Admin.find();

    // Respond with the retrieved admin users
    res.status(200).json({
      message: "All admin users retrieved successfully",
      admins: allAdmins,
    });
  } catch (error) {
    // Handle errors, if any
    console.error("Error in getAllAdmin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getAllAdmin;
