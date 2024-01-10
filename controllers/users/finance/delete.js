const Finance = require("../../../models/user/financeschema");

// Delete a finance entry
const deleteFinanceEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFinanceEntry = await Finance.findByIdAndDelete(id);

    if (!deletedFinanceEntry) {
      return res.status(404).json({ message: "Finance entry not found" });
    }

    res.status(200).json({ message: "Finance entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteFinanceEntry;
