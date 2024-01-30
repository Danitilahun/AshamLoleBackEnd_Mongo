const Sheet = require("../../models/sheetsSchema");
const { getIoInstance } = require("../../socket");

// Delete a sheet
const deleteSheet = async (req, res) => {
  const io = getIoInstance();
  try {
    const { id } = req.params;
    const deletedSheet = await Sheet.findByIdAndDelete(id);

    if (!deletedSheet) {
      return res.status(404).json({ message: "Sheet not found" });
    }

    io.emit("sheetDeleted", id);
    res.status(200).json({ message: "Sheet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteSheet;
