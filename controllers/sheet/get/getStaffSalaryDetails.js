const mongoose = require("mongoose");
const StaffSalaryTable = require("../models/StaffSalaryTable");
const StaffWorkerInfo = require("../models/StaffWorkerInfo");
const Staff = require("../models/Staff");

const getStaffSalaryDetails = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params; // Assuming the ID is passed in the request parameters

    // Retrieve StaffSalaryTable by ID within the session
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
        fullName: staff.fullName,
        phone: staff.phone,
        totalCredit: staffWorkerInfo.totalCredit,
        // Add other relevant fields from Staff and StaffWorkerInfo models
        // Add other fields from the salaryTable if needed
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
