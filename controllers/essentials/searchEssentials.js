const Essential = require("../../models/essentialSchema");

const searchEssentials = async (req, res) => {
  try {
    const { param, value } = req.query;
    console.log("param", param);
    console.log("value", value);
    if (!value) {
      return;
    }

    // Update the regex to match values starting with the provided string
    const searchQuery = {};
    searchQuery[param] = { $regex: new RegExp(`^${value}`, "i") };

    const searchResults = await Essential.find(searchQuery);

    console.log("searchResults", searchResults);
    res.status(200).json({
      success: true,
      count: searchResults.length,
      data: searchResults,
    });
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = searchEssentials;
