const { startSession } = require("mongoose");
const updateDeliveryGuySalaryTable = require("../../../services/sheetRelated/update/updateDeliveryGuySalaryTable");
const updateStaffSalaryTableEntry = require("../../../services/sheetRelated/update/updateStaffSalaryTableEntry");
const Branch = require("../../../models/branchRelatedSchema/branchSchema");

// Delete a penalty
const deletePenalty = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    // Find the existing penalty document by ID within the session
    const deletedPenalty = await Penalty.findByIdAndDelete(id).session(session);
    const branch = await Branch.findById(deletedPenalty.branchId);
    if (!deletedPenalty) {
      // Abort the transaction and end the session if penalty not found
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Penalty not found" });
    }

    // Update the salary table based on placement with the negative penalty amount
    if (deletedPenalty.placement === "DeliveryGuy") {
      await updateDeliveryGuySalaryTable(
        branch.activeDeliverySalaryTable,
        deletedPenalty.employeeId,
        "penalty",
        -deletedPenalty.amount,
        -deletedPenalty.amount,
        session
      );
    } else {
      await updateStaffSalaryTableEntry(
        branch.activeStaffSalarySheet,
        deletedPenalty.employeeId,
        "penalty",
        -deletedPenalty.amount,
        -deletedPenalty.amount,
        session
      );
    }

    // Commit the transaction if successful
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Penalty deleted successfully" });
  } catch (error) {
    // Abort the transaction and end the session in case of an error
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = deletePenalty;
