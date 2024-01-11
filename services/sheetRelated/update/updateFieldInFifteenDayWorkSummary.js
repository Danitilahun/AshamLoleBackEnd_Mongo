const FifteenDayWorkSummary = require("../../../models/table/FifteenDayWorkSummarySchema");
const CompanyWorks = require("../../../models/table/work/companyWorksSchema");

async function updateFieldInFifteenDayWorkSummary(
  session,
  summaryId,
  day,
  fieldName,
  valueToUpdate
) {
  try {
    // Find the FifteenDayWorkSummary entry by its unique identifier
    const summary = await FifteenDayWorkSummary.findById(summaryId).session(
      session
    );

    if (!summary) {
      throw new Error("FifteenDayWorkSummary not found for the given id");
    }

    // Find the dailyWork entry for the provided day
    const dailyWorkEntry = summary.dailyWorkSummary.find(
      (entry) => entry.day === day
    );

    if (!dailyWorkEntry) {
      throw new Error(`No entry found for the day ${day}`);
    }

    // Get the ID of the CompanyWorks entry associated with the day
    const companyWorksId = dailyWorkEntry.dailyWork;

    // Update the specified field in the CompanyWorks entry
    await CompanyWorks.findByIdAndUpdate(
      companyWorksId,
      { $inc: { [fieldName]: valueToUpdate, total: valueToUpdate } },
      { session }
    );

    return { message: "Field updated successfully" };
  } catch (error) {
    return { error: error.message };
  }
}

module.exports = updateFieldInFifteenDayWorkSummary;
