const StaffSalaryTable = require("../../../models/table/salary/StaffSalaryTable");
const StaffWorkerInfo = require("../../../models/table/work/staffWorkerInfoSchema");

const updateStaffSalaryTableEntry = async (
  staffSalaryTableId,
  staffId,
  incrementFields,
  session
) => {
  try {
    // Find the StaffSalaryTable entry by its unique identifier
    const staffSalaryTableEntry = await StaffSalaryTable.findById(
      staffSalaryTableId
    ).session(session);

    if (!staffSalaryTableEntry) {
      throw new Error("StaffSalaryTable entry not found for the given id");
    }

    // Find the PersonWorkSchema for the given staffId
    const personWork = staffSalaryTableEntry.personWork.find(
      (entry) => entry.person.toString() === staffId
    );

    if (!personWork) {
      throw new Error("PersonWorkSchema not found for the given staff");
    }

    // Get the StaffWorkerInfo ID from PersonWorkSchema
    const staffWorkerInfoId = personWork.work;

    // Find the StaffWorkerInfo using the ID
    const staffWorkerInfo = await StaffWorkerInfo.findById(
      staffWorkerInfoId
    ).session(session);

    if (!staffWorkerInfo) {
      throw new Error("StaffWorkerInfo not found for the given staff");
    }

    // Use $inc to atomically increment the specified fields in StaffWorkerInfo
    const updateObj = {};
    for (const [fieldName, incrementValue] of Object.entries(incrementFields)) {
      updateObj[fieldName] = incrementValue;
    }

    // Update the specified fields atomically using $inc
    await StaffWorkerInfo.findByIdAndUpdate(
      staffWorkerInfoId,
      { $inc: updateObj },
      { session }
    );

    // Increment the 'total' field in StaffSalaryTable
    staffSalaryTableEntry.markModified("personWork");
    await staffSalaryTableEntry.save({ session });

    return { message: "StaffSalaryTable entry updated successfully" };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = updateStaffSalaryTableEntry;
