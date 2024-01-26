const Branch = require("../models/branchRelatedSchema/branchSchema");

const getSingleBranch = async (socket, branchId) => {
  try {
    const branch = await Branch.findById(branchId);
    if (!branch) {
      socket.emit("branchData", {
        success: false,
        message: "Branch not found",
      });
    } else {
      socket.emit("branchData", { success: true, data: branch });
    }
  } catch (error) {
    socket.emit("branchData", { success: false, error: error.message });
  }
};

module.exports = getSingleBranch;
