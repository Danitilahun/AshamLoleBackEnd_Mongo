const Branch = require("../../../../models/branchRelatedSchema/branchSchema");
const updateStaffSalaryTableEntry = require("../../../../services/sheetRelated/update/updateStaffSalaryTableEntry");

const StaffHolidayBonus = async (req, res) => {
  const session = await startSession();
  session.startTransaction();
  try {
    const data = req.body;

    const branch = await Branch.findById(data.branchId);

    await updateStaffSalaryTableEntry(
      branch.activeStaffSalarySheet,
      data.employeeId,
      "holidayBonus",
      parseFloat(data.amount ? data.amount : 0),
      parseFloat(data.amount ? data.amount : 0),
      session
    );
    // Commit the transaction if successful
    await session.commitTransaction();
    session.endSession();

    // Respond with a success message
    res.status(200).json({ message: `Bonus Created successfully.` });
  } catch (error) {
    // Abort the transaction and end the session in case of an error
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    // Respond with an error message
    res.status(500).json({ message: error.message });
  }
};

module.exports = StaffHolidayBonus;
