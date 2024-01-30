const Calculator = require("../../models/calculatorSchema");

async function deleteCalculator(calculatorId, session) {
  try {
    // Delete the Calculator document
    const deletedCalculator = await Calculator.findOneAndDelete(
      { _id: calculatorId },
      { session }
    );

    if (!deletedCalculator) {
      throw new Error("Calculator not found");
    }

    console.log("Calculator deleted:", deletedCalculator);
    return deletedCalculator;
  } catch (error) {
    console.error("Error deleting calculator:", error);
    throw error;
  }
}

module.exports = deleteCalculator;
