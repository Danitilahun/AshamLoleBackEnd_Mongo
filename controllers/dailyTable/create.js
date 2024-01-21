const mongoose = require("mongoose");
const Deliveryguy = require("../../models/deliveryguySchema");
const updateBranchWithSession = require("../../services/sheetRelated/updateBranchWithSession");
const Branch = require("../../models/branchRelatedSchema/branchSchema");
const DailyTable = require("../../models/table/DailyTable");
const CompanyWorks = require("../../models/table/work/companyWorksSchema");

const createDailyTable = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { branchId, sheetId, date } = req.body;

    const branch = await Branch.findById(branchId);

    if (branch.date === date) {
      return res.status(400).json({ message: "Daily table already created" });
    }
    // Fetch all delivery guys based on the given branchId
    const deliveryGuys = await Deliveryguy.find({ branchId }).session(session);

    // Create delivery guy work for each delivery guy
    const createdDeliveryGuyWorks = await Promise.all(
      deliveryGuys.map(async (deliveryGuy) => {
        const deliveryGuyWork = new CompanyWorks({});
        return deliveryGuyWork.save({ session });
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
      branchId: branchId,
      sheetId: sheetId,
    });

    const savedDailyTable = await dailyTable.save({ session });
    await updateBranchWithSession(
      branchId,
      {
        activeTable: savedDailyTable._id,
        date: date,
      },
      session
    );
    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedDailyTable);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

module.exports = createDailyTable;
