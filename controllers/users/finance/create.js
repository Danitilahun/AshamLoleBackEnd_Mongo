const mongoose = require("mongoose");
const Finance = require("../../../models/user/financeschema");
const createAshamStaff = require("../../../services/users/createAshamStaff");
const createEssential = require("../../../services/users/createEssential");
const createBranchBankTotal = require("../../../services/users/createBranchBankTotal");
const createCalculator = require("../../../services/users/createCalculator");
const createActivationToken = require("../../../util/createActivationToken");

// Create a new finance entry
const createFinanceEntry = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = req.body;
    data.disable = false;
    data.totalExpense = 0;
    data.salary = parseInt(data.salary);
    data.budget = parseInt(data.budget);
    data.budgetSummery = 0;
    data.credit = 0;
    data.balance = 0;
    data.password = "12345678";

    const newFinanceEntry = new Finance(data);

    await createAshamStaff(session, {
      id: newFinanceEntry._id,
      name: newFinanceEntry.name,
      role: "Admin",
      branchId: newFinanceEntry.branchId,
    });

    await createBranchBankTotal(session, {
      branchId: newFinanceEntry._id,
    });

    await createCalculator(session, {
      branchId: newFinanceEntry._id,
      sheetId: newFinanceEntry._id,
    });

    await createEssential(session, {
      address: data.fullAddress,
      company: "AshamLole",
      name: data.fullName,
      phone: data.phone,
      sector: "Branch",
    });

    const activationToken = createActivationToken({
      id: newFinanceEntry._id,
      role: newFinanceEntry.role,
    });

    const activationUrl = `http://localhost:3000/${activationToken}`;

    try {
      await sendMail({
        email: newFinanceEntry.email,
        subject: "Activate your account",
        message: `Hello ${newFinanceEntry.fullName}, please click on the link to activate your account: ${activationUrl}`,
      });
    } catch (error) {
      throw new Error("Email could not be sent");
    }
    const savedFinanceEntry = await newFinanceEntry.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedFinanceEntry);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createFinanceEntry;
