const Staff = require("../../../models/staffSchema");
const StaffSalaryTable = require("../../../models/table/salary/StaffSalaryTable");
const StaffWorkerInfo = require("../../../models/table/work/staffWorkerInfoSchema");

const createStaffSalaryTable = async (branchId, sheetId, session) => {
  try {
    // Find multiple delivery guys within the provided session
    const deliveryGuys = await Staff.find({ branchId }).session(session);
    console.log("deliveryGuys", deliveryGuys, branchId);
    // Array to store personWork entries for all delivery guys
    const personWorkEntries = [];

    // Iterate through each delivery guy found within the session
    for (const deliveryGuy of deliveryGuys) {
      // Create a DeliveryGuyWork document with default values within the provided session
      const deliveryGuyWork = new StaffWorkerInfo({});

      // Save the DeliveryGuyWork document within the provided session
      await deliveryGuyWork.save({ session });

      // Get the ID of the created DeliveryGuyWork
      const deliveryGuyWorkId = deliveryGuyWork._id;

      // Add personWork entry for the current delivery guy to the array
      personWorkEntries.push({
        person: deliveryGuy._id,
        work: deliveryGuyWorkId,
      });
    }

    // Create a single DeliveryGuy15DayWorkSummary document with all personWork entries
    const summary = new StaffSalaryTable({
      personWork: personWorkEntries,
      branchId: branchId,
      sheetId: sheetId,
    });

    // Save the single DeliveryGuy15DayWorkSummary document within the provided session
    await summary.save({ session });

    return summary; // Return the created document with all personWork entries
  } catch (error) {
    console.error("Error in creating DeliveryGuy15DayWorkSummary:", error);
    throw error;
  }
};

module.exports = createStaffSalaryTable;
