const mongoose = require("mongoose");

const Branch = require("../../models/branchRelatedSchema/branchSchema");
const BranchBankTotal = require("../../models/branchRelatedSchema/branchBankTotal");
const BranchSheetSummary = require("../../models/branchRelatedSchema/branchSheetSummarySchema");
const BranchTotalCredit = require("../../models/branchRelatedSchema/branchTotalCredit");
const DeliveryTurn = require("../../models/branchRelatedSchema/deliveryTurnSchema");
const { getIoInstance } = require("../../socket");

const deleteBranch = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const io = getIoInstance();
      const branchId = req.params.id;

      await Promise.all([
        BranchBankTotal.deleteOne({ branchId }, { session }),
        BranchSheetSummary.deleteOne({ branchId }, { session }),
        BranchTotalCredit.deleteOne({ branchId }, { session }),
        DeliveryTurn.deleteOne({ branchId }, { session }),
      ]);

      await Branch.findByIdAndDelete(branchId).session(session);

      io.emit("branchDeleted", branchId);
    });

    res.status(200).json({
      success: true,
      message: "Branch and related data deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    session.endSession();
  }
};

module.exports = deleteBranch;
