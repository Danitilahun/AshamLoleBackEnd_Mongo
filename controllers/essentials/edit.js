const Essential = require("../../models/essentialSchema");
const { getIoInstance } = require("../../socket");

const editEssentials = async (req, res) => {
  const io = getIoInstance();
  try {
    const { id } = req.params;
    const data = req.body;

    if (!data) {
      throw new Error(
        "Request body is missing or empty. Please refresh your browser and try again."
      );
    }

    // Find the document by ID and update it
    const updatedEssential = await Essential.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedEssential) {
      throw new Error("Essential document not found");
    }

    io.emit("essentialUpdated", updatedEssential);

    res.status(200).json({
      message: "Essential document updated successfully.",
      updatedEssential,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = editEssentials;
