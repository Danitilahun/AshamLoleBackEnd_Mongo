const StaffCreditSchema = require("../../../models/credit/staffCreditSchema");

const getStaffCreditsByBranchId = async (req, res) => {
  try {
    const { branchId, page = 1 } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    const staffCredits = await StaffCreditSchema.find({ branchId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sorting based on createdAt timestamp, adjust as needed

    res.status(200).json(staffCredits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getStaffCreditsByBranchId;
