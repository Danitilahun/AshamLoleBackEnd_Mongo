const mongoose = require("mongoose");
const DeliveryGuySalaryTable = require("../../models/table/salary/DeliveryGuySalaryTable");
const Sheet = require("../../models/sheetsSchema");

const getLatestFourSheets = async (req, res) => {
  try {
    // Retrieve the latest four documents based on branchId
    const { branchId } = req.params;
    const latestFourDocs = await DeliveryGuySalaryTable.find({ branchId })
      .sort({ createdAt: -1 })
      .limit(4)
      .exec();

    // Retrieve corresponding sheet details using sheet IDs
    const sheets = await Sheet.find({
      _id: { $in: latestFourDocs.map((doc) => doc.sheetId) },
    });

    // Create an array of objects with id and sheet details
    const result = latestFourDocs.map((doc) => ({
      id: doc._id,
      name: sheets.find((sheet) => sheet._id.equals(doc.sheetId)).name,
    }));

    // Send the result as JSON response
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getLatestFourSheets;
