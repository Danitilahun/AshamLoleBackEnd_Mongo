const { startSession } = require("mongoose");
const CustomerCredit = require("../../../models/credit/customerCreditSchema");
const updateCredit = require("../../../services/creditRelated/updateCredit");

const deleteCredit = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const { creditId } = req.params;

    const creditToDelete = await CustomerCredit.findById(creditId).session(
      session
    );
    if (!creditToDelete) {
      throw new Error("Credit document not found for the given ID.");
    }

    const negativeAmount = -parseFloat(creditToDelete.amount || 0);

    await updateCredit(
      creditToDelete.branchId,
      "customerCredit",
      negativeAmount,
      session
    );

    // Delete the credit document from MongoDB
    await CustomerCredit.findByIdAndDelete(creditId).session(session);

    await session.commitTransaction();
    session.endSession();

    // Respond with a success message
    res.status(200).json({ message: `CustomerCredit Deleted successfully.` });
  } catch (error) {
    console.error(error);

    await session.abortTransaction();
    session.endSession();

    // Respond with an error message
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteCredit;
