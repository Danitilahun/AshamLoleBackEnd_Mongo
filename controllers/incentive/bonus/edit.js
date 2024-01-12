const { startSession } = require("mongoose");
const Bonus = require("../../../models/incentive/bonusSchema");
const updateDeliveryGuySalaryTable = require("../../../services/sheetRelated/update/updateDeliveryGuySalaryTable");
const updateStaffSalaryTableEntry = require("../../../services/sheetRelated/update/updateStaffSalaryTableEntry");
const Branch = require("../../../models/branchRelatedSchema/branchSchema");

// Edit an existing bonus
const editBonus = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const data = req.body;
    const branch = await Branch.findById(data.branchId);

    // Find the existing bonus document by ID within the session
    const existingBonus = await Bonus.findById(id).session(session);

    if (!existingBonus) {
      throw new Error("Bonus not found for the given ID");
    }

    // Calculate the difference in bonus values
    const bonusDifference =
      parseFloat(data.amount ? data.amount : 0) - existingBonus.amount;

    // Update the existing bonus document with new data
    Object.assign(existingBonus, data);
    const updatedBonus = await existingBonus.save({ session });

    // Update the salary table based on placement with the difference
    if (data.placement === "DeliveryGuy") {
      await updateDeliveryGuySalaryTable(
        branch.activeDeliverySalaryTable,
        data.deliveryguyId,
        "bonus",
        bonusDifference,
        -bonusDifference,
        session
      );
    } else {
      await updateStaffSalaryTableEntry(
        branch.activeStaffSalarySheet,
        data.employeeId,
        "bonus",
        bonusDifference,
        -bonusDifference,
        session
      );
    }

    // Commit the transaction if successful
    await session.commitTransaction();
    session.endSession();

    res.status(200).json(updatedBonus);
  } catch (error) {
    // Abort the transaction and end the session in case of an error
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = editBonus;
