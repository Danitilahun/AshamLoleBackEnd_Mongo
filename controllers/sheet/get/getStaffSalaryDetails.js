const mongoose = require("mongoose");
const StaffSalaryTable = require("../../../models/table/salary/StaffSalaryTable");
const Staff = require("../../../models/staffSchema");
const StaffWorkerInfo = require("../../../models/table/work/staffWorkerInfoSchema");

const getStaffSalaryDetails = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    const salaryTable = await StaffSalaryTable.findById(id).session(session);

    if (!salaryTable) {
      return res.status(404).json({
        message: "StaffSalaryTable not found for the provided ID.",
      });
    }

    const result = [];

    // Iterate over personWork array and fetch additional details
    for (const item of salaryTable.personWork) {
      const { person, work } = item;

      // Fetch details from Staff model within the session
      const staff = await Staff.findById(person).session(session);

      // Fetch details from StaffWorkerInfo model within the session
      const staffWorkerInfo = await StaffWorkerInfo.findById(work).session(
        session
      );

      // Add relevant details to the result array
      result.push({
        name: staff.fullName,
        uniqueName: staff.uniqueName,
        addbonus: staffWorkerInfo.addbonus,
        bonus: staffWorkerInfo.bonus,
        fixedSalary: staffWorkerInfo.fixedSalary,
        penality: staffWorkerInfo.penality,
        holidayBonus: staffWorkerInfo.holidayBonus,
        totalCredit: staffWorkerInfo.totalCredit,
        total: staffWorkerInfo.total,
        workId: work,
      });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      data: result,
      message: `StaffSalary details retrieved successfully.`,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getStaffSalaryDetails;
