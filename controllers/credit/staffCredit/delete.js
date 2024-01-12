const { startSession } = require("mongoose");
const updateCredit = require("../../../service/credit/totalCredit/DailyCreditUpdate");
const StaffCredit = require("../../../models/credit/staffCreditSchema");
const Branch = require("../../../models/branchRelatedSchema/branchSchema");

const deleteCredit = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const { creditId } = req.params; // Assuming creditId is passed in the request parameters

    // Retrieve credit document to get the amount
    const creditToDelete = await StaffCredit.findById(creditId).session(
      session
    );

    if (!creditToDelete) {
      return res.status(404).json({
        message: "Credit document not found for the given ID.",
      });
    }

    // Update the total credit by reducing the amount (send negative of the credit amount)
    const negativeAmount = -parseFloat(creditToDelete.amount || 0);
    const branch = await Branch.findById(creditToDelete.branchId);
    await updateCredit(
      creditToDelete.branchId,
      "staffCredit",
      negativeAmount,
      session
    );

    if (creditToDelete.placement === "DeliveryGuy") {
      await updateDeliveryGuySalaryTable(
        branch.activeDeliverySalaryTable,
        creditToDelete.deliveryguyId,
        "totalCredit",
        negativeAmount,
        -negativeAmount,
        session
      );
    } else {
      await updateStaffSalaryTableEntry(
        branch.activeStaffSalarySheet,
        creditToDelete.employeeId,
        "totalCredit",
        negativeAmount,
        -negativeAmount,
        session
      );
    }

    // Delete the credit document from MongoDB
    await StaffCredit.findByIdAndDelete(creditId).session(session);

    await session.commitTransaction();
    session.endSession();

    // Respond with a success message
    res.status(200).json({ message: `StaffCredit Deleted successfully.` });
  } catch (error) {
    console.error(error);

    await session.abortTransaction();
    session.endSession();

    // Respond with an error message
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteCredit;
