const mongoose = require("mongoose");
const Deliveryguy = require("../../../models/deliveryguySchema");
const addNewDeliveryGuyAndUpdateSummary = require("../../../services/sheetRelated/create/addNewDeliveryGuyAndUpdateSummary");
const addNewDeliveryGuyAndUpdateSalaryTable = require("../../../services/sheetRelated/create/addNewDeliveryGuyAndUpdateSalaryTable");
const addDeliveryGuyToDailyTable = require("../../../services/sheetRelated/create/addDeliveryGuyToDailyTable");

// Create a new delivery guy
const createDeliveryGuy = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { activeTable, sheetId, ...data } = req.body;
    data.activeness = false;
    data.paid = true;
    data.waiting = false;
    data.dailyCredit = 0;

    const newDeliveryGuy = new Deliveryguy(data);

    if (sheetId) {
      await addNewDeliveryGuyAndUpdateSalaryTable(
        data.branchId,
        activeTable,
        newDeliveryGuy._id,
        session
      );

      await addNewDeliveryGuyAndUpdateSummary();
    }

    if (activeTable) {
      await addDeliveryGuyToDailyTable();
    }

    const savedDeliveryGuy = await newDeliveryGuy.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedDeliveryGuy);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createDeliveryGuy;
