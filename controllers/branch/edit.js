const mongoose = require("mongoose");
const Branch = require("../../models/branchRelatedSchema/branchSchema");
const BranchSheetSummary = require("../../models/branchRelatedSchema/branchSheetSummarySchema");

const editBranch = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const branchId = req.params.id;
    const updatedData = req.body;

    const branch = await Branch.findById(branchId).session(session);
    if (!branch) {
      throw new Error("Branch not found");
    }

    const prevBudget = branch.budget;

    // Update the branch if there are changes
    if (updatedData.budget && updatedData.budget !== prevBudget) {
      // Update related documents based on branchId
      await BranchSheetSummary.findOneAndUpdate(
        { branchId },
        { budget: updatedData.budget },
        { session }
      );
    }

    await session.commitTransaction();

    Object.keys(updatedData).forEach((key) => {
      if (branch[key] !== undefined) {
        branch[key] = updatedData[key];
      }
    });

    await branch.save();

    res.status(200).json({
      success: true,
      message: "Branch updated successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ success: false, error: error.message });
  } finally {
    session.endSession();
  }
};

module.exports = editBranch;
