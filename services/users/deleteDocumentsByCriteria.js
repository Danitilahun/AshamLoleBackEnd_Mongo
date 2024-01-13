const updateDocumentsStatusByCriteria = async (
  model,
  criteria,
  newStatus,
  session
) => {
  try {
    // Update documents' status based on the provided criteria
    const updateResult = await model
      .updateMany(criteria, { $set: { status: newStatus } })
      .session(session);

    // Log the result (you can remove this if not needed)
    console.log(
      `${updateResult.modifiedCount} documents updated to ${newStatus}.`
    );

    // Return the count of updated documents
    return updateResult.modifiedCount;
  } catch (error) {
    console.error("Error updating documents:", error);
    throw error;
  }
};

module.exports = updateDocumentsStatusByCriteria;
