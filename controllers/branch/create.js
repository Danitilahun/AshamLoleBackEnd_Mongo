const mongoose = require("mongoose");
const Branch = require("../../models/branchRelatedSchema/branchSchema");
const BranchBankTotal = require("../../models/branchRelatedSchema/branchBankTotal");
const BranchSheetSummary = require("../../models/branchRelatedSchema/branchSheetSummarySchema");
const BranchTotalCredit = require("../../models/branchRelatedSchema/branchTotalCredit");
const DeliveryTurn = require("../../models/branchRelatedSchema/deliveryTurnSchema");
const BranchIncomeFromSource = require("../../models/branchRelatedSchema/branchIncomeFromSourceSchema");
const BranchDashboardData = require("../../models/branchRelatedSchema/branchDashboardDataSchema");
const BranchMoneyInformation = require("../../models/branchRelatedSchema/branchMoneyInformationSchema");

const createBranch = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const branchData = req.body; // Branch data from request body
    const newBranch = await Branch.create([branchData], { session }); // Create Branch

    const branchId = newBranch[0]._id; // Get the ID of the newly created Branch

    // Create related models using the Branch ID
    await BranchBankTotal.create([{ branchId }], { session });
    await BranchSheetSummary.create([{ branchId, budget: req.body.budget }], {
      session,
    });
    await BranchTotalCredit.create([{ branchId }], { session });
    await DeliveryTurn.create([{ branchId }], { session });
    await BranchIncomeFromSource.create([{ branchId }], { session });
    await BranchDashboardData.create(
      [{ branchId, BranchName: req.body.name }],
      { session }
    );
    await BranchMoneyInformation.create(
      [
        {
          branchId,
          uniqueName: newBranch[0].uniqueName,
          BranchName: req.body.name,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Branch and related data created successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = createBranch;
