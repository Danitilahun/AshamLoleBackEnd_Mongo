const StaffSalaryTable = require("../../../models/table/salary/StaffSalaryTable");

// Controller function to get records based on sheetId
const getStaffRecordsBySheetId = async (req, res) => {
  try {
    const { sheetId } = req.params;

    const records = await StaffSalaryTable.find({ sheetId });

    res.status(200).json({ success: true, records });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = getStaffRecordsBySheetId;
