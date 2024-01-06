const Essential = require("../../models/essentialSchema");

const editEssentials = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the document ID is passed in the URL parameters
    const data = req.body;

    if (!data) {
      return res.status(400).json({
        message:
          "Request body is missing or empty. Please refresh your browser and try again.",
      });
    }

    // Find the document by ID and update it
    const updatedEssential = await Essential.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedEssential) {
      return res.status(404).json({ message: "Essential document not found." });
    }

    res
      .status(200)
      .json({
        message: "Essential document updated successfully.",
        updatedEssential,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = editEssentials;
