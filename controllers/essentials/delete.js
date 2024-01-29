const Essential = require("../../models/essentialSchema");
const { getIoInstance } = require("../../socket");

const deleteEssentials = async (req, res) => {
  const io = getIoInstance();
  try {
    const { id } = req.params; // Assuming the document ID is passed in the URL parameters

    // Find the document by ID and delete it
    const deletedEssential = await Essential.findByIdAndDelete(id);

    if (!deletedEssential) {
      throw new Error("Essential document not found");
    }

    io.emit("essentialDeleted", id);

    res.status(200).json({
      message: "Essential document deleted successfully.",
      deletedEssential,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteEssentials;
