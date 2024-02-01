const mongoose = require("mongoose");
const StaffSalaryTable = require("../models/table/salary/StaffSalaryTable");
const Staff = require("../models/staffSchema");
const StaffWorkerInfo = require("../models/table/work/staffWorkerInfoSchema");

const getStaffSalaryDetails = async (socket, id) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Retrieve StaffSalaryTable by ID within the session
    const salaryTable = await StaffSalaryTable.findById(id).session(session);

    if (!salaryTable) {
      throw new Error("StaffSalaryTable not found for the provided ID.");
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
      const workDetails = {
        name: staff.fullName,
        uniqueName: staff.uniqueName,
        addBonus: staffWorkerInfo.addBonus,
        bonus: staffWorkerInfo.bonus,
        fixedSalary: staffWorkerInfo.fixedSalary,
        penalty: staffWorkerInfo.penalty,
        holidayBonus: staffWorkerInfo.holidayBonus,
        totalCredit: staffWorkerInfo.totalCredit,
        total: staffWorkerInfo.total,
        workId: work,
      };

      result.push(workDetails);
    }

    await session.commitTransaction();
    session.endSession();

    // Emit the result to the socket
    socket.emit("staffSalaryDetails", { success: true, data: result });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);

    // Emit the error to the socket
    socket.emit("staffSalaryDetails", {
      success: false,
      error: error.message,
    });
  }
};

module.exports = getStaffSalaryDetails;
