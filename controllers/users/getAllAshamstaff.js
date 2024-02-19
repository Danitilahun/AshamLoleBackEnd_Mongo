const AshamStaff = require("../../models/ashamStaffSchema");

// Controller function to get all ashamstaff
const getAllAshamstaff = async (req, res) => {
  try {
    // Fetch all ashamstaff from the database
    const ashamstaff = await AshamStaff.find();

    // If there are no ashamstaff found, return an empty array
    if (!ashamstaff) {
      return res.status(404).json({ message: "No ashamstaff found" });
    }

    // If ashamstaff are found, return them
    res.status(200).json(ashamstaff);
  } catch (error) {
    // If an error occurs, return an error response
    console.error("Error fetching ashamstaff:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllAshamstaff };
