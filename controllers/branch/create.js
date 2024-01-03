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

    const allDocs = await Dashboard.find({}).session(session);
    const firstDoc = allDocs.length > 0 ? allDocs[0] : null;

    if (firstDoc) {
      await Dashboard.findByIdAndUpdate(
        firstDoc._id,
        { $inc: { totalBudget: req.body.budget } },
        { new: true, session }
      );
    } else {
      throw new Error("No document found to update.");
    }

    print("Branch created successfully");

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
