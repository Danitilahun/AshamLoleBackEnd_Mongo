const DeliveryGuySalaryTable = require("../../../models/table/salary/DeliveryGuySalaryTable");

// Controller function to get records based on sheetId
const getRecordsBySheetId = async (req, res) => {
  try {
    const { sheetId } = req.params;

    const records = await DeliveryGuySalaryTable.find({ sheetId });

    res.status(200).json({ success: true, records });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = getRecordsBySheetId;