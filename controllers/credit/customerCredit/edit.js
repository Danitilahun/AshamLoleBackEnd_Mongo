const { startSession } = require("mongoose");
const CustomerCredit = require("../../../models/credit/customerCreditSchema");
const updateCredit = require("../../../services/creditRelated/updateCredit");

const editCredit = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const data = req.body;
    const { creditId } = req.params; // Assuming creditId is passed in the request parameters

    // Retrieve previous credit document
    const prevCredit = await CustomerCredit.findById(creditId).session(session);
    if (!prevCredit) {
      return res.status(404).json({
        message: "Credit document not found for the given ID.",
      });
    }

    // Update the credit document in MongoDB
    await CustomerCredit.findByIdAndUpdate(creditId, data, { session });

    // Send integer differences to updateCredit function
    await updateCredit(
      data.branchId,
      "customerCredit",
      data.amount - prevCredit.amount,
      session
    );

    await session.commitTransaction();
    session.endSession();

    // Respond with a success message
    res.status(200).json({ message: `CustomerCredit Updated successfully.` });
  } catch (error) {
    console.error(error);

    await session.abortTransaction();
    session.endSession();

    // Respond with an error message
    res.status(500).json({ message: error.message });
  }
};

module.exports = editCredit;
