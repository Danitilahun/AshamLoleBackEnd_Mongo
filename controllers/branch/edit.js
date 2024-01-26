const mongoose = require("mongoose");
const Branch = require("../../models/branchRelatedSchema/branchSchema");
const BranchSheetSummary = require("../../models/branchRelatedSchema/branchSheetSummarySchema");
const { getIoInstance } = require("../../socket");

const editBranch = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const io = getIoInstance();

  try {
    const branchId = req.params.id;
    const updatedData = req.body;

    // Update related documents based on branchId
    const newBranch = await Branch.findByIdAndUpdate(
      branchId,
      { $set: updatedData },
      { session, new: true }
    );

    if (!newBranch) {
      throw new Error("Branch not found");
    }

    await BranchSheetSummary.findOneAndUpdate(
      { branchId },
      { budget: updatedData.budget },
      { session }
    );

    io.emit("branchUpdated", newBranch);
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
