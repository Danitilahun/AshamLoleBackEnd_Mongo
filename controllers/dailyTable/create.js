const mongoose = require("mongoose");
const Deliveryguy = require("../../models/deliveryguySchema");
const DeliveryGuyWork = require("../../models/deliveryGuyWorkSchema");
const DailyTable = require("../../models/DailyTable");

const createDailyTable = async (req, res) => {
  try {
    const { branchId, sheetId } = req.body;

    // Fetch all delivery guys based on the given branchId
    const deliveryGuys = await Deliveryguy.find({ branchId });

    // Create delivery guy work for each delivery guy
    const createdDeliveryGuyWorks = await Promise.all(
      deliveryGuys.map(async (deliveryGuy) => {
        const deliveryGuyWork = new DeliveryGuyWork({});
        return deliveryGuyWork.save();
      })
    );

    // Create PersonWorkSchema for each delivery guy
    const personWorkEntries = deliveryGuys.map((deliveryGuy, index) => ({
      person: deliveryGuy._id, // Assuming _id is the Delivery Guy ID
      work: createdDeliveryGuyWorks[index]._id, // Using the generated Delivery Guy Work ID
    }));

    // Create DailyTable entry
    const dailyTable = new DailyTable({
      personWork: personWorkEntries,
      branchId,
      sheetId,
    });

    const savedDailyTable = await dailyTable.save();
    res.status(201).json(savedDailyTable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createDailyTable;
