const mongoose = require("mongoose");
const Water = require("../../../models/service/waterSchema");

const getWaterInfo = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { branchId, deleteAfterGet } = req.body;

    if (!branchId) {
      return res.status(400).json({
        message: "Branch ID is required in the request body.",
      });
    }

    let waterInfo = await Water.find({ branchId }).session(session);

    if (!waterInfo || waterInfo.length === 0) {
      return res.status(404).json({
        message: "No Water information found for the provided branch ID.",
      });
    }

    // Manipulate the data based on the 'deleteAfterGet' flag
    if (deleteAfterGet) {
      await Water.deleteMany({ branchId }).session(session);
    }

    // Order fields as per your specific requirements
    const result = waterInfo.map((item) => {
      const {
        deliveryguyId,
        callcenterId,
        branchKey,
        branchId,
        customerKey,
        ...rest
      } = item.toObject();

      return {
        Name: rest.name,
        Phone: rest.phone,
        BlockHouse: rest.blockHouse,
        BillPayerName: rest.billPayerName,
        BranchName: rest.branchName,
        CallcenterName: rest.callcenterName,
        Date: rest.date,
        DeliveryguyName: rest.deliveryguyName,
        FromWhere: rest.fromWhere,
        Status: rest.status,
      };
    });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      data: result,
      message: `Water information retrieved successfully.`,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getWaterInfo;
