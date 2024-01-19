const Staff = require("../../../models/users/staff");

// Controller function to get all staff members by branchId
const getAllStaffByBranchId = async (req, res) => {
  try {
    const { branchId } = req.body;

    if (!branchId) {
      return res.status(400).json({ error: "BranchId is required." });
    }

    // Fetch all staff members matching the provided branchId
    const staffMembers = await Staff.find({ branchId });

    return res.status(200).json({ staffMembers });
  } catch (error) {
    console.error("Error in getAllStaffByBranchId:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getAllStaffByBranchId;
