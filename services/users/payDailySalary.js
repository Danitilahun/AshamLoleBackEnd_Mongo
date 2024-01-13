const DeliveryGuyGain = require("../../models/price/deliveryGuyGainSchema");
const updateDeliveryGuySalaryTable = require("../sheetRelated/update/updateDeliveryGuySalaryTable");

const payDailySalary = async (salaryId, deliveryguyId, session) => {
  try {
    const deliveryGuyGainDoc = await DeliveryGuyGain.findOne().session(session);
    const cardDistributePrice = deliveryGuyGainDoc.card_distribute_price;

    await updateDeliveryGuySalaryTable(
      salaryId,
      deliveryguyId,
      "fixedSalary",
      cardDistributePrice,
      cardDistributePrice,
      session
    );

    console.log(
      `Daily salary successfully paid for delivery guy with ID ${deliveryguyId}.`
    );
  } catch (error) {
    throw error;
  }
};

module.exports = payDailySalary;
