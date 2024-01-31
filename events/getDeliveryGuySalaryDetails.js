const mongoose = require("mongoose");
const DeliveryGuySalaryTable = require("../../../models/table/salary/DeliveryGuySalaryTable");
const Deliveryguy = require("../../../models/deliveryguySchema");
const DeliveryGuyWork = require("../../../models/table/work/deliveryGuyWorkSchema");

const getDeliveryGuySalaryDetails = async (socket, id) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Retrieve DeliveryGuySalaryTable by ID within the session
    const salaryTable = await DeliveryGuySalaryTable.findById(id).session(
      session
    );

    if (!salaryTable) {
      throw new Error("DeliveryGuySalaryTable not found for the provided ID.");
    }

    const result = [];

    // Iterate over personWork array and fetch additional details
    for (const item of salaryTable.personWork) {
      const { person, work } = item;

      // Fetch details from Deliveryguy model within the session
      const deliveryGuy = await Deliveryguy.findById(person).session(session);

      // Fetch details from DeliveryGuyWork model within the session
      const deliveryGuyWork = await DeliveryGuyWork.findById(work).session(
        session
      );

      // Add relevant details to the result array
      const workDetails = {
        name: deliveryGuy.fullName,
        uniqueName: deliveryGuy.uniqueName,
        asbeza: deliveryGuyWork.asbeza,
        cardCollect: deliveryGuyWork.cardCollect,
        cardDistribute: deliveryGuyWork.cardDistribute,
        cardFee: deliveryGuyWork.cardFee,
        wifiCollect: deliveryGuyWork.wifiCollect,
        waterDistribute: deliveryGuyWork.waterDistribute,
        wifiDistribute: deliveryGuyWork.wifiDistribute,
        waterCollect: deliveryGuyWork.waterCollect,
        bonus: deliveryGuyWork.bonus,
        penalty: deliveryGuyWork.penalty,
        fixedSalary: deliveryGuyWork.fixedSalary,
        holidayBonus: deliveryGuyWork.holidayBonus,
        hotelProfit: deliveryGuyWork.hotelProfit,
        totalCredit: deliveryGuyWork.totalCredit,
        total: deliveryGuyWork.total,
        workId: work,
      };

      result.push(workDetails);
    }

    await session.commitTransaction();
    session.endSession();

    // Emit the result to the socket
    socket.emit("deliveryGuySalaryDetails", { success: true, data: result });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);

    // Emit the error to the socket
    socket.emit("deliveryGuySalaryDetails", {
      success: false,
      error: error.message,
    });
  }
};

module.exports = getDeliveryGuySalaryDetails;
