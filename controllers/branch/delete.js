const mongoose = require("mongoose");

const Branch = require("../../models/branchRelatedSchema/branchSchema");
const BranchBankTotal = require("../../models/branchRelatedSchema/branchBankTotal");
const BranchSheetSummary = require("../../models/branchRelatedSchema/branchSheetSummarySchema");
const BranchTotalCredit = require("../../models/branchRelatedSchema/branchTotalCredit");
const DeliveryTurn = require("../../models/branchRelatedSchema/deliveryTurnSchema");
const BranchIncomeFromSource = require("../../models/branchRelatedSchema/branchIncomeFromSourceSchema");
const BranchDashboardData = require("../../models/branchRelatedSchema/branchDashboardDataSchema");
const BranchMoneyInformation = require("../../models/branchRelatedSchema/branchMoneyInformationSchema");
const Dashboard = require("../../models/dashboardSchema");

const deleteBranch = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const branchId = req.params.id; // Get branch ID from request params

    // Delete branch-related documents based on branch ID
    await Promise.all([
      BranchBankTotal.deleteOne({ branchId }, { session }),
      BranchSheetSummary.deleteOne({ branchId }, { session }),
      BranchTotalCredit.deleteOne({ branchId }, { session }),
      DeliveryTurn.deleteOne({ branchId }, { session }),
      BranchIncomeFromSource.deleteOne({ branchId }, { session }),
      BranchDashboardData.deleteOne({ branchId }, { session }),
      BranchMoneyInformation.deleteOne({ branchId }, { session }),
    ]);

    // Find the dashboard and decrease the totalBudget
    const dashboard = await Dashboard.findOne({}).session(session);
    if (dashboard) {
      const branch = await Branch.findById(branchId).session(session);
      if (branch) {
        await Dashboard.findByIdAndUpdate(
          dashboard._id,
          { $inc: { totalBudget: -branch.budget } },
          { new: true, session }
        );
      }
    } else {
      throw new Error("Dashboard not found");
    }

    // Delete the branch
    await Branch.findByIdAndDelete(branchId).session(session);

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: "Branch and related data deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ success: false, error: error.message });
  } finally {
    session.endSession();
  }
};

module.exports = deleteBranch;
