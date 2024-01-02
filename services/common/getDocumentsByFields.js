/**
 * Get documents from a specified Mongoose collection/model that match a set of fields.
 * @param {Model} Model - The Mongoose model representing the collection.
 * @param {Object} query - Object containing fields to match.
 * @returns {Promise<Array>} A Promise that resolves with an array of matching documents.
 * @throws {Error} Throws an error if the operation fails.
 */
const getDocumentsByFields = async (Model, query) => {
  try {
    const documents = await Model.find(query);
    return documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = getDocumentsByFields;
