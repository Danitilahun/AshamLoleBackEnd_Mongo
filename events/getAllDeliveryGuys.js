const Deliveryguy = require("../models/deliveryguySchema");

const getAllDeliveryGuys = async (socket) => {
  try {
    const deliveryGuys = await Deliveryguy.find();
    socket.emit("allDeliveryGuysData", { success: true, data: deliveryGuys });
  } catch (error) {
    socket.emit("allDeliveryGuysData", {
      success: false,
      error: error.message,
    });
  }
};

module.exports = getAllDeliveryGuys;
