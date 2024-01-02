/**
 * Get element by ID from a specified Mongoose collection/model.
 * @param {Model} Model - The Mongoose model representing the collection.
 * @param {string} id - ID of the element to retrieve.
 * @returns {Promise<object|null>} A Promise that resolves with the retrieved element or null if not found.
 * @throws {Error} Throws an error if the operation fails.
 */
const getElementById = async (Model, id) => {
  try {
    const element = await Model.findById(id);
    return element;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = getElementById;
