const mongoose = require("mongoose");
const Deliveryguy = require("../../../models/deliveryguySchema");
const addNewDeliveryGuyAndUpdateSummary = require("../../../services/sheetRelated/create/addNewDeliveryGuyAndUpdateSummary");
const addNewDeliveryGuyAndUpdateSalaryTable = require("../../../services/sheetRelated/create/addNewDeliveryGuyAndUpdateSalaryTable");
const addDeliveryGuyToDailyTable = require("../../../services/sheetRelated/create/addDeliveryGuyToDailyTable");
const increaseNumberOfWorker = require("../../../services/branchRelated/increaseNumberOfWorker");
const { getIoInstance } = require("../../../socket");

// Create a new delivery guy
const createDeliveryGuy = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const io = getIoInstance();

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

      await addNewDeliveryGuyAndUpdateSummary(
        data.branchId,
        sheetId,
        newDeliveryGuy._id,
        session
      );
    }

    if (activeTable) {
      await addDeliveryGuyToDailyTable(
        data.branchId,
        activeTable,
        newDeliveryGuy._id,
        session
      );
    }

    await increaseNumberOfWorker(data.branchId, session);

    const savedDeliveryGuy = await newDeliveryGuy.save({ session });

    console.log(savedDeliveryGuy);
    io.emit("deliveryGuyCreated", savedDeliveryGuy);
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
