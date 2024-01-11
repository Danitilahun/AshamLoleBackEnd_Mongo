const FifteenDayWorkSummary = require("../../../models/table/FifteenDayWorkSummarySchema");
const CompanyWorks = require("../../../models/table/work/companyWorksSchema");

async function addDayToFifteenDayWorkSummary(session, summaryId, day) {
  try {
    // Create a new CompanyWorks entry
    const companyWorks = await CompanyWorks.create([{}], {
      session,
    });

    if (!companyWorks || companyWorks.length === 0) {
      throw new Error("Failed to create CompanyWorks entry");
    }

    // Get the ID of the created CompanyWorks entry
    const companyWorksId = companyWorks[0]._id;

    // Find the FifteenDayWorkSummary entry by its unique identifier
    const summary = await FifteenDayWorkSummary.findById(summaryId).session(
      session
    );

    if (!summary) {
      throw new Error("FifteenDayWorkSummary not found for the given id");
    }

    // Add the provided day and companyWorksId as a pair to the dailyWorkSummary array
    summary.dailyWorkSummary.push({ day, dailyWork: companyWorksId });

    // Save the updated FifteenDayWorkSummary
    await summary.save({ session });

    return { message: "Day added to FifteenDayWorkSummary successfully" };
  } catch (error) {
    return { error: error.message };
  }
}

module.exports = addDayToFifteenDayWorkSummary;
