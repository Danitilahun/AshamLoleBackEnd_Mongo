const DailyTable = require("../../models/table/DailyTable");

const calculateAndUpdateTotalDailyTable = async (
  branchId,
  sheetId,
  session
) => {
  try {
    // Retrieve DailyTable document by branchId and sheetId
    const dailyTable = await DailyTable.findOne({ branchId, sheetId }).session(
      session
    );

    if (!dailyTable) {
      throw new Error(
        "DailyTable document not found for the given branchId and sheetId"
      );
    }

    // Iterate over personWork, summing up the corresponding values from CompanyWorks
    let totalCompanyWorks = {
      asbezaNumber: 0,
      asbezaProfit: 0,
      cardCollect: 0,
      cardDistribute: 0,
      cardFee: 0,
      hotelProfit: 0,
      total: 0,
      waterCollect: 0,
      waterDistribute: 0,
      wifiCollect: 0,
      wifiDistribute: 0,
    };

    for (const personWork of dailyTable.personWork) {
      // Get CompanyWorks based on personWork.work (assuming work is the ID for CompanyWorks)
      const companyWorks = await CompanyWorks.findById(personWork.work).session(
        session
      );

      if (companyWorks) {
        // Sum up the values
        totalCompanyWorks.asbezaNumber += companyWorks.asbezaNumber;
        totalCompanyWorks.asbezaProfit += companyWorks.asbezaProfit;
        totalCompanyWorks.cardCollect += companyWorks.cardCollect;
        totalCompanyWorks.cardDistribute += companyWorks.cardDistribute;
        totalCompanyWorks.cardFee += companyWorks.cardFee;
        totalCompanyWorks.hotelProfit += companyWorks.hotelProfit;
        totalCompanyWorks.total += companyWorks.total;
        totalCompanyWorks.waterCollect += companyWorks.waterCollect;
        totalCompanyWorks.waterDistribute += companyWorks.waterDistribute;
        totalCompanyWorks.wifiCollect += companyWorks.wifiCollect;
        totalCompanyWorks.wifiDistribute += companyWorks.wifiDistribute;
      }
    }

    // Return the calculated total CompanyWorks
    return totalCompanyWorks;
  } catch (error) {
    throw new Error(
      `Error calculating and updating DailyTable: ${error.message}`
    );
  }
};

module.exports = calculateAndUpdateTotalDailyTable;
