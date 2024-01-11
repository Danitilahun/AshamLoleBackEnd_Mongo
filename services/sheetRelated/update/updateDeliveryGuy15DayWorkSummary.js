const mongoose = require("mongoose");
const DeliveryGuy15DayWorkSummary = require("../../../models/table/DeliveryGuy15DayWorkSummarySchema");
const DeliveryGuyWork = require("../../../models/table/work/deliveryGuyWorkSchema");
const CompanyWorks = require("../../../models/table/work/companyWorksSchema");

const updateDeliveryGuy15DayWorkSummary = async (
  summaryId,
  deliveryGuyId,
  fieldName,
  valueToUpdate
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the DeliveryGuy15DayWorkSummary entry by its unique identifier
    const summary = await DeliveryGuy15DayWorkSummary.findById(
      summaryId
    ).session(session);

    if (!summary) {
      throw new Error("DeliveryGuy15DayWorkSummary not found for the given id");
    }

    // Find the PersonWorkSchema for the given deliveryGuyId
    const personWork = summary.personWork.find(
      (entry) => entry.person.toString() === deliveryGuyId
    );

    if (!personWork) {
      throw new Error("PersonWorkSchema not found for the given delivery guy");
    }

    // Get the DeliveryGuyWork ID from PersonWorkSchema
    const deliveryGuyWorkId = personWork.work;

    // Find the DeliveryGuyWork using the ID
    const deliveryGuyWork = await CompanyWorks.findById(
      deliveryGuyWorkId
    ).session(session);

    if (!deliveryGuyWork) {
      throw new Error("DeliveryGuyWork not found for the given delivery guy");
    }

    // Update the specified field in DeliveryGuyWork and the 'total' field in DeliveryGuy15DayWorkSummary
    deliveryGuyWork[fieldName] += valueToUpdate;
    deliveryGuyWork.total += valueToUpdate;
    await deliveryGuyWork.save({ session });

    // Update the 'total' field in DeliveryGuy15DayWorkSummary
    summary.markModified("personWork");
    await summary.save({ session });

    await session.commitTransaction();
    session.endSession();

    return {
      message: "DeliveryGuy15DayWorkSummary entry updated successfully",
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { error: error.message };
  }
};

module.exports = updateDeliveryGuy15DayWorkSummary;
