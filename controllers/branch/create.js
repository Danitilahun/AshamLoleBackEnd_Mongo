const mongoose = require("mongoose");

const Branch = require("../../models/branchRelatedSchema/branchSchema");
const BranchBankTotal = require("../../models/branchRelatedSchema/branchBankTotal");
const BranchSheetSummary = require("../../models/branchRelatedSchema/branchSheetSummarySchema");
const BranchTotalCredit = require("../../models/branchRelatedSchema/branchTotalCredit");
const DeliveryTurn = require("../../models/branchRelatedSchema/deliveryTurnSchema");

const createBranch = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const branchData = req.body; // Branch data from request body
    const newBranch = await Branch.create([branchData], { session }); // Create Branch
    const branchId = newBranch[0]._id; // Get the ID of the newly created Branch
    await BranchBankTotal.create([{ branchId }], { session });
    await BranchSheetSummary.create([{ branchId, budget: req.body.budget }], {
      session,
    });
    await BranchTotalCredit.create([{ branchId }], { session });
    await DeliveryTurn.create([{ branchId }], { session });

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: "Branch and related data created successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ success: false, error: error.message });
  } finally {
    session.endSession();
  }
};

module.exports = createBranch;
