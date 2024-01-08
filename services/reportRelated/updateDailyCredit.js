const Deliveryguy = require("../../models/deliveryguySchema");

const updateDailyCredit = async (docId, value) => {
  try {
    // Find the delivery guy document by ID and update dailyCredit using $inc
    const updatedDeliveryGuy = await Deliveryguy.findByIdAndUpdate(
      docId,
      { $inc: { dailyCredit: value } },
      { new: true } // To return the updated document
    );

    if (!updatedDeliveryGuy) {
      throw new Error("Delivery guy with this information does not exist.");
    }

    return updatedDeliveryGuy;
  } catch (error) {
    console.error(
      `Error updating dailyCredit for document with ID ${docId}:`,
      error
    );
    throw error;
  }
};

module.exports = updateDailyCredit;
