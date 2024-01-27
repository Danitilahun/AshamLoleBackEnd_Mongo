const mongoose = require("mongoose");
const Branch = require("../../models/branchRelatedSchema/branchSchema");
const BranchBankTotal = require("../../models/branchRelatedSchema/branchBankTotal");
const BranchSheetSummary = require("../../models/branchRelatedSchema/branchSheetSummarySchema");
const BranchTotalCredit = require("../../models/branchRelatedSchema/branchTotalCredit");
const DeliveryTurn = require("../../models/branchRelatedSchema/deliveryTurnSchema");
const { getIoInstance } = require("../../socket");

const createBranch = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const io = getIoInstance();

  try {
    const branchData = req.body; // Branch data from request body
    console.log(branchData);
    const newBranch = await Branch.create([branchData], { session }); // Create Branch
    const branchId = newBranch[0]._id; // Get the ID of the newly created Branch
    await BranchBankTotal.create([{ branchId }], { session });
    await BranchSheetSummary.create([{ branchId, budget: req.body.budget }], {
      session,
    });
    await BranchTotalCredit.create([{ branchId }], { session });
    await DeliveryTurn.create([{ branchId }], { session });

    console.log("new", newBranch);
    io.emit("branchCreated", newBranch[0]);
    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: "Branch and related data created successfully",
    });
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    res.status(500).json({ success: false, error: error.message });
  } finally {
    session.endSession();
  }
};

module.exports = createBranch;
