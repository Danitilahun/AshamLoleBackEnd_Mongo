const StaffSalaryTable = require("../../../models/table/salary/StaffSalaryTable");
const StaffWorkerInfo = require("../../../models/table/work/staffWorkerInfoSchema");

const addNewStaffAndUpdateSalaryTable = async (tableId, staffId, session) => {
  try {
    // Create a StaffWorkerInfo document for the new staff member within the provided session
    const newStaffWork = new StaffWorkerInfo({});
    await newStaffWork.save({ session });

    // Get the ID of the created StaffWorkerInfo document
    const newStaffWorkId = newStaffWork._id;

    // Update the StaffSalaryTable with the new personWork entry using findByIdAndUpdate
    const updatedSalaryTable = await StaffSalaryTable.findByIdAndUpdate(
      tableId, // Find StaffSalaryTable based on the provided `tableId`
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
      "Error in adding a new staff member and updating the salary table:",
      error
    );
    throw error;
  }
};

module.exports = addNewStaffAndUpdateSalaryTable;
