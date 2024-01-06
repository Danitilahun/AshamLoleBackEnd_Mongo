const Essential = require("../../models/essentialSchema");

const createEssentials = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({
        message:
          "Request body is missing or empty. Please refresh your browser and try again.",
      });
    }

    // Create a new instance of the EssentialSchema model
    const newEssential = new Essential({
      address: data.address,
      company: data.company,
      name: data.name,
      phone: data.phone,
      sector: data.sector,
    });

    // Save the new essential document to MongoDB
    await newEssential.save();

    // Respond with a success message
    res
      .status(200)
      .json({ message: "Essential document created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = createEssentials;
