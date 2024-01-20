const mongoose = require("mongoose");
const Staff = require("../../../models/staffSchema");
const Branch = require("../../../models/branchRelatedSchema/branchSchema");
const addNewStaffAndUpdateSalaryTable = require("../../../services/sheetRelated/create/addNewStaffAndUpdateSalaryTable");
const increaseNumberOfWorker = require("../../../services/branchRelated/increaseNumberOfWorker");

// Create a new staff member
const createStaffMember = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { sheetId, ...data } = req.body;
    data.paid = true;
    data.staffCredit = 0;
    data.salary = parseInt(data.salary);

    const newStaffMember = new Staff(data);

    if (sheetId) {
      const branch = await Branch.findOne({ _id: data.branchId });

      if (!branch) {
        throw new Error("Branch not found");
      }

      await addNewStaffAndUpdateSalaryTable(
        data.branchId,
        branch.activeSheet,
        newStaffMember._id,
        session
      );
    }
    await increaseNumberOfWorker(data.branchId, session);
    const savedStaffMember = await newStaffMember.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedStaffMember);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createStaffMember;
