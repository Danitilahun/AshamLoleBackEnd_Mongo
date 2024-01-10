const Penalty = require("../../../models/incentive/penaltySchema");
// Create a new penalty
const createPenalty = async (req, res) => {
  try {
    const {
      active,
      amount,
      branchId,
      date,
      employeeId,
      employeeName,
      placement,
      reason,
    } = req.body;

    const newPenalty = new Penalty({
      active,
      amount,
      branchId,
      date,
      employeeId,
      employeeName,
      placement,
      reason,
    });

    const savedPenalty = await newPenalty.save();
    res.status(201).json(savedPenalty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createPenalty;
