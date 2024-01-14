const StaffSalaryTable = require("../../../models/table/salary/StaffSalaryTable");

// Controller function to get records based on branchId
const getStaffRecordsByBranchId = async (req, res) => {
  try {
    const { branchId } = req.params;

    const records = await StaffSalaryTable.find({ branchId });

    res.status(200).json({ success: true, records });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = getStaffRecordsByBranchId;
