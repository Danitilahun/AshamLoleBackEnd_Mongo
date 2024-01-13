const Deliveryguy = require("../../models/deliveryguySchema");

const updateDeliveryguyFields = async (
  deliveryguyId,
  updateFields,
  session
) => {
  try {
    // Find the delivery guy with the provided ID within the given session
    const deliveryguy = await Deliveryguy.findById(deliveryguyId).session(
      session
    );

    // Update the specified fields
    Object.assign(deliveryguy, updateFields);

    // Save the updated delivery guy document within the provided session
    await deliveryguy.save({ session });

    // Return the updated delivery guy document
    return deliveryguy;
  } catch (error) {
    throw error;
  }
};

module.exports = updateDeliveryguyFields;
