const Branch = require("../../models/branchRelatedSchema/branchSchema");

const checkPreviousSheetStatus = async (branchId) => {
  try {
    const prevBranch = await Branch.findById(branchId); // Find branch by ID
    if (prevBranch && prevBranch.sheetStatus === "Pending") {
      return {
        message:
          "Unable to create a new sheet. Please complete the pending sheet before creating a new one. If you've already completed it, please notify the finance department for further assistance.",
        type: "info",
      };
    }
    return null; // If no error and branch is not 'Pending'
  } catch (error) {
    console.error("Error in checkPreviousSheetStatus:", error);
    throw new Error("Internal server error"); // Re-throw the error to be handled at the caller's level
  }
};

module.exports = checkPreviousSheetStatus;
