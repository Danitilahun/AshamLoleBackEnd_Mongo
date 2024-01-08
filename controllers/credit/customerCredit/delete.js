const { startSession } = require("mongoose");
const updateCredit = require("../../../service/credit/totalCredit/DailyCreditUpdate");
const CustomerCredit = require("../../../models/credit/customerCreditSchema");

const deleteCredit = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const { creditId } = req.params; // Assuming creditId is passed in the request parameters

    // Retrieve credit document to get the amount
    const creditToDelete = await CustomerCredit.findById(creditId).session(
      session
    );
    if (!creditToDelete) {
      return res.status(404).json({
        message: "Credit document not found for the given ID.",
      });
    }

    // Update the total credit by reducing the amount (send negative of the credit amount)
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
