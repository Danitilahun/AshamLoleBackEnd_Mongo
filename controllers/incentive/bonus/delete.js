const Bonus = require("../../../models/incentive/bonusSchema");

// Delete a bonus
const deleteBonus = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBonus = await Bonus.findByIdAndDelete(id);

    if (!deletedBonus) {
      return res.status(404).json({ message: "Bonus not found" });
    }

    res.status(200).json({ message: "Bonus deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteBonus;
