const Sheet = require("../../models/sheetsSchema");

// Delete a sheet
const deleteSheet = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSheet = await Sheet.findByIdAndDelete(id);

    if (!deletedSheet) {
      return res.status(404).json({ message: "Sheet not found" });
    }

    res.status(200).json({ message: "Sheet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteSheet;
