const DeliveryGuySalaryTable = require("../../models/table/salary/DeliveryGuySalaryTable");
const DeliveryGuyWork = require("../../models/table/work/deliveryGuyWorkSchema");

const calculateAndUpdateTotalDeliveryGuySalaryTable = async (
  branchId,
  sheetId,
  session
) => {
  try {
    // Retrieve DeliveryGuySalaryTable document by branchId and sheetId
    const deliveryGuySalaryTable = await DeliveryGuySalaryTable.findOne({
      branchId,
      sheetId,
    }).session(session);

    if (!deliveryGuySalaryTable) {
      throw new Error(
        "DeliveryGuySalaryTable document not found for the given branchId and sheetId"
      );
    }

    // Iterate over personWork, summing up the corresponding values from DeliveryGuyWork
    let totalDeliveryGuyWork = {
      asbeza: 0,
      cardCollect: 0,
      cardDistribute: 0,
      cardFee: 0,
      waterCollect: 0,
      waterDistribute: 0,
      wifiCollect: 0,
      wifiDistribute: 0,
      hotelProfit: 0,
      total: 0,
      bonus: 0,
      holidayBonus: 0,
      fixedSalary: 0,
      totalCredit: 0,
      penality: 0,
    };

    for (const personWork of deliveryGuySalaryTable.personWork) {
      // Get DeliveryGuyWork based on personWork.work
      const deliveryGuyWork = await DeliveryGuyWork.findById(
        personWork.work
      ).session(session);

      if (deliveryGuyWork) {
        // Sum up the values
        totalDeliveryGuyWork.asbeza += deliveryGuyWork.asbeza;
        totalDeliveryGuyWork.cardCollect += deliveryGuyWork.cardCollect;
        totalDeliveryGuyWork.cardDistribute += deliveryGuyWork.cardDistribute;
        totalDeliveryGuyWork.cardFee += deliveryGuyWork.cardFee;
        totalDeliveryGuyWork.waterCollect += deliveryGuyWork.waterCollect;
        totalDeliveryGuyWork.waterDistribute += deliveryGuyWork.waterDistribute;
        totalDeliveryGuyWork.wifiCollect += deliveryGuyWork.wifiCollect;
        totalDeliveryGuyWork.wifiDistribute += deliveryGuyWork.wifiDistribute;
        totalDeliveryGuyWork.hotelProfit += deliveryGuyWork.hotelProfit;
        totalDeliveryGuyWork.total += deliveryGuyWork.total;
        totalDeliveryGuyWork.bonus += deliveryGuyWork.bonus;
        totalDeliveryGuyWork.holidayBonus += deliveryGuyWork.holidayBonus;
        totalDeliveryGuyWork.fixedSalary += deliveryGuyWork.fixedSalary;
        totalDeliveryGuyWork.totalCredit += deliveryGuyWork.totalCredit;
        totalDeliveryGuyWork.penality += deliveryGuyWork.penality;
      }
    }

    // Return the calculated total DeliveryGuyWork
    return totalDeliveryGuyWork;
  } catch (error) {
    throw new Error(
      `Error calculating and updating DeliveryGuySalaryTable: ${error.message}`
    );
  }
};

module.exports = calculateAndUpdateTotalDeliveryGuySalaryTable;
