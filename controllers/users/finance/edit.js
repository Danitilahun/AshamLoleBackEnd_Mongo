const Finance = require("../../../models/user/financeschema");

// Edit an existing finance entry
const editFinanceEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };
    const updatedFinanceEntry = await Finance.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedFinanceEntry) {
      return res.status(404).json({ message: "Finance entry not found" });
    }

    res.status(200).json(updatedFinanceEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = editFinanceEntry;
