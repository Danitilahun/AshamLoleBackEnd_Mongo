const { startSession } = require("mongoose");
const updateDeliveryGuySalaryTable = require("../../../services/sheetRelated/update/updateDeliveryGuySalaryTable");
const updateStaffSalaryTableEntry = require("../../../services/sheetRelated/update/updateStaffSalaryTableEntry");
const Branch = require("../../../models/branchRelatedSchema/branchSchema");

// Edit an existing penalty
const editPenalty = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const data = req.body;
    const branch = await Branch.findById(data.branchId);

    // Find the existing penalty document by ID within the session
    const existingPenalty = await Penalty.findById(id).session(session);

    if (!existingPenalty) {
      throw new Error("Penalty not found for the given ID");
    }

    // Calculate the difference in penalty amounts
    const penaltyDifference =
      parseFloat(data.amount ? data.amount : 0) - existingPenalty.amount;

    // Update the existing penalty document with new data
    Object.assign(existingPenalty, data);
    const updatedPenalty = await existingPenalty.save({ session });

    // Update the salary table based on placement with the difference
    if (data.placement === "DeliveryGuy") {
      await updateDeliveryGuySalaryTable(
        branch.activeDeliverySalaryTable,
        data.employeeId,
        "penalty",
        penaltyDifference,
        -penaltyDifference,
        session
      );
    } else {
      await updateStaffSalaryTableEntry(
        branch.activeStaffSalarySheet,
        data.employeeId,
        "penalty",
        penaltyDifference,
        -penaltyDifference,
        session
      );
    }

    // Commit the transaction if successful
    await session.commitTransaction();
    session.endSession();

    res.status(200).json(updatedPenalty);
  } catch (error) {
    // Abort the transaction and end the session in case of an error
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = editPenalty;
