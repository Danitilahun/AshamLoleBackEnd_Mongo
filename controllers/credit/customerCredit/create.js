const { startSession } = require("mongoose");
const CustomerCredit = require("../../../models/credit/customerCreditSchema");

const createCredit = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const data = req.body;
    if (!data || !data.branchId || !data.active) {
      return res.status(400).json({
        message:
          "Request body is missing or empty. Please refresh your browser and try again.",
      });
    }

    // Create a new credit document in MongoDB
    data.borrowedOn = new Date();
    data.daysSinceBorrowed = 0;

    await CustomerCredit.create([data], { session });

    // Update the total credit using the provided function

    await updateCredit(
      data.branchId,
      "customerCredit",
      parseFloat(data.amount ? data.amount : 0),
      session
    );

    await session.commitTransaction();
    session.endSession();

    // Respond with a success message
    res.status(200).json({ message: `CustomerCredit Created successfully.` });
  } catch (error) {
    console.error(error);

    await session.abortTransaction();
    session.endSession();

    // Respond with an error message
    res.status(500).json({ message: error.message });
  }
};

module.exports = createCredit;
