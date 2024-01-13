const deleteDocumentsByCriteria = async (model, criteria, session) => {
  try {
    // Get the count of documents based on the provided criteria
    const documentCount = await model.countDocuments(criteria).session(session);

    // Log the count (you can remove this if not needed)
    console.log(`Found ${documentCount} documents to delete.`);

    // If there are documents, proceed with deletion
    if (documentCount > 0) {
      // Delete documents based on the provided criteria
      const deleteResult = await model.deleteMany(criteria).session(session);

      // Log the result (you can remove this if not needed)
      console.log(`${deleteResult.deletedCount} documents deleted.`);
    }

    // Return the count of deleted documents
    return documentCount;
  } catch (error) {
    console.error("Error deleting documents:", error);
    throw error;
  }
};

module.exports = deleteDocumentsByCriteria;
