const { startSession } = require("mongoose");
const Finance = require("../../../models/user/financeschema");
const FinanceCreditSchema = require("../../../models/credit/financeCreditSchema");

const deleteFinanceCreditAndUpdate = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const { creditId } = req.params; // Assuming creditId is passed in the request parameters

    // Retrieve finance credit document to get the amount
    const creditToDelete = await FinanceCreditSchema.findById(creditId).session(
      session
    );
    if (!creditToDelete) {
      return res.status(404).json({
        message: "FinanceCredit document not found for the given ID.",
      });
    }

    // Update the Finance model's credit by reducing the amount (send negative of the credit amount)
    const negativeAmount = -parseFloat(creditToDelete.amount || 0);

    const finance = await Finance.findOne({
      _id: creditToDelete.financeId,
    }).session(session);
    if (!finance) {
      throw new Error("Finance document not found for the given ID.");
    }

    finance.credit += negativeAmount;
    await finance.save({ session });

    // Delete the finance credit document from MongoDB
    await FinanceCredit.findByIdAndDelete(creditId).session(session);

    await session.commitTransaction();
    session.endSession();

    res
      .status(200)
      .json({
        message: `FinanceCredit Deleted and Finance credit field updated successfully.`,
      });
  } catch (error) {
    console.error(error);

    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteFinanceCreditAndUpdate;
