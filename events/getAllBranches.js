const Branch = require("../models/branchRelatedSchema/branchSchema");

const getAllBranches = async (socket) => {
  try {
    const branches = await Branch.find();
    socket.emit("allBranchesData", { success: true, data: branches });
  } catch (error) {
    socket.emit("allBranchesData", { success: false, error: error.message });
  }
};

module.exports = getAllBranches;
