const Deliveryguy = require("../models/deliveryguySchema");

const getAllDeliveryGuys = async (socket, branchId) => {
  try {
    const deliveryGuys = await Deliveryguy.find({ branchId });
    socket.emit("allDeliveryGuysData", { success: true, data: deliveryGuys });
  } catch (error) {
    socket.emit("allDeliveryGuysData", {
      success: false,
      error: error.message,
    });
  }
};

module.exports = getAllDeliveryGuys;
