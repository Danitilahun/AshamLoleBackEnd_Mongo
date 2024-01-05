const Calculator = require("../../models/calculatorSchema");

async function createCalculator(branchId, sheetId, session) {
  try {
    const calculatorData = {
      sheetId: sheetId,
      branchId: branchId,
    };

    // Create the Calculator document
    let newCalculator = await Calculator.create(calculatorData, { session });
    console.log("Calculator created:", newCalculator);
    return newCalculator;
  } catch (error) {
    console.error("Error creating calculator:", error);
    throw error;
  }
}

module.exports = createCalculator;
