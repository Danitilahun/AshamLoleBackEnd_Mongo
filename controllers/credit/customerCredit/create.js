const { startSession } = require("mongoose");
const CustomerCredit = require("../../../models/credit/customerCreditSchema");
const updateCredit = require("../../../services/creditRelated/updateCredit");

const createCredit = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const data = req.body;

    const newCredit = await CustomerCredit.create([data], { session });

    await updateCredit(
      data.branchId,
      "customerCredit",
      parseFloat(data.amount ? data.amount : 0),
      session
    );

    await session.commitTransaction();
    session.endSession();

    // Respond with a success message
    res.status(200).json({
      message: `CustomerCredit Created successfully.`,
      data: newCredit,
    });
  } catch (error) {
    console.error(error);

    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createCredit;
