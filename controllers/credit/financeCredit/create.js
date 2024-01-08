const { startSession } = require("mongoose");
const Finance = require("../../../models/user/financeschema");
const FinanceCreditSchema = require("../../../models/credit/financeCreditSchema");

const createFinanceCreditAndUpdate = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const data = req.body;

    // Create FinanceCredit document
    const financeCredit = new FinanceCreditSchema(data);
    await financeCredit.save({ session });

    // Update Finance model's credit field
    const finance = await Finance.findOne({ _id: data.financeId }).session(
      session
    );
    if (!finance) {
      throw new Error("Finance document not found for the given ID.");
    }

    finance.credit += parseFloat(data.amount);
    await finance.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: `FinanceCredit created and Finance updated successfully.`,
    });
  } catch (error) {
    console.error(error);

    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createFinanceCreditAndUpdate;
