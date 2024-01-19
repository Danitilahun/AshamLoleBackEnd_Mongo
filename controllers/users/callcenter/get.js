const CallCenter = require("path-to-your-call-center-model");

const getAllCallCenter = async (req, res) => {
  try {
    // Fetch all call center users from the database
    const allCallCenters = await CallCenter.find();

    // Respond with the retrieved call center users
    res.status(200).json({
      message: "All call center users retrieved successfully",
      callCenters: allCallCenters,
    });
  } catch (error) {
    // Handle errors, if any
    console.error("Error in getAllCallCenter:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getAllCallCenter;
