const Finance = require("../../../models/user/financeschema");

// Create a new finance entry
const createFinanceEntry = async (req, res) => {
  try {
    const {
      BudgetSummery,
      balance,
      bank,
      bankAccount,
      budget,
      credit,
      disable,
      email,
      fullAddress,
      fullName,
      phone,
      profileImage,
      salary,
      securityAddress,
      securityName,
      securityPhone,
      totalExpense,
    } = req.body;

    const newFinanceEntry = new Finance({
      BudgetSummery,
      balance,
      bank,
      bankAccount,
      budget,
      credit,
      disable,
      email,
      fullAddress,
      fullName,
      phone,
      profileImage,
      salary,
      securityAddress,
      securityName,
      securityPhone,
      totalExpense,
      updatedAt: new Date(),
    });

    const savedFinanceEntry = await newFinanceEntry.save();
    res.status(201).json(savedFinanceEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createFinanceEntry;
