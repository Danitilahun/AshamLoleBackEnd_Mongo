const Deliveryguy = require("../../../models/deliveryguySchema");

const getDeliveryGuyDetails = async (deliveryGuyId, session) => {
  try {
    // Find the delivery guy by ID within the provided session
    const deliveryGuy = await Deliveryguy.findById(deliveryGuyId).session(
      session
    );

    if (!deliveryGuy) {
      throw new Error("Delivery guy not found for the given ID.");
    }

    // Find the associated worker information for the delivery guy within the provided session
    const workerInfo = await DeliveryGuySalaryInfo.findOne({
      person: deliveryGuyId,
    }).session(session);

    if (!workerInfo) {
      throw new Error(
        "Worker information not found for the given delivery guy ID."
      );
    }

    return {
      deliveryGuy,
      workerInfo,
    };
  } catch (error) {
    console.error("Error in getting delivery guy details:", error);
    throw error;
  }
};

module.exports = getDeliveryGuyDetails;
