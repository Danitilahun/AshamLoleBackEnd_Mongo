const { DailyCredit } = require("../../models/credit/dailyCreditSchema");
const StaffCredit = require("../../models/credit/staffCreditSchema");

const calculateAndCreditStaff = async (deliveryguyId) => {
  try {
    // Find all credits with the given deliveryguyId
    const deliveryguyCredits = await DailyCredit.find({ deliveryguyId });

    // Calculate total credit amount
    const totalCredit = deliveryguyCredits.reduce(
      (total, credit) => total + credit.amount,
      0
    );

    // Get deliveryguy details from the first credit (assuming they are the same for all)
    const { deliveryguyName, deliveryguyId, sheetId, branchId } =
      deliveryguyCredits[0];

    // Create a new staff credit entry
    const newStaffCredit = new StaffCredit({
      sheetId,
      amount: totalCredit,
      branchId,
      date: new Date(),
      employeeId: deliveryguyId,
      employeeName: deliveryguyName,
      placement: "Delivery Guy",
      reason: "not completing daily credit return",
    });

    // Save the new staff credit entry
    await newStaffCredit.save();

    // Return the total daily credit
    return totalCredit;
  } catch (error) {
    throw error;
  }
};

module.exports = calculateAndCreditStaff;
