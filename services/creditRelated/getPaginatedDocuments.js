const { DailyCredit } = require("../../models/credit/dailyCreditSchema");

const getPaginatedDocuments = async (branchId, page = 1, pageSize = 10) => {
  try {
    const skip = (page - 1) * pageSize;

    // Query the database to get paginated documents based on branchId
    const documents = await DailyCredit.find({ branchId })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = getPaginatedDocuments;
