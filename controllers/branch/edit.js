const mongoose = require("mongoose");
const Branch = require("../../models/branchRelatedSchema/branchSchema");
const BranchSheetSummary = require("../../models/branchRelatedSchema/branchSheetSummarySchema");

const editBranch = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const branchId = req.params.id;
    const updatedData = req.body;

    // Update related documents based on branchId
    const prevBudget = await Branch.findByIdAndUpdate(
      branchId,
      { $set: updatedData },
      { session, new: true }
    );

    if (!prevBudget) {
      throw new Error("Branch not found");
    }

    // Check if budget has changed
    if (updatedData.budget && updatedData.budget !== prevBudget.budget) {
      await BranchSheetSummary.findOneAndUpdate(
        { branchId },
        { budget: updatedData.budget },
        { session }
      );
    }

    await session.commitTransaction();

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
