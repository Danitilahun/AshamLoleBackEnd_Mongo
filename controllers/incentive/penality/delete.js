const Penalty = require("../../../models/incentive/penaltySchema");

// Delete a penalty
const deletePenalty = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPenalty = await Penalty.findByIdAndDelete(id);

    if (!deletedPenalty) {
      return res.status(404).json({ message: "Penalty not found" });
    }

    res.status(200).json({ message: "Penalty deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deletePenalty;
