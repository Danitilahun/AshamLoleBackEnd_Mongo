const mongoose = require("mongoose");

const Branch = require("../../models/branchRelatedSchema/branchSchema");
const BranchBankTotal = require("../../models/branchRelatedSchema/branchBankTotal");
const BranchSheetSummary = require("../../models/branchRelatedSchema/branchSheetSummarySchema");
const BranchTotalCredit = require("../../models/branchRelatedSchema/branchTotalCredit");
const DeliveryTurn = require("../../models/branchRelatedSchema/deliveryTurnSchema");

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
    ]);

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
