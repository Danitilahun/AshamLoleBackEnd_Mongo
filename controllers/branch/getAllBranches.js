const Branch = require("../../models/branchRelatedSchema/branchSchema");

const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find({}, "name _id"); // Retrieve only 'name' and '_id' fields
    res.status(200).json(branches);
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllBranches;
