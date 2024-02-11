const Calculator = require("../../models/calculatorSchema");

// Function to get the calculator by ID
const getCalculatorById = async (req, res) => {
  try {
    const calculatorId = req.params.calculatorId;
    const calculator = await Calculator.findById(calculatorId);

    if (!calculator) {
      return res
        .status(404)
        .json({ success: false, error: "Calculator not found." });
    }

    res.status(200).json(calculator);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = getCalculatorById;
