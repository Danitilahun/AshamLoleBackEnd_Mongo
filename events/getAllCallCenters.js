const CallCenter = require("../models/user/callCenterSchema");

const getAllCallCenters = async (socket) => {
  try {
    const callCenters = await CallCenter.find();
    socket.emit("allCallCentersData", { success: true, data: callCenters });
  } catch (error) {
    socket.emit("allCallCentersData", { success: false, error: error.message });
  }
};

module.exports = getAllCallCenters;
