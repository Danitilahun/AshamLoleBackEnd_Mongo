const checkTotal = async (
  salaryId,
  deliveryGuyId,
  TableModel,
  WorkModel,
  session
) => {
  try {
    // Find the TableModelA entry by its unique identifier
    const summary = await TableModel.findById(salaryId).session(session);

    if (!summary) {
      throw new Error("TableModelA not found for the given id");
    }

    // Find the PersonWorkSchema for the given deliveryGuyId
    const personWork = summary.personWork.find(
      (entry) => entry.person.toString() === deliveryGuyId
    );

    if (!personWork) {
      throw new Error("PersonWorkSchema not found for the given delivery guy");
    }

    // Get the WorkModel ID from PersonWorkSchema
    const deliveryGuyWorkId = personWork.work;
    console.log("deliveryGuyWorkId", deliveryGuyWorkId);
    // Find the WorkModel using the ID
    const deliveryGuyWork = await WorkModel.findById(deliveryGuyWorkId).session(
      session
    );

    if (!deliveryGuyWork) {
      throw new Error("WorkModel not found for the given delivery guy");
    }

    // Return the total value from WorkModel
    return deliveryGuyWork.total;
  } catch (error) {
    throw new Error(
      `Error updating TableModelA entry with ID ${salaryId}: ${error}`
    );
  }
};

module.exports = checkTotal;
