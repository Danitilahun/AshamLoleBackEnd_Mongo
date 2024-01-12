const { startSession } = require("mongoose");
const Bonus = require("../../../models/incentive/bonusSchema");
const updateDeliveryGuySalaryTable = require("../../../services/sheetRelated/update/updateDeliveryGuySalaryTable");
const updateStaffSalaryTableEntry = require("../../../services/sheetRelated/update/updateStaffSalaryTableEntry");
const Branch = require("../../../models/branchRelatedSchema/branchSchema");

// Delete a bonus
const deleteBonus = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    // Find the existing bonus document by ID within the session
    const deletedBonus = await Bonus.findByIdAndDelete(id).session(session);
    const branch = await Branch.findById(deletedBonus.branchId);
    if (!deletedBonus) {
      // Abort the transaction and end the session if bonus not found
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Bonus not found" });
    }

    // Update the salary table based on placement with the negative bonus amount
    if (deletedBonus.placement === "DeliveryGuy") {
      await updateDeliveryGuySalaryTable(
        branch.activeDeliverySalaryTable,
        deletedBonus.employeeId,
        "bonus",
        -deletedBonus.amount,
        -deletedBonus.amount,
        session
      );
    } else {
      await updateStaffSalaryTableEntry(
        branch.activeStaffSalarySheet,
        deletedBonus.employeeId,
        "bonus",
        -deletedBonus.amount,
        -deletedBonus.amount,
        session
      );
    }

    // Commit the transaction if successful
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Bonus deleted successfully" });
  } catch (error) {
    // Abort the transaction and end the session in case of an error
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteBonus;
