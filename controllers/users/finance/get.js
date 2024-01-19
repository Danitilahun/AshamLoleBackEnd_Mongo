const Finance = require("../../../models/user/financeschema");

const getAllFinance = async (req, res) => {
  try {
    // Fetch all finance records from the database
    const financeRecords = await Finance.find();

    // Respond with the retrieved finance records
    res.status(200).json({
      message: "Finance records retrieved successfully",
      financeRecords,
    });
  } catch (error) {
    // Handle errors, if any
    console.error("Error in getAllFinance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getAllFinance;
