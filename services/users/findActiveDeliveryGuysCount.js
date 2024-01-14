const Deliveryguy = require("../../models/deliveryguySchema");

// Function to find and count active delivery guys using session
const findActiveDeliveryGuysCount = async (session) => {
  try {
    const activeDeliveryGuysCount = await Deliveryguy.countDocuments({
      activeness: true,
    }).session(session);
    return activeDeliveryGuysCount;
  } catch (error) {
    console.error("Error in finding active delivery guys:", error);
    throw error;
  }
};

module.exports = findActiveDeliveryGuysCount;
