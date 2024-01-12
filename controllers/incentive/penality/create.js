const { startSession } = require("mongoose");
const updateDeliveryGuySalaryTable = require("../../../services/sheetRelated/update/updateDeliveryGuySalaryTable");
const updateStaffSalaryTableEntry = require("../../../services/sheetRelated/update/updateStaffSalaryTableEntry");
const Branch = require("../../../models/branchRelatedSchema/branchSchema");

// Create a new penalty
const createPenalty = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const data = req.body;
    const branch = await Branch.findById(data.branchId);

    // Create a new penalty document within the session

    const newPenalty = new Penalty(data);
    const savedPenalty = await newPenalty.save({ session });

    if (data.placement === "DeliveryGuy") {
      await updateDeliveryGuySalaryTable(
        branch.activeDeliverySalaryTable,
        data.employeeId,
        "penalty",
        parseFloat(data.amount ? data.amount : 0),
        -parseFloat(data.amount ? data.amount : 0),
        session
      );
    } else {
      await updateStaffSalaryTableEntry(
        branch.activeStaffSalarySheet,
        data.employeeId,
        "penalty",
        parseFloat(data.amount ? data.amount : 0),
        -parseFloat(data.amount ? data.amount : 0),
        session
      );
    }
    // Commit the transaction if successful
    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedPenalty);
  } catch (error) {
    // Abort the transaction and end the session in case of an error
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createPenalty;
