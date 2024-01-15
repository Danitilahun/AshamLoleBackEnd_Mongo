const mongoose = require("mongoose");
const Wifi = require("../../../models/service/wifiSchema");

const getWifiInfo = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { branchId, deleteAfterGet } = req.body;

    if (!branchId) {
      return res.status(400).json({
        message: "Branch ID is required in the request body.",
      });
    }

    let wifiInfo = await Wifi.find({ branchId }).session(session);

    if (!wifiInfo || wifiInfo.length === 0) {
      return res.status(404).json({
        message: "No WiFi information found for the provided branch ID.",
      });
    }

    // Manipulate the data based on the 'deleteAfterGet' flag
    if (deleteAfterGet) {
      await Wifi.deleteMany({ branchId }).session(session);
    }

    // Order fields as per your specific requirements
    const result = wifiInfo.map((item) => {
      const { deliveryguyId, callcenterId, branchKey, branchId, ...rest } =
        item.toObject();

      return {
        Name: rest.name,
        OwnerName: rest.ownerName,
        Phone: rest.phone,
        CallcenterName: rest.callcenterName,
        BranchName: rest.branchName,
        DeliveryguyName: rest.deliveryguyName,
        AccountNumber: rest.accountNumber,
        BlockHouse: rest.blockHouse,
        Date: rest.date,
        FromWhere: rest.fromWhere,
        Status: rest.status,
      };
    });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      data: result,
      message: `WiFi information retrieved successfully.`,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getWifiInfo;
