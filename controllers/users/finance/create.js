const Finance = require("../../../models/user/financeschema");

// Create a new finance entry
const createFinanceEntry = async (req, res) => {
  try {
    const data = req.body;

    const newFinanceEntry = new Finance(data);

    const savedFinanceEntry = await newFinanceEntry.save();
    res.status(201).json(savedFinanceEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createFinanceEntry;
