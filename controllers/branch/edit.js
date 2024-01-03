const mongoose = require("mongoose");
const Branch = require("../../models/branchRelatedSchema/branchSchema");
const BranchSheetSummary = require("../../models/branchRelatedSchema/branchSheetSummarySchema");
const BranchDashboardData = require("../../models/branchRelatedSchema/branchDashboardDataSchema");
const BranchMoneyInformation = require("../../models/branchRelatedSchema/branchMoneyInformationSchema");
const Dashboard = require("../../models/dashboardSchema");

const editBranch = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const branchId = req.params.id; // Get branch ID from request params
    const updatedData = req.body; // Updated branch data from request body

    const branch = await Branch.findById(branchId).session(session);
    if (!branch) {
      throw new Error("Branch not found");
    }

    const prevBudget = branch.budget;
    const prevBranchName = branch.name;

    // Update the branch if there are changes
    if (updatedData.budget && updatedData.budget !== prevBudget) {
      branch.budget = updatedData.budget;
      await branch.save();
      // Update related documents based on branchId
      await BranchSheetSummary.findOneAndUpdate(
        { branchId },
        { budget: updatedData.budget },
        { session }
      );
      await Dashboard.findOneAndUpdate(
        {},
        { $inc: { totalBudget: updatedData.budget - prevBudget } },
        { session }
      );
    }

    if (updatedData.name && updatedData.name !== prevBranchName) {
      branch.name = updatedData.name;
      await branch.save();
      // Update related documents based on branchId
      await BranchDashboardData.findOneAndUpdate(
        { branchId },
        { BranchName: updatedData.name },
        { session }
      );
      await BranchMoneyInformation.findOneAndUpdate(
        { branchId },
        { BranchName: updatedData.name },
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
