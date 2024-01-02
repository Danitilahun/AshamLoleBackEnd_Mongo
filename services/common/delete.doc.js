/**
 * Delete a document from a specified Mongoose collection/model by its ID.
 *
 * @param {Model} Model - The Mongoose model representing the collection.
 * @param {string} documentId - ID of the document to delete.
 * @returns {Promise<void>} A Promise that resolves once the document is deleted.
 * @throws {Error} Throws an error if the operation fails.
 */
const deleteDocument = async (Model, documentId) => {
  try {
    const deletedDocument = await Model.findByIdAndDelete(documentId);

    if (!deletedDocument) {
      throw new Error(`Document with ID ${documentId} not found.`);
    }

    console.log(
      `Document with ID ${documentId} deleted from ${Model.collection.name} collection`
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = deleteDocument;
