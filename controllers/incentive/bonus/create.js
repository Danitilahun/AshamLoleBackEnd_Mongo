const Bonus = require("../../../models/incentive/bonusSchema");

// Create a new bonus
const createBonus = async (req, res) => {
  try {
    const {
      sheetId,
      amount,
      branchId,
      date,
      employeeId,
      employeeName,
      placement,
      reason,
    } = req.body;

    const newBonus = new Bonus({
      sheetId,
      amount,
      branchId,
      date,
      employeeId,
      employeeName,
      placement,
      reason,
    });

    const savedBonus = await newBonus.save();
    res.status(201).json(savedBonus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createBonus;
