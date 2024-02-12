const Deliveryguy = require("../../models/deliveryguySchema");

async function updateDailyCredit(deliveryGuyId, amount, session) {
  try {
    // Update the daily credit using $inc
    await Deliveryguy.updateOne(
      { _id: deliveryGuyId },
      { $inc: { dailyCredit: amount } },
      { session }
    );
    return true; // Return true if the update is successful
  } catch (error) {
    throw error; // Throw error if update fails
  }
}

module.exports = updateDailyCredit;
