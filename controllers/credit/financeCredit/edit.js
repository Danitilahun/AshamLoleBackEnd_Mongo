const { startSession } = require("mongoose");
const Finance = require("../../../models/user/financeschema");
const FinanceCreditSchema = require("../../../models/credit/financeCreditSchema");

const editFinanceCreditAndUpdate = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const { creditId } = req.params; // Assuming creditId is passed in the request parameters
    const data = req.body;

    // Retrieve previous finance credit document
    const prevFinanceCredit = await FinanceCreditSchema.findById(
      creditId
    ).session(session);
    if (!prevFinanceCredit) {
      return res.status(404).json({
        message: "FinanceCredit document not found for the given ID.",
      });
    }

    // Update FinanceCredit document
    await FinanceCredit.findByIdAndUpdate(creditId, data, { session });

    // Calculate the difference in credit amount
    const difference = data.amount - prevFinanceCredit.amount;

    // Update Finance model's credit field
    const finance = await Finance.findOne({
      _id: prevFinanceCredit.financeId,
    }).session(session);
    if (!finance) {
      throw new Error("Finance document not found for the given ID.");
    }

    finance.credit += parseFloat(difference);
    await finance.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: `FinanceCredit Updated and Finance credit field updated successfully.`,
    });
  } catch (error) {
    console.error(error);

    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = editFinanceCreditAndUpdate;
