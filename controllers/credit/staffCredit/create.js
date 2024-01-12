const { startSession } = require("mongoose");
const StaffCredit = require("../../../models/credit/staffCreditSchema");
const updateCredit = require("../../../services/creditRelated/updateCredit");
const updateDeliveryGuySalaryTable = require("../../../services/sheetRelated/update/updateDeliveryGuySalaryTable");
const Branch = require("../../../models/branchRelatedSchema/branchSchema");
const checkTotal = require("../../../services/creditRelated/checkTotal");
const DeliveryGuySalaryTable = require("../../../models/table/salary/DeliveryGuySalaryTable");
const DeliveryGuyWork = require("../../../models/table/work/deliveryGuyWorkSchema");
const updateStaffSalaryTableEntry = require("../../../services/sheetRelated/update/updateStaffSalaryTableEntry");
const StaffSalaryTable = require("../../../models/table/salary/StaffSalaryTable");
const StaffWorkerInfo = require("../../../models/table/work/staffWorkerInfoSchema");

const createStaffCredit = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const data = req.body;
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
        StaffWorkerInfo,
        session
      );
    }

    if (employeCredit < data.amount) {
      return res.status(400).json({
        message: "Credit amount is greater than the total credit.",
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
      await updateDeliveryGuySalaryTable(
        branch.activeDeliverySalaryTable,
        data.deliveryguyId,
        "totalCredit",
        parseFloat(data.amount ? data.amount : 0),
        -parseFloat(data.amount ? data.amount : 0),
        session
      );
    } else {
      await updateStaffSalaryTableEntry(
        branch.activeStaffSalarySheet,
        data.employeeId,
        "totalCredit",
        parseFloat(data.amount ? data.amount : 0),
        -parseFloat(data.amount ? data.amount : 0),
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
