const Branch = require("../../models/branchRelatedSchema/branchSchema");

const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find();

    res.status(200).json({ success: true, data: branches });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = getAllBranches;
