const StaffSalaryTable = require("../../models/table/salary/StaffSalaryTable");
const StaffWorkerInfo = require("../../models/table/work/staffWorkerInfoSchema");

const calculateAndUpdateTotalStaffSalaryTable = async (
  branchId,
  sheetId,
  session
) => {
  try {
    // Retrieve StaffSalaryTable document by branchId and sheetId
    const staffSalaryTable = await StaffSalaryTable.findOne({
      branchId,
      sheetId,
    }).session(session);

    if (!staffSalaryTable) {
      throw new Error(
        "StaffSalaryTable document not found for the given branchId and sheetId"
      );
    }

    // Iterate over personWork, summing up the corresponding values from StaffWorkerInfo
    let totalStaffWorkerInfo = {
      bonus: 0,
      fixedSalary: 0,
      totalCredit: 0,
      penality: 0,
      holidayBonus: 0,
      total: 0,
    };

    for (const personWork of staffSalaryTable.personWork) {
      // Get StaffWorkerInfo based on personWork.work
      const staffWorkerInfo = await StaffWorkerInfo.findById(
        personWork.work
      ).session(session);

      if (staffWorkerInfo) {
        // Sum up the values
        totalStaffWorkerInfo.bonus += staffWorkerInfo.bonus;
        totalStaffWorkerInfo.fixedSalary += staffWorkerInfo.fixedSalary;
        totalStaffWorkerInfo.totalCredit += staffWorkerInfo.totalCredit;
        totalStaffWorkerInfo.penality += staffWorkerInfo.penality;
        totalStaffWorkerInfo.holidayBonus += staffWorkerInfo.holidayBonus;
        totalStaffWorkerInfo.total += staffWorkerInfo.total;
      }
    }

    // Return the calculated total StaffWorkerInfo
    return totalStaffWorkerInfo;
  } catch (error) {
    throw new Error(
      `Error calculating and updating StaffSalaryTable: ${error.message}`
    );
  }
};

module.exports = calculateAndUpdateTotalStaffSalaryTable;
