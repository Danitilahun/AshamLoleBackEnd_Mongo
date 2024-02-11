const Calculator = require("../../models/calculatorSchema");

// Function to edit the numbers of 1, 5, ... based on the given ID
const editCalculatorNumbersById = async (req, res) => {
  try {
    const calculatorId = req.params.calculatorId;
    const data = req.body;
    const { key, value } = req.body;

    const calculator = await Calculator.findById(calculatorId);

    if (!calculator) {
      return res
        .status(404)
        .json({ success: false, error: "Calculator not found." });
    }

    const originalData = { ...calculator._doc };

    if (!(key in calculator._doc)) {
      return res.status(400).json({ success: false, error: "Invalid key." });
    }

    calculator[key] = value;
    calculator.sum =
      calculator["1"] * 1 +
      calculator["5"] * 5 +
      calculator["10"] * 10 +
      calculator["50"] * 50 +
      calculator["100"] * 100 +
      calculator["200"] * 200;

    await calculator.save();

    const changedData = {};
    if (originalData[key] !== value) {
      changedData[key] = value;
    }

    res.status(200).json({
      success: true,
      message: "Calculator updated successfully.",
      data: changedData,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = editCalculatorNumbersById;
