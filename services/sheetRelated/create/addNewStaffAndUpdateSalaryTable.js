const Staff = require("../../../models/staffSchema");
const StaffSalaryTable = require("../../../models/table/salary/StaffSalaryTable");
const StaffWorkerInfo = require("../../../models/table/work/staffWorkerInfoSchema");

const addNewStaffAndUpdateSalaryTable = async (
  branchId,
  sheetId,
  staffId,
  session
) => {
  try {
    // Create a StaffWorkerInfo document for the new staff member within the provided session
    const newStaffWork = new StaffWorkerInfo({});
    await newStaffWork.save({ session });

    // Get the ID of the created StaffWorkerInfo document
    const newStaffWorkId = newStaffWork._id;

    // Update the StaffSalaryTable with the new personWork entry
    const updatedSalaryTable = await StaffSalaryTable.findOneAndUpdate(
      { branchId, sheetID: sheetId },
      {
        $push: {
          personWork: {
            person: staffId,
            work: newStaffWorkId,
          },
        },
      },
      { new: true, session }
    );

    if (!updatedSalaryTable) {
      throw new Error("Failed to update StaffSalaryTable.");
    }

    return updatedSalaryTable; // Return the updated StaffSalaryTable
  } catch (error) {
    console.error(
      "Error in adding new staff member and updating salary table:",
      error
    );
    throw error;
  }
};

module.exports = addNewStaffAndUpdateSalaryTable;
