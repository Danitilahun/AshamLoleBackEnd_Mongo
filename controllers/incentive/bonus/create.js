const { startSession } = require("mongoose");
const Bonus = require("../../../models/incentive/bonusSchema");
const updateDeliveryGuySalaryTable = require("../../../services/sheetRelated/update/updateDeliveryGuySalaryTable");
const updateStaffSalaryTableEntry = require("../../../services/sheetRelated/update/updateStaffSalaryTableEntry");
const Branch = require("../../../models/branchRelatedSchema/branchSchema");

// Create a new bonus
const createBonus = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const data = req.body;
    const branch = await Branch.findById(data.branchId);
    // Create a new bonus document within the session

    const newBonus = new Bonus(data);
    const savedBonus = await newBonus.save({ session });

    if (data.placement === "DeliveryGuy") {
      await updateDeliveryGuySalaryTable(
        branch.activeDeliverySalaryTable,
        data.deliveryguyId,
        "bonus",
        parseFloat(data.amount ? data.amount : 0),
        -parseFloat(data.amount ? data.amount : 0),
        session
      );
    } else {
      await updateStaffSalaryTableEntry(
        branch.activeStaffSalarySheet,
        data.employeeId,
        "bonus",
        parseFloat(data.amount ? data.amount : 0),
        -parseFloat(data.amount ? data.amount : 0),
        session
      );
    }
    // Commit the transaction if successful
    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedBonus);
  } catch (error) {
    // Abort the transaction and end the session in case of an error
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createBonus;
