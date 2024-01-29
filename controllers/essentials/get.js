const Essential = require("../../models/essentialSchema");

const getAllEssentials = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters or default to 1
    const limit = 5; // Number of documents to retrieve per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip
    const totalDocs = await Essential.countDocuments(); // Get the total count of documents

    const essentials = await Essential.find()
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

    console.log("essentials", essentials);
    res.status(200).json({
      page,
      totalPages: Math.ceil(totalDocs / limit),
      count: essentials.length,
      data: essentials,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllEssentials;
