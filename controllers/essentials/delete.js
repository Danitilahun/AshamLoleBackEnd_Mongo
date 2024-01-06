const Essential = require("../../models/essentialSchema");

const deleteEssentials = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the document ID is passed in the URL parameters

    // Find the document by ID and delete it
    const deletedEssential = await Essential.findByIdAndDelete(id);

    if (!deletedEssential) {
      return res.status(404).json({ message: "Essential document not found." });
    }

    res
      .status(200)
      .json({
        message: "Essential document deleted successfully.",
        deletedEssential,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteEssentials;
