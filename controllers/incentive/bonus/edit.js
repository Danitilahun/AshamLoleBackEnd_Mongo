const Bonus = require("../../../models/incentive/bonusSchema");

// Edit an existing bonus
const editBonus = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedBonus = await Bonus.findByIdAndUpdate(id, data, { new: true });
    if (!updatedBonus) {
      return res.status(404).json({ message: "Bonus not found" });
    }

    res.status(200).json(updatedBonus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = editBonus;
