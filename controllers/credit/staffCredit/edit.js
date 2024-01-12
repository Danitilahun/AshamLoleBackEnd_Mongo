const { startSession } = require("mongoose");
const StaffCredit = require("../../../models/credit/staffCreditSchema");
const updateCredit = require("../../../services/creditRelated/updateCredit");
const Branch = require("../../../models/branchRelatedSchema/branchSchema");

const editStaffCredit = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const data = req.body;
    const { creditId } = req.params; // Assuming creditId is passed in the request parameters
    // Retrieve previous staff credit document
    const prevCredit = await StaffCredit.findById(creditId).session(session);
    if (!prevCredit) {
      return res.status(404).json({
        message: "Staff credit document not found for the given ID.",
      });
    }

    const amountDifference = data.amount - prevCredit.amount;

    const branch = await Branch.findById(data.branchId);
    let employeCredit;
    if (data.placement === "DeliveryGuy") {
      employeCredit = await checkTotal(
        branch.activeDeliverySalaryTable,
        data.employeeId,
        DeliveryGuySalaryTable,
        DeliveryGuyWork,
        session
      );
    } else {
      employeCredit = await checkTotal(
        branch.activeStaffSalarySheet,
        data.employeeId,
        StaffSalaryTable,
        StaffWork,
        session
      );
    }

    if (employeCredit < amountDifference) {
      return res.status(400).json({
        message: "Credit amount is greater than the total credit.",
      });
    }
    // Update the staff credit document in MongoDB
    await StaffCredit.findByIdAndUpdate(creditId, data, { session });

    // Send integer differences to updateCredit function
    await updateCredit(data.branchId, "staffCredit", amountDifference, session);

    if (data.placement === "DeliveryGuy") {
      await updateDeliveryGuySalaryTable(
        branch.activeDeliverySalaryTable,
        data.deliveryguyId,
        "totalCredit",
        amountDifference,
        -amountDifference,
        session
      );
    } else {
      await updateStaffSalaryTableEntry(
        branch.activeStaffSalarySheet,
        data.employeeId,
        "totalCredit",
        amountDifference,
        -amountDifference,
        session
      );
    }

    await session.commitTransaction();
    session.endSession();

    // Respond with a success message
    res.status(200).json({ message: `StaffCredit Updated successfully.` });
  } catch (error) {
    console.error(error);

    await session.abortTransaction();
    session.endSession();

    // Respond with an error message
    res.status(500).json({ message: error.message });
  }
};

module.exports = editStaffCredit;
