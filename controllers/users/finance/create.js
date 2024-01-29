const mongoose = require("mongoose");
const Finance = require("../../../models/user/financeschema");
const createAshamStaff = require("../../../services/users/createAshamStaff");
const createEssential = require("../../../services/users/createEssential");
const createBranchBankTotal = require("../../../services/users/createBranchBankTotal");
const createCalculator = require("../../../services/users/createCalculator");
const createActivationToken = require("../../../util/createActivationToken");
const { getIoInstance } = require("../../../socket");

// Create a new finance entry
const createFinanceEntry = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const io = getIoInstance();

  try {
    const data = req.body;
    data.disable = false;
    data.totalExpense = 0;
    data.salary = parseInt(data.salary);
    data.budget = parseInt(data.budget);
    data.budgetSummery = 0;
    data.credit = 0;
    data.balance = 0;
    data.password = "Asham123!";

    const essential = await createEssential(session, {
      address: data.fullAddress,
      company: "AshamLole",
      name: data.fullName,
      phone: data.phone,
      sector: "Branch",
    });

    data.essentialId = essential._id;

    const newFinanceEntry = new Finance(data);

    await createAshamStaff(session, {
      id: newFinanceEntry._id,
      name: newFinanceEntry.fullName,
      role: "Admin",
      branchId: newFinanceEntry._id,
    });

    await createBranchBankTotal(session, {
      branchId: newFinanceEntry._id,
    });

    await createCalculator(session, {
      branchId: newFinanceEntry._id,
      sheetId: newFinanceEntry._id,
    });

    const savedFinanceEntry = await newFinanceEntry.save({ session });

    console.log(savedFinanceEntry);
    io.emit("financeCreated", savedFinanceEntry);
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Finance entry created successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createFinanceEntry;
