const Branch = require("../../models/branchRelatedSchema/branchSchema");

const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find(
      {
        managerId: null,
        managerName: "",
      },
      "name _id"
    );
    res.status(200).json(branches);
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllBranches;
