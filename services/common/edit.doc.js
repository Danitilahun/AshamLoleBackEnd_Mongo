/**
 * Edit a document in a specified Mongoose collection/model.
 *
 * @param {Model} Model - The Mongoose model representing the collection.
 * @param {string} documentId - ID of the document to edit.
 * @param {Object} updatedData - Updated data to merge with the existing document data.
 * @returns {Promise<void>} A Promise that resolves once the document is updated.
 * @throws {Error} Throws an error if the operation fails.
 */
const editDocument = async (Model, documentId, updatedData) => {
  try {
    const existingDocument = await Model.findById(documentId);

    if (!existingDocument) {
      throw new Error(`Document with ID ${documentId} not found.`);
    }

    // Merge the existing data with the updated data
    Object.assign(existingDocument, updatedData);
    existingDocument.updatedAt = Date.now(); // Update the 'updatedAt' field

    await existingDocument.save();

    console.log(
      `Document with ID ${documentId} updated in ${Model.collection.name} collection`
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = editDocument;
