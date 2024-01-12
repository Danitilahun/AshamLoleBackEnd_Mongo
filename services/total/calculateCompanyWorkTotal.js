const DeliveryGuy15DayWorkSummary = require("../../models/table/DeliveryGuy15DayWorkSummarySchema");
const CompanyWorks = require("../../models/table/work/companyWorksSchema");

const calculateCompanyWorkTotal = async (branchId, sheetId, session) => {
  try {
    const deliveryGuySummary = await DeliveryGuy15DayWorkSummary.findOne({
      branchId,
      sheetId,
    }).session(session);

    if (!deliveryGuySummary) {
      throw new Error("DeliveryGuy15DayWorkSummary document not found");
    }

    const companyWorkTotal = new CompanyWorks();

    for (const personWork of deliveryGuySummary.personWork) {
      const { work } = personWork;

      const companyWork = await CompanyWorks.findById(work).session(session);

      if (!companyWork) {
        throw new Error(`CompanyWorks document not found for work ID: ${work}`);
      }

      // Update the total values
      companyWorkTotal.asbezaNumber += companyWork.asbezaNumber;
      companyWorkTotal.asbezaProfit += companyWork.asbezaProfit;
      companyWorkTotal.cardCollect += companyWork.cardCollect;
      companyWorkTotal.cardDistribute += companyWork.cardDistribute;
      companyWorkTotal.cardFee += companyWork.cardFee;
      companyWorkTotal.hotelProfit += companyWork.hotelProfit;
      companyWorkTotal.total += companyWork.total;
      companyWorkTotal.waterCollect += companyWork.waterCollect;
      companyWorkTotal.waterDistribute += companyWork.waterDistribute;
      companyWorkTotal.wifiCollect += companyWork.wifiCollect;
      companyWorkTotal.wifiDistribute += companyWork.wifiDistribute;
    }

    // Return the total CompanyWorks object
    return companyWorkTotal;
  } catch (error) {
    throw new Error(`Error calculating CompanyWorks total: ${error.message}`);
  }
};

module.exports = calculateCompanyWorkTotal;
