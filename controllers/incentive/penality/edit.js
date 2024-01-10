const Penalty = require("../../../models/incentive/penaltySchema");

// Edit an existing penalty
const editPenalty = async (req, res) => {
  try {
    const { id } = req.params;
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

    const updatedPenalty = await Penalty.findByIdAndUpdate(
      id,
      {
        active,
        amount,
        branchId,
        date,
        employeeId,
        employeeName,
        placement,
        reason,
      },
      { new: true }
    );

    if (!updatedPenalty) {
      return res.status(404).json({ message: "Penalty not found" });
    }

    res.status(200).json(updatedPenalty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = editPenalty;
