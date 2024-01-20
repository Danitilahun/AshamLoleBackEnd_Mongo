const Calculator = require("../../models/calculatorSchema");

async function createCalculator(session, data) {
  try {
    // Create the Calculator document within the provided session
    const calculator = await Calculator.create([data], { session });

    return calculator[0]; // Assuming create returns an array, return the first element
  } catch (error) {
    // Handle the error, you might want to log or rethrow it
    throw error;
  }
}

module.exports = createCalculator;
