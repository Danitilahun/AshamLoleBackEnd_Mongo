const mongoose = require("mongoose");
const Asbeza = require("../../../models/service/asbezaSchema");

const getAsbezaInfo = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { branchId, deleteAfterGet } = req.body;

    if (!branchId) {
      return res.status(400).json({
        message: "Branch ID is required in the request body.",
      });
    }

    let asbezaInfo = await Asbeza.find({ branchId }).session(session);

    if (!asbezaInfo || asbezaInfo.length === 0) {
      return res.status(404).json({
        message: "No Asbeza information found for the provided branch ID.",
      });
    }

    // Manipulate the data based on the 'deleteAfterGet' flag
    if (deleteAfterGet) {
      await Asbeza.deleteMany({ branchId }).session(session);
    }

    // Order fields as per your specific requirements
    const result = asbezaInfo.map((item) => {
      const { deliveryguyId, callcenterId, branchKey, branchId, ...rest } =
        item.toObject();

      // Convert the 'order' array to a comma-separated string
      rest.order = rest.order.join(", ");

      return {
        Name: rest.name,
        Phone: rest.phone,
        BlockHouse: rest.blockHouse,
        AdditionalInfo: rest.additionalInfo,
        FromWhere: rest.fromWhere,
        Order: rest.order,
        CallcenterName: rest.callcenterName,
        BranchName: rest.branchName,
        DeliveryguyName: rest.deliveryguyName,
        Date: rest.date,
        Status: rest.status,
      };
    });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      data: result,
      message: `Asbeza information retrieved successfully.`,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAsbezaInfo;
