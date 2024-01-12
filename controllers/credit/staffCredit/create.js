const { startSession } = require("mongoose");
const StaffCredit = require("../../../models/credit/staffCreditSchema");
const updateCredit = require("../../../services/creditRelated/updateCredit");
const updateDeliveryGuySalaryTable = require("../../../services/sheetRelated/update/updateDeliveryGuySalaryTable");
const Branch = require("../../../models/branchRelatedSchema/branchSchema");

const createStaffCredit = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const data = req.body;
    if (!data || !data.branchId || !data.active) {
      return res.status(400).json({
        message:
          "Request body is missing or empty. Please refresh your browser and try again.",
      });
    }

    // Create a new staff credit document in MongoDB
    data.date = new Date();
    await StaffCredit.create([data], { session });

    // Update the total credit using the provided function

    await updateCredit(
      data.branchId,
      "staffCredit",
      parseFloat(data.amount ? data.amount : 0),
      session
    );

    if (data.placement === "DeliveryGuy") {
      const branch = await Branch.findById(existingExpenseCredit.branchId);
      await updateDeliveryGuySalaryTable(
        branch.activeDeliverySalaryTable,
        data.deliveryguyId,
        "staffCredit",
        parseFloat(data.amount ? data.amount : 0),
        parseFloat(data.amount ? data.amount : 0),
        session
      );
    }

    await session.commitTransaction();
    session.endSession();

    // Respond with a success message
    res.status(200).json({ message: `StaffCredit created successfully.` });
  } catch (error) {
    console.error(error);

    await session.abortTransaction();
    session.endSession();

    // Respond with an error message
    res.status(500).json({ message: error.message });
  }
};

module.exports = createStaffCredit;
