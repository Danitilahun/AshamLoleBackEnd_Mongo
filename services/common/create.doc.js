/**
 * Creates a new document in the specified Mongoose collection/model.
 * @param {Model} Model - The Mongoose model representing the collection.
 * @param {Object} data - The data to be added to the newly created document.
 * @returns {Promise<string>} A Promise that resolves with the ID of the created document.
 * @throws {Error} Throws an error if the operation fails.
 */

const createDocument = async (Model, data, session) => {
  try {
    const createdDocumentDoc = await Model.create([data], { session });
    console.log(
      `Document successfully created in ${Model.collection.name} collection`
    );
    return createdDocumentDoc;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = createDocument;
