const Branch = require("../../models/branchRelatedSchema/branchSchema");

const fetchBranches = async (req, res) => {
  try {
    const branches = await Branch.find(
      {},
      "name _id activeStaffSalarySheet activeTable"
    );

    // Transform the branches array before sending the response
    const transformedBranches = branches.map((branch) => ({
      id: branch._id,
      name: branch.name,
      active: branch.activeStaffSalarySheet,
      activeTable: branch.activeTable,
    }));

    res.status(200).json(transformedBranches);
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = fetchBranches;
