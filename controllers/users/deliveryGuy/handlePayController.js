const Deliveryguy = require("../../../models/deliveryguySchema");
const updateCredit = require("../../../services/creditRelated/updateCredit");
const calculateAndCreditStaff = require("../../../services/users/calculateAndCreditStaff");
const payDailySalary = require("../../../services/users/payDailySalary");
const updateDeliveryguyFields = require("../../../services/users/updateDeliveryguyFields.JS");

const handlePayController = async (req, res) => {
  const { id, active } = req.params;
  const data = req.body;

  const session = await startSession();
  session.startTransaction();

  try {
    let credit = 0;
    const deliveryguy = await Deliveryguy.findById(id);

    if (deliveryguy) {
      if (deliveryguy.dailyCredit > 0) {
        credit = await calculateAndCreditStaff(id, session);
      }
      await updateDeliveryguyFields(
        id,
        {
          activeness: false,
          paid: true,
          waiting: false,
        },
        session
      );
    }

    await payDailySalary(data.salaryId, id, session);

    // Update the total credit by subtracting the deleted credit amount
    await updateCredit(
      data.branchId,
      "dailyCredit",
      -parseFloat(data.amount ? data.amount : 0),
      session
    );

    await updateCredit(
      data.branchId,
      "staffCredit",
      parseFloat(data.amount ? data.amount : 0),
      session
    );

    // Commit the batch updates
    await batch.commit();
    return res.status(200).json({ message: "Data successfully updated." });
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = handlePayController;
