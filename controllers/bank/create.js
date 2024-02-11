const mongoose = require("mongoose");
const Bank = require("../../models/bankSchema");
const BranchBankTotal = require("../../models/branchRelatedSchema/branchBankTotal");

const createBankTransaction = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    console.log(req.body);
    const bankTransaction = await Bank.create([req.body], { session });
    let branchBankTotal = await BranchBankTotal.findOne(
      { branchId: req.body.branchId },
      null,
      { session }
    );

    if (!branchBankTotal) {
      throw new Error("Branch bank details not found.");
    }

    let foundBank = branchBankTotal.banks.find(
      (bank) => bank.name === req.body.bankName
    );

    const amount = req.body.amount;

    if (!foundBank) {
      foundBank = {
        name: req.body.bankName,
        total: 0,
      };
      branchBankTotal.banks.push(foundBank);
    }

    if (req.body.transactionType === "Withdraw") {
      foundBank.total -= amount;
      branchBankTotal.withdraw += amount;
    } else if (req.body.transactionType === "Deposit") {
      foundBank.total += amount;
      branchBankTotal.deposit += amount;
    }

    branchBankTotal.total = branchBankTotal.deposit - branchBankTotal.withdraw;

    await branchBankTotal.save({ session });
    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: "Bank transaction created successfully",
      data: bankTransaction,
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ success: false, error: error.message });
  } finally {
    session.endSession();
  }
};

module.exports = createBankTransaction;
