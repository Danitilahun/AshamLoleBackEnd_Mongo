const Branch = require("../../../../models/branchRelatedSchema/branchSchema");
const Deliveryguy = require("../../../../models/deliveryguySchema");
const updateDeliveryGuySalaryTable = require("../../../../services/sheetRelated/update/updateDeliveryGuySalaryTable");

const DeliveryGuyHolidayBonus = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const data = req.body;
    const branch = await Branch.findById(data.branchId);

    // Check if all active delivery guys in the branch should receive the bonus
    const activeDeliveryGuys = await Deliveryguy.find({
      branchId: data.branchId,
      activeness: true,
    });

    if (activeDeliveryGuys.length === 0) {
      throw new Error("No active delivery guys found in the specified branch");
    }

    // Update the bonus for each active delivery guy in the salary table
    for (const deliveryGuy of activeDeliveryGuys) {
      await updateDeliveryGuySalaryTable(
        branch.activeDeliverySalaryTable,
        deliveryGuy._id,
        "bonus",
        parseFloat(data.amount ? data.amount : 0),
        parseFloat(data.amount ? data.amount : 0),
        session
      );
    }

    // Commit the transaction if successful
    await session.commitTransaction();
    session.endSession();

    // Respond with a success message
    res.status(200).json({
      message: "Bonus created successfully for all active delivery guys.",
    });
  } catch (error) {
    // Abort the transaction and end the session in case of an error
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    // Respond with an error message
    res.status(500).json({ message: error.message });
  }
};

module.exports = DeliveryGuyHolidayBonus;
